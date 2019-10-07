class CreateTripsInvites < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'uuid-ossp'
    create_table :trips_invites do |t|
      t.references :trip, :foreign_key => true, :null => false
      t.references :invited_by, :foreign_key => { :to_table => :users }, :null => false

      t.uuid :hash, :default => 'uuid_generate_v4()', :null => false
      t.string :invitee_email, :null => false

      t.timestamps
    end
  end
end
