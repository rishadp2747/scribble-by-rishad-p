# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    name { Faker::Name.name }
  end
end
