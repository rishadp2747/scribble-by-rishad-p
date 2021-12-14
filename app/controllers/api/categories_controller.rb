# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_user!, excpet: %i[new edit]
  before_action :load_category, only: %i[update destroy]

  def index
    @categories = @current_user.categories.all.order(:position)
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { notice: t("successfull_action", action: "updated", entity: "category") }
    else
      handle_error_response(@category)
    end
  end

  def sort
    if @current_user.update(categories_params)
      render status: :ok, json: { success: true }
    else
      handle_error_response(@current_user)
    end
  end

  def create
    @category = @current_user.categories.new(category_params)
    unless @category.save
      handle_error_response(@category)
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("successfull_action", action: "deleted", entity: "category") }
    else
      handle_error_response(@category)
    end
  end

  private

    def category_params
      params.require(:category).permit(:title, :position)
    end

    def categories_params
      params.require(:categories).permit(categories_attributes: [:id, :title, :position])
    end

    def load_category
      @category = @current_user.categories.find(params[:id])
      unless @category
        render status: :not_found, json: { error: t("not_found", entity: "Category") }
      end
    end
end
