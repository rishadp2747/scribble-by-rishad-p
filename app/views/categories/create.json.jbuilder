# frozen_string_literal: true

json.notice t("successfull_action", action: "created", entity: "category")
json.category do
  json.extract! @category,
    :id,
    :title
end
