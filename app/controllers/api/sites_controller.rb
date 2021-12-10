# frozen_string_literal: true

class Api::SitesController < ApplicationController
  def show
    @site = Site.first
  end
end
