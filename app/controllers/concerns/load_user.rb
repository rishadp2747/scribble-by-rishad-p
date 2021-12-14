# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  def load_user!
    @current_user = User.find_by(email: "oliver@example.com")
    unless @current_user
      render status: :not_found, json: { error: t("not_found", entity: "User") }
    end
  end
end
