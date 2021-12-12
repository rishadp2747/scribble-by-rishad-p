# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_site!, only: :index
  before_action :authenticate_site_using_x_auth_token, only: :index, if: :is_authenticatable

  def index
    @articles = @site.user.articles
  end
end
