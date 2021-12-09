# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do
    namespace :api do
      resources :categories, except: %i[new edit]
      resources :articles, except: %i[new edit]
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
