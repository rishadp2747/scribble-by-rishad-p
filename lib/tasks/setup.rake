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
  5.times do
    create_category!
  end
  puts 'Seeding done"'
end

def create_category!
  category_attributes = {
    title: Faker::Lorem.sentence(word_count: 2)
  }
  Category.create! category_attributes
end
