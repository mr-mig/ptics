class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]

  # GET /tasks
  def index
    if (params[:list_id])
      @list = List.find(params[:list_id])
      @tasks = @list.tasks
    else 
      @tasks = Task.all
    end

    render json: @tasks.as_json(include: :owner)
  end

  # GET /tasks/1
  def show
    render json: @task.as_json(include: :owner)
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task.as_json(include: :owner), status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if task_params[:state].present? and task_params[:state] != @task.state
      begin
        transition_state(task_params[:state])
      rescue AASM::InvalidTransition => e
        return render json: { error: e.message }, status: :unprocessable_entity
      end
    end

    if @task.update(task_params.except(:state))
      render json: @task.as_json(include: :owner)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :state, :owner_id, :list_id)
    end

    def transition_state(new_state)
      case new_state
      when "ongoing"
        @task.start
      when "done"
        @task.complete
      when "todo"
        @task.reset
      end
    end
end
