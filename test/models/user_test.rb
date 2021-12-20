# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_user_should_not_be_valid_without_name
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name can't be blank"
  end

  def test_name_should_not_valid_with_invalid_length
    @user.name = "a" * (User::MAXIMUM_NAME_LENGTH + 1)
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name is too long (maximum is #{User::MAXIMUM_NAME_LENGTH } characters)"
  end

  def test_user_should_not_be_valid_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_email_should_not_be_valid_with_invalid_length
    @user.email = "#{"a" * User::MAXIMUM_EMAIL_LENGTH}@test.com"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email is too long (maximum is #{User::MAXIMUM_EMAIL_LENGTH} characters)"
  end

  def test_user_should_be_valid_with_valid_email
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
      first.last@example.in]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_user_should_not_be_valid_with_invalid_email
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "OLIVER@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end
end
