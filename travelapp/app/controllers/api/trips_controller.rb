class Api::TripsController < Api::ApplicationController
  before_action :authenticate_user!

  #
  # Basic list of trips
  #
  def index
    trips = current_user.trips.as_json(:include => [:destination_address])
    api_response(true, :trips => trips)
  end

  #
  # Create a new trip
  # 
  def create
    safe_params = params.permit(
      :title,
      :startDate,
      :endDate,
      :duration,
      :dowRestrictions,
      :destination => [:name, :lat, :lng]
    )

    trip = Trip.create!(
      :title => safe_params[:title],
      :boundry_start => safe_params[:startDate].to_datetime,
      :boundry_end => safe_params[:endDate].to_datetime,
      :duration => safe_params[:duration],
      :day_of_week_restrictions => safe_params[:dowRestrictions],
      :destination_address => Address.create!(
        :name => safe_params[:destination][:name],
        :latitude => safe_params[:destination][:lat],
        :longitude => safe_params[:destination][:lng],
      )
    )

    TripsUser.create!(
      :trip => trip,
      :user => current_user
    )

    return api_response(true, :trip => trip)
  end

  #
  # Show a trip
  #
  def show
    id = params[:id]

    trip = Trip.find_by(:id => id)
    trip_data = trip.as_json(:include => [
      :destination_address,
      :users
    ])

    if trip
      api_response(true, :trip => trip_data)
    else
      api_response(false, :trip => {})
    end
  end

  def schedules
    safe_params = params.permit(:trip_id)

    trip_id = safe_params[:trip_id]
    trip = Trip.find(trip_id)

    trip_schedules = trip.trip_schedules.order(:start_date)

    return api_response(true, :trip_schedules => trip_schedules)
  end

  def exclusion_dates
    safe_params = params.permit(:trip_id)

    trip_id = safe_params[:trip_id]
    trip = Trip.find(trip_id)

    trip_exclusion_dates = TripExclusionDate.where(
      :created_by => current_user,
      :trip => trip
    )

    return api_response(true, :trip_exclusion_dates => trip_exclusion_dates)
  end

  def update_exclusion_dates
    safe_params = params.permit(:trip_id, :exclusionDates => [])

    trip_id = safe_params[:trip_id]
    trip = Trip.find(trip_id)

    exclusion_dates = safe_params[:exclusionDates] || []

    trip_exclusion_dates = exclusion_dates.map do |exclusion_date|
      date = exclusion_date.to_datetime

      TripExclusionDate.where(
        :created_by => current_user,
        :trip => trip,
        :excluded_date => date
      ).first_or_create!
    end

    # Clear our exclusions that weren't in this post
    trip.trip_exclusion_dates.
      where(:created_by => current_user).
      where.not(:id => trip_exclusion_dates.map(&:id)).
      destroy_all

    trip.refresh_trip_schedules!
    trip.save!

    return api_response(true, :trip_exclusion_dates => trip_exclusion_dates)
  end
end
