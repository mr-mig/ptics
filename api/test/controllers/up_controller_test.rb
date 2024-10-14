require "test_helper"

class UpControllerTest < ActionDispatch::IntegrationTest
  # make a request to rails `/up` endpoint
  # and assert that the response is successful  
  test "should get health endpoint result" do
    get "/up"
    assert_response :success
  end
end