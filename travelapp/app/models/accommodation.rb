class Accommodation < ApplicationRecord
  belongs_to :trip_schedule

  has_many :accommodations_rates
  has_many :rates, :through => :accommodations_rates
end
