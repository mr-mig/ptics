require "test_helper"

class ListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @list = lists(:l1)
  end

  test "should get index" do
    get lists_url, as: :json
    assert_response :success
  end

  test "should get list with tasks" do
    get list_url(@list), as: :json
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal @list.tasks.length, json_response["tasks"].length
  end

  test "should create list" do
    title = Faker::Adjective.positive
    assert_difference("List.count") do
      post lists_url, params: { list: { owner_id: @list.owner_id, title: title } }, as: :json
    end

    assert_response :created
    created_list = List.last
    assert_equal title, created_list.title
    assert_not_nil created_list.login_key
    assert_equal 20, created_list.login_key.length
  end

  test "should return validation error when owner_id is incorrect" do
    post lists_url, params: { list: { owner_id: 0, title: "test" } }, as: :json

    assert_response :bad_request
    json_response = JSON.parse(response.body)
    assert_includes json_response["owner"], "must exist"
  end

  test "should show list" do
    get list_url(@list), as: :json
    assert_response :success
  end

  test "should update list" do
    patch list_url(@list), params: { list: { owner_id: @list.owner_id, title: @list.title } }, as: :json
    assert_response :success
  end

  test "should destroy list" do
    assert_difference("List.count", -1) do
      delete list_url(@list), as: :json
    end

    assert_response :no_content
  end
end
