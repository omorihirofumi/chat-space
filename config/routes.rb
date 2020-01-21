Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # get 'messages/index'
  # root "messages#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit ,:update]  do
    resources :messages, only: [:index, :create]
  end
end