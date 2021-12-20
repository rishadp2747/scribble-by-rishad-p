# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  has_many :articles, dependent: :nullify

  validates :title, presence: true, uniqueness: true
  validates :position, uniqueness: true
  validates_associated :user

  before_create :set_position

  private

    def set_position
      last_position = Category.last&.position || 0
      new_position = last_position + 1
      self.position = new_position
    end
end
