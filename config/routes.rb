# frozen_string_literal: true

Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do

    namespace :public do
      resources :sessions, only: :create
      resources :categories, only: :index
      resources :articles, only: :index
    end

    resources :articles, except: %i[new edit]
    resources :categories, except: %i[new edit] do
      put "sort", on: :collection
    end
    resource :sites, only: %i[show update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
