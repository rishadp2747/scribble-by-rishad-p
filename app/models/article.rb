# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category

  enum status: { draft: 0, published: 1 }

  validates :title, presence: true, length: { maximum: 80 }
  validates :body, presence: true

  validates_associated :category, on: :create
  validates_associated :user

  before_create :set_slug!

  def convert_date_format
    self.updated_at.strftime("%B %d, %Y")
  end

  private

    def set_slug!
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$").order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end
end
