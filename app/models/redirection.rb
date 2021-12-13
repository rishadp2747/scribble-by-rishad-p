# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :site

  validates :from_path, presence: true
  validates :to_path, presence: true

  validates_associated :site
end
