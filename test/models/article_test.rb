# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = create(:article)
  end

  def test_article_should_be_valid
    assert @article.valid?
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

  def test_title_should_be_valid_with_valid_length
    @article.title = "a" * 80
    assert @article.valid?
  end

  def test_title_should_not_be_valid_with_invalid_length
    @article.title = "a" * 81
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title is too long (maximum is 80 characters)"
  end

  def test_status_should_accept_valid_values
    @article.status = "draft"
    assert @article.valid?

    @article.status = "published"
    assert @article.valid?
  end

  def test_status_should_not_accept_invalid_values
    error = assert_raises ArgumentError do
      @article.status = "send"
    end
    assert_equal "'send' is not a valid status", error.message
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
