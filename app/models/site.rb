# frozen_string_literal: true

class Site < ApplicationRecord
  VALID_PASSWORD_REGEX = /\A.(?=.*?[0-9])(?=.*?[A-Za-z]).+$\z/i.freeze

  has_secure_password validations: false
  has_secure_token :authentication_token

  validates :name, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? }
end
