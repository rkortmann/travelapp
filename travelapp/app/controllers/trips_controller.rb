class TripsController < ApplicationController
  before_action :authenticate_user!

  #
  # Feeds the app bar subtitle
  #
  def set_page_title
    @page_title = 'Trips'
  end

  #
  # Simple trip list react app
  #
  def index; end

  #
  # React app that handles CRUD
  # on all trip properties
  #
  def show
    @trip_id = params[:id]
  end
end
