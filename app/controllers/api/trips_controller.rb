class Api::TripsController < Api::ApplicationController
  before_action :authenticate_user!

  #
  # Basic list of trips
  #
  def index
    api_response(true, :trips => current_user.trips)
  end
end
