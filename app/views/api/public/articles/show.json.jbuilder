# frozen_string_literal: true

json.article do

  if @article.published? && @article.category.present?
    json.extract! @article,
      :id,
      :title,
      :body

    json.category @article&.category.title
    json.date @article.convert_date_format
  end
end
