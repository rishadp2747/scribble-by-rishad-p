# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_site!, only: :index
  before_action :authenticate_site, only: :index, if: @site.password.present?

  def index
    @categories = @site.user.categories.all.order(:position)
  end
end
