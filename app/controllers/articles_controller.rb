# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_user!, only: %i[create index]

  def index
    @articles = @current_user.articles
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

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end
end
