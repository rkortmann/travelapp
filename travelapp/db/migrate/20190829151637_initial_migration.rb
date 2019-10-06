# frozen_string_literal: true

class InitialMigration < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :name

      t.string :street_address
      t.string :extended_address
      t.string :locality
      t.string :region
      t.string :postal_code
      t.string :telephone
      t.string :country

      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end

    create_table :users do |t|
      ## Database authenticatable
      t.string :email, :null => false, :default => ""
      t.string :encrypted_password, :null => false, :default => ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.string :name
      t.references :origin_address, :foreign_key => { :to_table => :addresses }

      t.timestamps :null => false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true

    create_table :trips do |t|
      t.string :title, :null => false

      # Trip length and boundries
      t.datetime :boundry_start, :null => false
      t.datetime :boundry_end, :null => false
      t.integer :duration, :null => false

      t.references :created_by, :foreign_key => { :to_table => :users }, :null => false
      t.references :destination_address, :foreign_key => { :to_table => :addresses }, :null => false

      t.timestamps
    end

    create_table :trip_schedules do |t|
      t.datetime :start_date, :null => false
      t.datetime :end_date, :null => false

      t.references :trip, :foreign_key => true, :null => false

      t.string :notes

      t.timestamps
    end

    #
    # Elements of a trip
    #
    create_table :flights do |t|
      t.references :trip_schedule, :foreign_key => true, :null => false
      t.jsonb :raw

      t.timestamps
    end

    create_table :accommodations do |t|
      t.references :trip_schedule, :foreign_key => true, :null => false
      t.jsonb :raw

      t.timestamps
    end

    #
    # Linking to schedules
    #
    create_table :trip_schedules_flights do |t|
      t.references :trip_schedule, :foreign_key => true, :null => false
      t.references :flight, :foreign_key => true, :null => false

      t.timestamps
    end

    create_table :trip_schedules_accommodations do |t|
      t.references :trip_schedule, :foreign_key => true, :null => false
      t.references :accommodation, :foreign_key => true, :null => false

      t.timestamps
    end

    #
    # Linking Rates
    #
    create_table :rates do |t|
      t.decimal :rate, :null => false

      t.timestamps
    end

    create_table :flights_rates do |t|
      t.references :flight, :foreign_key => true, :null => false
      t.references :rate, :foreign_key => true, :null => false

      t.timestamps
    end

    create_table :accommodations_rates do |t|
      t.references :accommodation, :foreign_key => true, :null => false
      t.references :rate, :foreign_key => true, :null => false

      t.timestamps
    end
  end
end
