# frozen_string_literal: true

module Constants
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"

  MAXIMUM_ARTICLE_TITLE_LENGTH = 80
  MAXIMUM_USER_NAME_LENGTH = 30
  MAXIMUM_USER_EMAIL_LENGTH = 50

  MINIMUM_USER_PASSWORD_LENGTH = 6
end
