# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  def load_user!
    @current_user = User.find_by(email: "oliver@example.com")
  end
end
