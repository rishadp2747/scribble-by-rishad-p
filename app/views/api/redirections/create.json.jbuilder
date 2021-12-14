# frozen_string_literal: true

json.notice t("successfull_action", action: "created", entity: "redirection")

json.redirection do
  json.extract! @redirection,
    :id,
    :from_path,
    :to_path
end
