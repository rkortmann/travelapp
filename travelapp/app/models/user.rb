class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # has_many :trips, :foreign_key => :created_by_id, :dependent => :nullify

  has_many :trips_users, :dependent => :destroy
  has_many :trips, :through => :trips_users
end
