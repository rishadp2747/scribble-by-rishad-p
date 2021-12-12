# frozen_string_literal: true

require "faker"

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

def create_sample_data!
  puts "Seeding with sample data..."

  create_site!
  create_user!
  5.times do
    category = create_category!
    3.times do
      create_article!("draft", category)
      create_article!("published", category)
    end
  end

  puts 'Seeding done"'
end

def create_category!
  category_attributes = {
    title: Faker::Lorem.sentence(word_count: 2),
    user: @user
  }
  Category.create! category_attributes
end

def create_user!
  user_attribute = {
    name: "Oliver Smith",
    email: "oliver@example.com",
    site: @site
  }

  @user = User.create! user_attribute
end

def create_article!(status, category)
  article_attribute = {
    title: Faker::Book.title,
    body: Faker::Lorem.paragraph,
    status: status,
    category: category,
    user: @user
  }
  Article.create! article_attribute
end

def create_site!
  site_attribute = {
    name: "Spinkart",
    password: nil
  }

  @site = Site.create! site_attribute
end
