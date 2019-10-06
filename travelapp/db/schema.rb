# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_29_151637) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accommodations", force: :cascade do |t|
    t.bigint "trip_schedule_id", null: false
    t.jsonb "raw"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trip_schedule_id"], name: "index_accommodations_on_trip_schedule_id"
  end

  create_table "accommodations_rates", force: :cascade do |t|
    t.bigint "accommodation_id", null: false
    t.bigint "rate_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_accommodations_rates_on_accommodation_id"
    t.index ["rate_id"], name: "index_accommodations_rates_on_rate_id"
  end

  create_table "addresses", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.string "extended_address"
    t.string "locality"
    t.string "region"
    t.string "postal_code"
    t.string "telephone"
    t.string "country"
    t.decimal "latitude"
    t.decimal "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flights", force: :cascade do |t|
    t.bigint "trip_schedule_id", null: false
    t.jsonb "raw"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trip_schedule_id"], name: "index_flights_on_trip_schedule_id"
  end

  create_table "flights_rates", force: :cascade do |t|
    t.bigint "flight_id", null: false
    t.bigint "rate_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["flight_id"], name: "index_flights_rates_on_flight_id"
    t.index ["rate_id"], name: "index_flights_rates_on_rate_id"
  end

  create_table "rates", force: :cascade do |t|
    t.decimal "rate", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "trip_schedules", force: :cascade do |t|
    t.datetime "start_date", null: false
    t.datetime "end_date", null: false
    t.bigint "trip_id", null: false
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trip_id"], name: "index_trip_schedules_on_trip_id"
  end

  create_table "trip_schedules_accommodations", force: :cascade do |t|
    t.bigint "trip_schedule_id", null: false
    t.bigint "accommodation_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_trip_schedules_accommodations_on_accommodation_id"
    t.index ["trip_schedule_id"], name: "index_trip_schedules_accommodations_on_trip_schedule_id"
  end

  create_table "trip_schedules_flights", force: :cascade do |t|
    t.bigint "trip_schedule_id", null: false
    t.bigint "flight_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["flight_id"], name: "index_trip_schedules_flights_on_flight_id"
    t.index ["trip_schedule_id"], name: "index_trip_schedules_flights_on_trip_schedule_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "boundry_start", null: false
    t.datetime "boundry_end", null: false
    t.integer "duration", null: false
    t.bigint "created_by_id", null: false
    t.bigint "destination_address_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["created_by_id"], name: "index_trips_on_created_by_id"
    t.index ["destination_address_id"], name: "index_trips_on_destination_address_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "name"
    t.bigint "origin_address_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["origin_address_id"], name: "index_users_on_origin_address_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "accommodations", "trip_schedules"
  add_foreign_key "accommodations_rates", "accommodations"
  add_foreign_key "accommodations_rates", "rates"
  add_foreign_key "flights", "trip_schedules"
  add_foreign_key "flights_rates", "flights"
  add_foreign_key "flights_rates", "rates"
  add_foreign_key "trip_schedules", "trips"
  add_foreign_key "trip_schedules_accommodations", "accommodations"
  add_foreign_key "trip_schedules_accommodations", "trip_schedules"
  add_foreign_key "trip_schedules_flights", "flights"
  add_foreign_key "trip_schedules_flights", "trip_schedules"
  add_foreign_key "trips", "addresses", column: "destination_address_id"
  add_foreign_key "trips", "users", column: "created_by_id"
  add_foreign_key "users", "addresses", column: "origin_address_id"
end
