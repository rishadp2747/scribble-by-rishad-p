# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_user!, except: %i[new edit]
  before_action :load_article, only: %i[destroy show update]

  def index
    @articles = @current_user.articles
  end

  def show
    unless @article
      error = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("successfull_action", action: "updated", entity: "article") }
    else
      error = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def create
    article = @current_user.articles.new(article_params)
    if article.save
      render status: :ok, json: { notice: t("successfull_action", action: "created", entity: "article") }
    else
      error = article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("successfull_action", action: "deleted", entity: "article") }
    else
      error = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article
      @article = @current_user.categories.find(params[:id])
    end
end
