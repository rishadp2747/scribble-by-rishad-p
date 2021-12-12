# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_site!, only: :index
  before_action :authenticate_site_using_x_auth_token, only: :index, if: :is_authenticatable

  def index
    @categories = @site.user.categories.all.order(:position)
  end
end
