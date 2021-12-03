# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category

  enum status: { draft: 0, published: 1 }

  validates :title, presence: true, length: { maximum: 80 }
  validates :body, presence: true

  validates_associated :category, on: :create
  validates_associated :user

  def convert_date_format
    self.updated_at.strftime("%B %d, %Y")
  end

  def find_unique_category_from_articles(articles)
    @articles.uniq { |article| article.category.id }
  end
end
