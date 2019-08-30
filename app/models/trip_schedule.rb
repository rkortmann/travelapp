class TripSchedule < ApplicationRecord
  belongs_to :trip

  has_many :flights
  has_many :accommodations
end
