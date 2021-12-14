# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  def load_site
    @site = Site.first
    unless @site
      handle_not_found_enitiy_response("Site")
    end
  end

  def is_authenticatable
    @site.isPassword
  end
end
