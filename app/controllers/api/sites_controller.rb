# frozen_string_literal: true

class Api::SitesController < ApplicationController
  before_action :load_site!, only: %i[show update]

  def show
    render
  end

  def update
    if @site.update(site_params)
      handle_successful_response("site", "updated")
    else
      handle_error_response(@site)
    end
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end
end
