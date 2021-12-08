# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_user!, only: %i[index update create]
  before_action :load_category, only: :update

  def index
    @categories = @current_user.categories.all
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { notice: t("successfull_action", action: "updated", entity: "category") }
    else
      error = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def create
    @category = @current_user.categories.new(category_params)
    unless @category.save
      error = @category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def category_params
      params.require(:category).permit(:title, :position)
    end

    def load_category
      @category = @current_user.categories.find(params[:id])
    end
end
