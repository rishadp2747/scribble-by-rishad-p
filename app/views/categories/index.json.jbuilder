# frozen_string_literal: true

json.categories do
  json.array! @categories,
    :id,
    :title
end
