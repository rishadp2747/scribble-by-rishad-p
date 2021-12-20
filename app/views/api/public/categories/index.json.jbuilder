# frozen_string_literal: true

json.categories @categories do |category|

  if category.articles.size > 0
    json.extract! category,
      :id,
      :title
  end

end
