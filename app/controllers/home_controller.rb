# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect

  def index
    render
  end

  def redirect
    redirection = Redirection.find_by_from_path(request.path)
    if redirection
      redirect_to redirection.to_path, status: 301
    end
  end
end
