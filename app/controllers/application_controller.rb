# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include LoadUser
  include LoadSite
  include Authenticatable
end
