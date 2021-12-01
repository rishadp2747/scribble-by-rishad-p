# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    5.times do
      create(:category)
    end
  end

  def test_list_all_categories
    get categories_path
    assert_response :success
    response_json = response.parsed_body

    categories = Category.all

    assert_equal response_json["categories"].length, categories.count
  end
end
