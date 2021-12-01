# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "rails", "~> 6.1.4", ">= 6.1.4.1"

# friends of Rails
gem "sass-rails", ">= 6"

gem "webpacker", "~> 5.0"

# db
gem "pg", group: [:production]

gem "sqlite3", "~> 1.4", group: %i[development test]

# Application server
gem "puma", "~> 5.0"

# JSON builder
gem "jbuilder", "~> 2.7"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

# React
gem "react-rails"

group :development, :test do
  # Access a debugger console by calling 'byebug' anywhere in the code
  gem "byebug", platforms: %i[mri mingw x64_mingw]

  # For code formatting and linting
  gem "rubocop"
  gem "rubocop-rails"

  # Rails integration for factory_bot, a replacement for fixtures
  gem "factory_bot_rails"

  # For auto-generating demo data
  gem "faker"
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 4.1.0"

  # Reenable after https://github.com/rails/rails/issues/26158 is fixed
  gem "listen", "~> 3.3"

  # Spring speeds up development by keeping your application running in the background.
  gem "spring"
end

group :test do
  # gem for testing here
end
