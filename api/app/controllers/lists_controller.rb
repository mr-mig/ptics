class ListsController < ApplicationController
  before_action :set_list, only: %i[ show update destroy ]

  # GET /lists
  def index
    @lists = List.all

    render json: @lists
  end

  # GET /lists/1
  def show
    render json: @list
  end

  # POST /lists
  def create
    @list = List.new(list_params)
    @list.login_key = SecureRandom.hex(10) # Generates a random 20-character string

    if @list.save
      render json: @list, status: :created, location: @list
    else
      #check for validation errors
      
      if @list.errors.any?
        render json: @list.errors, status: :bad_request
      else
        render json: @list.errors, status: :internal_server_error
      end
    end
  end

  # PATCH/PUT /lists/1
  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :internal_server_error
    end
  end

  # DELETE /lists/1
  def destroy
    @list.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def list_params
      params.require(:list).permit(:title, :owner_id)
    end
end
