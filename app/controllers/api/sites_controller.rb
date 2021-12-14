# frozen_string_literal: true

class Api::SitesController < ApplicationController
  before_action :load_site!, only: %i[show update]

  def show
    render
  end

  def update
    if @site.update(site_params)
      render status: :ok, json: { notice: t("successfull_action", action: "updated", entity: "site settings") }
    else
      handle_error_response(@site)
    end
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end
end
