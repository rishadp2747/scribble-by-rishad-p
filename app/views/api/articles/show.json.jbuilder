# frozen_string_literal: true

json.article do
  json.extract! @article,
    :id,
    :title,
    :body,
    :category,
    :status

  json.date @article.published? ? @article.convert_date_format : "-"
end
