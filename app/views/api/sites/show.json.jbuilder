# frozen_string_literal: true

json.site do
  json.extract! @site,
    :name

  json.is_authentication_required @site.is_authorization_required
end
