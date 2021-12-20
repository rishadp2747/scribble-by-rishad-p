# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  def load_user
    admin_user_email = "oliver@example.com"
    @current_user = User.find_by(email: admin_user_email)
    unless @current_user
      handle_not_found_enitiy_response("User")
    end
  end
end
