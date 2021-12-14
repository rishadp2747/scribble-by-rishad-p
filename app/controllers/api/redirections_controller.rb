# frozen_string_literal: true

class Api::RedirectionsController < ApplicationController
  before_action :load_site, excpet: %i[new edit show]
  before_action :load_redirection, only: %i[update destroy]

  def index
    @redirections = @site.redirections
  end

  def create
    @redirection = @site.redirections.new(redirection_params)
    unless @redirection.save
      handle_error_response(@redirection)
    end
  end

  def update
    if @redirection.update(redirection_params)
      handle_successful_response("redirection", "updated")
    else
      handle_error_response(@redirection)
    end
  end

  def destroy
    if @redirection.destroy
      handle_successful_response("redirection", "deleted")
    else
      handle_error_response(@redirection)
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection
      @redirection = @site.redirections.find(params[:id])
      unless @redirection
        handle_not_found_enitiy_response("Redirection")
      end
    end
end
