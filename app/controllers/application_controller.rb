# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include HandleResponse
  include LoadUser
  include LoadSite
  include Authenticatable
end
