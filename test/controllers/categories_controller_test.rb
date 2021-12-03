# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @user.update(email: "oliver@example.com")
  end

  def test_list_all_categories
    3.times do
      create(:category, user: @user)
    end

    get categories_path
    assert_response :success
    assert_equal 3, response.parsed_body["categories"].length
  end

  def test_should_create_valid_category
    assert_difference -> { Category.all.count } do
      post categories_path, params: category_params
      assert_response :success
      assert_equal response.parsed_body["notice"], t("successfull_action", action: "created", entity: "category")
    end
  end

  private

    def category_params
      {
        category: {
          title: Faker::Lorem.sentence(word_count: 2)
        }
      }
    end
end
