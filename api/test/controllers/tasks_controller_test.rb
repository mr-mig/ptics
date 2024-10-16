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
