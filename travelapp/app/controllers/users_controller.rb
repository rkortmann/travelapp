class UsersController < ApplicationController
  before_action :authenticate_user!

  def set_page_title
    @page_title = 'Profile'
  end

  #
  # User page
  #
  def profile
    
  end
end
