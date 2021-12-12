# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_site!, only: :index
  before_action :load_user!, only: :index
end
