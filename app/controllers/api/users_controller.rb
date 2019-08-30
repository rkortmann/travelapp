class Api::UsersController < Api::ApplicationController
  before_action :authenticate_user!

  #
  # User page
  #
  def show
    api_response(true, :user => current_user)
  end
end
