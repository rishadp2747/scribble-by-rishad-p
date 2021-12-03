# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_user!, only: %i[index create]

  def index
    @categories = @current_user.categories.all
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
      params.require(:category).permit(:title)
    end
end
