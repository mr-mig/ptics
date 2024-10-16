require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "2 fixture users are created" do
    assert_equal 2, User.count
  end

  test "user can be created" do
    user = User.new(name: "first koala")
    assert user.save
  end

  test "User.fresh creates a new user with random name" do
    user = User.fresh
    assert user.save
    assert_not_nil user.name
  end
end
