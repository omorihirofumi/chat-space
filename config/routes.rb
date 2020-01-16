Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # get 'messages/index'
  # root "messages#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:indexm, :new, :create, :edit ,:update]
end
