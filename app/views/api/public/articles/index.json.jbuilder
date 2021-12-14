# frozen_string_literal: true

json.articles @articles do |article|

  if article.Published? && article.category.present?
    json.extract! article,
      :id,
      :title,
      :slug

    json.category article.category.title
  end

end
