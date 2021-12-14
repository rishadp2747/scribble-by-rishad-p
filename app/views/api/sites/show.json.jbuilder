# frozen_string_literal: true

json.site do
  json.extract! @site,
    :name

  json.isPassword @site.isPassword
end
