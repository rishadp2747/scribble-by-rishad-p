# frozen_string_literal: true

json.site do
  json.extract! @site,
    :name,
    :authentication_token
  json.isPassword @site.isPassword
end
