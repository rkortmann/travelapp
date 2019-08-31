Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get 'profile', :to => 'users#profile'

  resources :trips, :only => [:index, :show]

  namespace :api do
    # Users
    resources :users, :only => [:show]

    # Your trips
    resources :trips do
      resources :trip_schedules
    end
  end
end
