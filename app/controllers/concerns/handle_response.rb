# frozen_string_literal: true

module HandleResponse
  extend ActiveSupport::Concern

  def handle_successful_response(entity, action)
    render status: :ok, json: { notice: t("successfull_action", action: action, entity: entity) }
  end

  def handle_error_response(entity)
    error = entity.errors.full_messages.to_sentence
    render status: :unprocessable_entity, json: { error: error }
  end
end
