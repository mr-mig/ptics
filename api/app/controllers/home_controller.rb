class HomeController < ApplicationController
  def index
    user = User.fresh
    if user.save
      render json: user, status: :created
    else
      render json: { error: "Could not create a new user." }, status: :unprocessable_entity
    end
  end
end