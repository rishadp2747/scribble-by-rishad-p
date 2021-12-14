# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  def authenticate_site_using_x_auth_token
    auth_token = request.headers["X-Auth-Token"].presence
    is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(@site.authentication_token, auth_token)

    unless @site && is_valid_token
      render status: :unauthorized, json: { error: t("session.could_not_auth") }
    end
  end
end
