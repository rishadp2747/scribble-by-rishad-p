# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do

    namespace :api do

      namespace :public do
        resources :sessions, only: :create
        resources :categories, only: :index
        resources :articles, only: %i[index show], param: :slug
      end

      resources :categories, except: %i[new edit] do
        put "sort", on: :collection
      end

      resources :articles, except: %i[new edit]
      resources :redirections, except: %i[show new edit]
      resource :sites, only: %i[show update]

    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
