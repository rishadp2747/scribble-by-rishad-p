# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_site, only: %i[index show]
  before_action :authenticate_site_using_x_auth_token, only: %i[index show], if: :is_authentication_required
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
      @article = @site.user.articles.find_by(slug: params[:slug])
      unless @article
        handle_not_found_enitiy_response("Article")
      end
    end
end
