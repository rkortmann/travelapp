class TripsInvite < ApplicationRecord
  belongs_to :trip
  belongs_to :invited_by, :class_name => 'User', :foreign_key => :invited_by_id

  def self.generate(trip_id, user_id)
    code = [*'0'..'9',*'A'..'Z'].sample(6).join

    TripsInvite.new(
      :trip_id => trip_id,
      :invited_by_id => user_id,
      :code => code
    )
  end
end
