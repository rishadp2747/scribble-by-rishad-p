# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. :a-z]+)*\.[a-z]+\z/i.freeze

  has_many :articles
  has_many :categories
  belongs_to :site

  accepts_nested_attributes_for :categories

  validates :name, presence: true, length: { maximum: Constants::MAXIMUM_USER_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true, length: { maximum: Constants::MAXIMUM_USER_EMAIL_LENGTH },
            format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
