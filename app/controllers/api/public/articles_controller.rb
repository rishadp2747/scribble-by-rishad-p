# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_site!, only: :index
  before_action :authenticate_site, only: :index, if: @site.password.present?

  def index
    @articles = @site.user.articles
  end
end
