class Trip < ApplicationRecord
  belongs_to :created_by, :class_name => 'User', :foreign_key => :created_by_id
  belongs_to :destination_address, :class_name => 'Address', :foreign_key => :destination_address_id

  has_many :trip_exclusion_dates, :dependent => :destroy
  alias exclusion_dates trip_exclusion_dates

  has_many :trip_schedules, :dependent => :destroy
  alias schedules trip_schedules

  # Refresh the trip schedules based on exclusion dates
  def refresh_trip_schedules!
    excluded_dates = exclusion_dates.order(:excluded_date).map(&:excluded_date)

    # Try to build a list of valid trip schedules between the two trip
    # boundries
    updated_trip_schedules = []    
    working_date = boundry_start
    while working_date + duration.days < boundry_end do
      potential_start = working_date
      potential_end = working_date + duration.days

      if excluded_dates.none? { |excluded_date| (potential_start..potential_end).include? excluded_date }
        updated_trip_schedules << TripSchedule.where(
          :trip => self,
          :start_date => potential_start,
          :end_date => potential_end
        ).first_or_initialize
      end

      working_date = working_date + 1.day
    end

    self.trip_schedules = updated_trip_schedules
    save!
  end
end
