# frozen_string_literal: true

json.articles @articles do |article|

  if article.published? && article.category.present?
    json.extract! article,
      :id,
      :title

    json.category article.category.title
  end

end
