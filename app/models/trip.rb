class Trip < ApplicationRecord
  belongs_to :created_by, :class_name => 'User', :foreign_key => :created_by_id

  has_many :trip_schedules, :dependent => :destroy
  alias schedules trip_schedules
end
