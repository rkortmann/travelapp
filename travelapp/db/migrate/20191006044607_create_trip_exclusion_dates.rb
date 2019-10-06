class CreateTripExclusionDates < ActiveRecord::Migration[6.0]
  def change
    create_table :trip_exclusion_dates do |t|
      t.references :trip, :foreign_key => true, :null => false
      t.references :created_by, :foreign_key => { :to_table => :users }, :null => false

      t.datetime :excluded_date, :null => false

      t.timestamps
    end
  end
end
