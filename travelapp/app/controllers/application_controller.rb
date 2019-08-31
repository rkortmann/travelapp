class ApplicationController < ActionController::Base
  before_action :set_page_title

  # This should be overriden by specific controllers
  def set_page_title
    @page_title = nil
  end

  def authenticate_user!(redirect = nil)
    if current_user.nil?
      sign_out
      redirect_to redirect || new_user_session_path
    end
  end
end
