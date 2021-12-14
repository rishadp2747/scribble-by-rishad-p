# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  def load_site!
    @site = Site.first
    unless @site
      render status: :not_found, json: { error: t("not_found", entity: "Site") }
    end
  end

  def is_authenticatable
    @site.isPassword
  end
end
