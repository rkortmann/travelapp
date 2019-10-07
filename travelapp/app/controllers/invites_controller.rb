class InvitesController < ApplicationController
  before_action :authenticate_user!

  #
  # Verify an invite and link a user to a trip
  #
  def accept
    safe_params = params.permit(:invite_code)

    invite = TripsInvite.find_by(:code => safe_params[:invite_code])

    if current_user && invite
      trip = invite.trip

      ap current_user

      TripsUser.where(
        :trip => trip,
        :user => current_user
      ).first_or_create!

      flash[:notice] = "Joined trip: #{trip.title}"
    end

    redirect_to '/trips'
  end
end
