Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get 'profile', :to => 'users#profile'

  resources :trips, :only => [:index, :show] do
    member do
      get 'details', :action => :show
      get 'schedules', :action => :show
      get 'availability', :action => :show
    end
  end

  get 'invite/:invite_code', :to => 'invites#accept'

  namespace :api do
    # Users
    resources :users, :only => [:show]

    # Your trips
    resources :trips do
      # Get and set user exclusion dates
      get 'trip_exclusion_dates', :to => 'trips#exclusion_dates'
      post 'trip_exclusion_dates', :to => 'trips#update_exclusion_dates'

      # Available schedules for a trip
      get 'trip_schedules', :to => 'trips#schedules'
    end
  end
end
