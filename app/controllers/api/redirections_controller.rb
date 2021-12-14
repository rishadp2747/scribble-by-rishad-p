# frozen_string_literal: true

class Api::RedirectionsController < ApplicationController
  before_action :load_site!, only: %i[index create update destroy]
  before_action :load_redirection, only: %i[update destroy]

  def index
    @redirections = @site.redirections
  end

  def create
    @redirection = @site.redirections.new(redirection_params)
    unless @redirection.save
      error = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update
    if @redirection.update(redirection_params)
      render status: :ok, json: { notice: t("successfull_action", action: "updated", entity: "redirection") }
    else
      error = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("successfull_action", action: "deleted", entity: "redirection") }
    else
      error = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection
      @redirection = @site.redirections.find(params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("not_found", entity: "Redirection") }
      end
    end
end
