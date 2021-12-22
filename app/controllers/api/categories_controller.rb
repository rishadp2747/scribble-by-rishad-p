# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_user, excpet: %i[new edit]
  before_action :load_category, only: %i[update destroy reorder]

  def index
    @categories = @current_user.categories.includes(:articles).order(:position)
  end

  def update
    if @category.update(category_params)
      handle_successful_response("category", "updated")
    else
      handle_error_response(@category)
    end
  end

  def reorder
    @category.insert_at(category_params[:position])
  end

  def create
    @category = @current_user.categories.new(category_params)
    if @category.save
      handle_successful_response("category", "created")
    else
      handle_error_response(@category)
    end
  end

  def destroy
    if @category.destroy
      handle_successful_response("category", "deleted")
    else
      handle_error_response(@category)
    end
  end

  private

    def category_params
      params.require(:category).permit(:title, :position)
    end

    def load_category
      @category = @current_user.categories.find_by(id: params[:id])
      unless @category
        handle_not_found_enitiy_response("Category")
      end
    end
end
