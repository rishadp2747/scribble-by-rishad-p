# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :body,
    :status

  json.author article.user.name
  json.category article.category.present? ? article.category.title : "-"
  json.date article.Published? ? article.convert_date_format : "-"
end

json.counts do
  json.all @articles.count
  json.published @articles.Published.count
  json.draft @articles.Draft.count
end
