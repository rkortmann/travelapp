class AddDayOfWeekRestrictionToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :day_of_week_restrictions, :string, :null => false, :default => 'none'
  end
end
