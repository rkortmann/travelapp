class Api::TripsController < Api::ApplicationController
  before_action :authenticate_user!

  #
  # Basic list of trips
  #
  def index
    trips = current_user.trips.as_json(:include => [:created_by, :destination_address])
    api_response(true, :trips => trips)
  end

  #
  # Create a new trip
  # 
  def create
    safe_params = params.permit(
      :title,
      :destination => [:name, :lat, :lng]
    )

    trip = Trip.create!(
      :title => safe_params[:title],
      :created_by => current_user,
      :destination_address => Address.create!(
        :name => safe_params[:destination][:name],
        :latitude => safe_params[:destination][:lat],
        :longitude => safe_params[:destination][:lng],
      )
    )

    return api_response(true, :trip => trip)
  end

  #
  # Show a trip
  #
  def show
    id = params[:id]

    trip = Trip.find_by(:id => id)
    trip_data = trip.as_json(:include => [:trip_schedules])

    if trip
      api_response(true, :trip => trip_data)
    else
      api_response(false, :trip => {})
    end
  end
end
