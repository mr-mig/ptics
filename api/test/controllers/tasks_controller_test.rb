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

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task), as: :json
    end

    assert_response :no_content
  end
end
