# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
  end

  def test_site_should_be_valid
    assert @site.valid?
  end

  def test_site_should_not_be_valid_without_name
    @site.name = ""
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Name can't be blank"
  end

  def test_site_should_not_be_valid_without_unique_name
    duplicate_site = @site.dup
    assert_not duplicate_site.valid?
    assert_includes duplicate_site.errors.full_messages, "Name has already been taken"
  end

  def test_password_should_not_be_of_invalid_length
    @site.password = "1a" * 2
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_password_should_be_valid_of_valid_length
    @site.password = "1a" * 3
    assert @site.valid?
  end

  def test_password_should_not_be_of_invalid_format
    invalid_passwords = %w[111111 aaaaaa]
    invalid_passwords.each do |password|
      @site.password = password
      assert_not @site.valid?
    end
  end
end
