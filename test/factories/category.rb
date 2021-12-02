# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Book.title }
  end
end
