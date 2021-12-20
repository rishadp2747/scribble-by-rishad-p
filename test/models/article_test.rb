# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = create(:article)
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Body can't be blank"
  end

  def test_title_should_not_be_valid_with_invalid_length
    @article.title = "a" * (Article::MAXIMUM_TITLE_LENGTH + 1)
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title is too long (maximum is #{Article::MAXIMUM_TITLE_LENGTH} characters)"
  end

  def test_slug_should_be_parameterized_title
    title = @article.title
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_titles
    first_article = create(:article, title: "Test Article")
    second_article = create(:article, title: "Test Article")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = create(:article, title: "Test-Article")
    second_article = create(:article, title: "Test-Article")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_article = create(:article)

    assert_raises ActiveRecord::RecordInvalid do
      another_article.update!(slug: @article.slug)
    end
  end

  def test_article_should_not_be_valid_with_invalid_category
    assert_raises ActiveRecord::AssociationTypeMismatch do
      @article.category = ""
    end
  end

  def test_article_should_not_be_valid_with_invalid_user
    assert_raises ActiveRecord::AssociationTypeMismatch do
      @article.user = ""
    end
  end
end
