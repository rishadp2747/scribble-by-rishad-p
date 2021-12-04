# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @user.update(email: "oliver@example.com")
    @article = create(:article, user: @user)
  end

  def test_list_all_articles
    3.times do
      create(:article, user: @user)
    end

    get api_articles_path
    assert_response :success
    assert_equal 4, response.parsed_body["articles"].length
  end

  def test_article_can_be_created
    assert_difference -> { Article.all.count } do
      post api_articles_path, params: article_params
      assert_response :success
      assert_equal response.parsed_body["notice"], t("successfull_action", action: "created", entity: "article")
    end
  end

  def test_show_article
    get api_article_path(@article)
    assert_response :success
    assert_equal response.parsed_body["article"]["id"], @article.id
  end

  def test_article_can_be_updated
    puts article_params
    put api_article_path(@article), params: article_params
    assert_response :success
    assert_equal response.parsed_body["notice"], t("successfull_action", action: "updated", entity: "article")
  end

  def test_article_can_be_deleted
    assert_difference -> { Article.all.count }, -1 do
      delete api_article_path(@article)
      assert_response :success
      assert_equal response.parsed_body["notice"], t("successfull_action", action: "deleted", entity: "article")
    end
  end

  private

    def article_params
      {
        article: {
          title: Faker::Lorem.sentence(word_count: 2),
          body: Faker::Lorem.paragraph,
          status: "published",
          category_id: create(:category).id
        }
      }
    end
end
