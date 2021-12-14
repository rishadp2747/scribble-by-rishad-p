# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do

    namespace :api do

      namespace :public do
        resource :session, only: :create
        resources :categories, only: :index
        resources :articles, only: %i[index show], param: :slug
      end

      resources :categories, except: %i[new edit] do
        put "sort", on: :collection
      end

      resource :site, only: %i[show update]
      resources :articles, except: %i[new edit]
      resources :redirections, except: %i[show new edit]

    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
