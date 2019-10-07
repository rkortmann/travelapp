class CreateTripsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :trips_users do |t|
      t.references :trip, :foreign_key => true, :null => false
      t.references :user, :foreign_key => true, :null => false

      t.timestamps
    end

    remove_column :trips, :created_by_id
  end
end
