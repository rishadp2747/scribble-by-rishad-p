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
      handle_error_response(@article)
    end
  end

  private

    def load_article
      @article = @site.user.articles.find_by_slug(params[:slug])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
