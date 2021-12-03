# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  has_many :articles, dependent: :nullify

  validates :title, presence: true, uniqueness: true
  validates_associated :user
end
