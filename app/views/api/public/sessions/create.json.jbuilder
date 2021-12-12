# frozen_string_literal: true

json.notice t("successfully_logged", state: "in")

json.extract! @site,
  :id,
  :authentication_token
