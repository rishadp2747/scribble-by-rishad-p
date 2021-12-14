# frozen_string_literal: true

class Api::Public::SessionsController < ApplicationController
  before_action :load_site, only: :create

  def create
    unless @site.present? && @site.authenticate(site_params[:password])
      render status: :unauthorized, json: { error: t("session.incorrect_credentials") }
    end
  end

  private

    def site_params
      params.require(:site).permit(:password)
    end
end
