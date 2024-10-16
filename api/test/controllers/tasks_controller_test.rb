require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:t1)
  end

  test "should get index" do
    get tasks_url, as: :json
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { list_id: @task.list_id, owner_id: @task.owner_id, state: @task.state, title: @task.title } }, as: :json
    end

    assert_response :created
    json_response = JSON.parse(response.body)
    assert_equal @task.owner_id, json_response['owner']['id']
    assert_equal @task.owner.name, json_response['owner']['name']
  end

  test "should create task with default state if not state parameter is passed" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { list_id: @task.list_id, owner_id: @task.owner_id, title: @task.title } }, as: :json
    end

    assert_response :created
  end

  test "should show task" do
    get task_url(@task), as: :json
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { list_id: @task.list_id, owner_id: @task.owner_id, state: @task.state, title: @task.title } }, as: :json
    assert_response :success
  end

  test "should return tasks in ascending order by creation date" do
    new_list = List.create!(title: "New List", owner_id: @task.owner_id)
    task1 = Task.create!(title: "Task 1", state: "todo", list_id: new_list.id, owner_id: @task.owner_id, created_at: 1.days.ago)
    task2 = Task.create!(title: "Task 2", state: "todo", list_id: new_list.id, owner_id: @task.owner_id, created_at: 2.day.ago)
    task3 = Task.create!(title: "Task 3", state: "todo", list_id: new_list.id, owner_id: @task.owner_id, created_at: Time.now)

    get list_tasks_url(new_list), as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    returned_titles = json_response.map { |task| task["title"] }

    assert_equal ["Task 2", "Task 1", "Task 3"], returned_titles
  end

  test "should transition task between states" do
    patch task_url(@task), params: { task: { list_id: @task.list_id, owner_id: @task.owner_id, state: "ongoing", title: @task.title } }, as: :json
    assert_response :success
  end

  test "should transition task: todo -> ongoing" do
    @task.update!(state: "todo")
    patch task_url(@task), params: { task: { state: "ongoing" } }, as: :json
    assert_response :success
    @task.reload
    assert_equal "ongoing", @task.state
  end
  
  test "should transition task: ongoing -> done" do
    @task.update!(state: "ongoing")
    patch task_url(@task), params: { task: { state: "done" } }, as: :json
    assert_response :success
    @task.reload
    assert_equal "done", @task.state
  end
  
  test "should transition task: done -> ongoing" do
    @task.update!(state: "done")
    patch task_url(@task), params: { task: { state: "ongoing" } }, as: :json
    assert_response :success
    @task.reload
    assert_equal "ongoing", @task.state
  end
  
  test "should transition task: ongoing -> todo" do
    @task.update!(state: "ongoing")
    patch task_url(@task), params: { task: { state: "todo" } }, as: :json
    assert_response :success
    @task.reload
    assert_equal "todo", @task.state
  end

  test "should return validation error when incorrect state transition is requested" do
    @task.start!
    @task.complete!

    patch task_url(@task), params: { task: { list_id: @task.list_id, owner_id: @task.owner_id, state: "todo", title: @task.title } }, as: :json

    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_includes json_response["error"], "Event 'reset' cannot transition from 'done'."
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task), as: :json
    end

    assert_response :no_content
  end
end
