class Api::TripExclusionDatesController < Api::ApplicationController
  before_action :authenticate_user!

  #
  # Exclusion dates for a trip
  #
  def index
    safe_params = params.permit(:trip_id)

    trip_id = safe_params[:trip_id]
    trip = Trip.find(trip_id)

    trip_exclusion_dates = TripExclusionDate.where(
      :created_by => current_user,
      :trip => trip
    )

    return api_response(true, :trip_exclusion_dates => trip_exclusion_dates)
  end

  #
  # Create and update exclusion dates for a user
  #
  def create
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
      ).first_or_initialize
    end

    trip.trip_exclusion_dates = trip_exclusion_dates
    trip.refresh_trip_schedules!
    trip.save!

    return api_response(true, :trip_exclusion_dates => trip.trip_exclusion_dates)
  end  
end
