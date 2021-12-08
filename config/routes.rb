# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do
    namespace :api do
      resources :categories, only: %i[index update create]
      resources :articles, except: %i[new edit]
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
