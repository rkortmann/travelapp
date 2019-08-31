class Trip < ApplicationRecord
  belongs_to :created_by, :class_name => 'User', :foreign_key => :created_by_id
  belongs_to :destination_address, :class_name => 'Address', :foreign_key => :destination_address_id

  has_many :trip_schedules, :dependent => :destroy
  alias schedules trip_schedules
end
