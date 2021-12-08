# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_title
    @category.title = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Title can't be blank"
  end

  def test_category_should_not_be_valid_without_unique_title
    duplicate_category = @category.dup
    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors.full_messages, "Title has already been taken"
  end

  def test_category_should_not_be_valid_without_unique_position
    @category.position = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Position can't be blank"
  end

  def test_category_should_not_be_valid_without_unique_position
    duplicate_category = @category.dup
    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors.full_messages, "Position has already been taken"
  end
end
