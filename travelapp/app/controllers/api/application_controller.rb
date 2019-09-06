class Api::ApplicationController < ApplicationController

  def api_response(success, data, response_params = {})
    render({
      :json => {
        :success => success,
        :data => data
      }
    }.merge(response_params))
  end

  def authenticate_user!
    if current_user.nil?
      api_response(
        false,
        { :error => 'not_authorized' },
        :status => :unauthorized
      )
    end
  end
end
