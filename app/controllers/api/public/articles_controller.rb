# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_site!, only: %i[index show]
  before_action :authenticate_site_using_x_auth_token, only: %i[index show], if: :is_authenticatable
  before_action :load_article, only: :show

  def index
    @articles = @site.user.articles
  end

  def show
    unless @article
      error = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def load_article
      @article = @site.user.articles.find(params[:id])
    end
end
