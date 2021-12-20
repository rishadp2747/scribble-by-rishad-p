# frozen_string_literal: true

json.site do
  json.extract! @site,
    :name

  json.is_authorization_required @site.is_authorization_required
end
