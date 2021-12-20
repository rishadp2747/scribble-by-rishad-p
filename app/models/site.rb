# frozen_string_literal: true

class Site < ApplicationRecord
  MINIMUM_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /\A.(?=.*?[0-9])(?=.*?[A-Za-z]).+$\z/i.freeze

  has_one :user
  has_many :redirections

  has_secure_password validations: false
  has_secure_token :authentication_token

  validates :name, presence: true, uniqueness: true
  validates :password, length: { minimum: MINIMUM_PASSWORD_LENGTH }, format: { with: VALID_PASSWORD_REGEX }, if: -> {
password.present? }

  def is_authorization_required
    self.password_digest.present?
  end
end
