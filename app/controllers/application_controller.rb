# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include LoadUser
  include LoadSite
  include Authenticatable
end
