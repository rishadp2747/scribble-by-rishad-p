# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_should_not_be_valid_without_from_path
    @redirection.from_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_redirection_should_not_be_valid_without_to_path
    @redirection.to_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path can't be blank"
  end

  def test_redirection_should_not_be_valid_with_invalid_site
    assert_raises ActiveRecord::AssociationTypeMismatch do
      @redirection.site = ""
    end
  end
end
