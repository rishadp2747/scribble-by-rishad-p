# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_user, except: %i[new edit]
  before_action :load_article, only: %i[destroy show update]

  def index
    @articles = @current_user.articles.order("updated_at DESC")
  end

  def show
    unless @article
      handle_error_response(@article)
    end
  end

  def update
    if @article.update(article_params)
      handle_successful_response("article", "updated")
    else
      handle_error_response(@article)
    end
  end

  def create
    article = @current_user.articles.new(article_params)
    if article.save
      handle_successful_response("article", "created")
    else
      handle_error_response(article)
    end
  end

  def destroy
    if @article.destroy
      handle_successful_response("article", "deleted")
    else
      handle_error_response(@article)
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article
      @article = @current_user.articles.find_by(id: params[:id])
      unless @article
        handle_not_found_enitiy_response("Article")
      end
    end
end
