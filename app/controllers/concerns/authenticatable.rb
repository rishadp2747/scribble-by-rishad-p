# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  private

    def authenticate_site_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(@site.authentication_token, auth_token)

      unless @site && is_valid_token
        render status: :unauthorized, json: { error: t("session.could_not_auth") }
      end
    end

    def is_authenticatable
      @site.is_authentication_required
    end
end
