# frozen_string_literal: true

json.articles @articles do |article|

  if article.published? && article.category.present?
    json.extract! article,
      :id,
      :title,
      :body

    json.author article.user.name
    json.category article.category.title
    json.date article.convert_date_format
  end

end
