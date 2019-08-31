class FlightsRate < ApplicationRecord
  belongs_to :flight
  belongs_to :rate
end
