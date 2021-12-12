# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_site!, only: :index

  def index
    @site.user.categories.all.order(:position)
  end
end
