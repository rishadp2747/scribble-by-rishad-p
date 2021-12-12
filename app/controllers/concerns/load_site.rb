# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  def load_site!
    @site = Site.first
  end
end
