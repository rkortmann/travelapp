class Trip < ApplicationRecord
  enum :day_of_week_restrictions => [ :active, :archived ]

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
      potential_start = working_date.to_date
      potential_end = (working_date + duration.days).to_date
      potential_range = (potential_start..potential_end)

      # tick the working date
      working_date = working_date + 1.day

      # Check trip day of week exclusions
      next unless potential_range.any? { |date| wday_index_for(day_of_week_restrictions).any? { |exclusion| exclusion.include? date.wday }}

      # Check excluded dates
      next if excluded_dates.any? { |excluded_date| (potential_range).include? excluded_date.to_date }

      # Create a trip schedule if it doesn't already exist
      ap potential_start
      updated_trip_schedules << TripSchedule.where(
        :trip => self,
        :start_date => potential_start.in_time_zone('EST'),
        :end_date => potential_end.in_time_zone('EST')
      ).first_or_initialize
    end

    self.trip_schedules = updated_trip_schedules
    save!
  end

  def wday_index_for(exclusion_type)
    case exclusion_type
    when 'none'
      []
    when 'saturday'
      [[6]]
    when 'sunday'
      [[0]]
    when 'either'
      [[0],[6]]
    when 'both'
      [[0,6]]
    else
      []
    end
  end
end
