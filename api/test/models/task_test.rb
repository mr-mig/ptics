require "test_helper"

class TaskTest < ActiveSupport::TestCase
  setup do
    @task = tasks(:t1)
  end

  test "should transition task from todo to ongoing" do
    @task.start!
    assert_equal 'ongoing', @task.state
  end

  test "should transition task from ongoing to done" do
    @task.start!
    @task.complete!
    assert_equal 'done', @task.state
  end

  test "should transition task from done to ongoing" do
    @task.start!
    @task.complete!
    @task.reopen!
    assert_equal 'ongoing', @task.state
  end

  test "should transition task from ongoing to todo" do
    @task.start!
    @task.reset!
    assert_equal 'todo', @task.state
  end

  test "should not transition task from done to todo" do
    @task.start!
    @task.complete!
    
    assert_raises AASM::InvalidTransition do
      @task.reset!
    end

    assert_equal 'done', @task.state
  end
end
