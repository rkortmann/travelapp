class Flight < ApplicationRecord
  belongs_to :trip_schedule

  has_many :flights_rates
  has_many :rates, :through => :flights_rates
end
