# frozen_string_literal: true

module HandleResponse
  extend ActiveSupport::Concern

  def handle_error_response(entity)
    error = entity.errors.full_messages.to_sentence
    render status: :unprocessable_entity, json: { error: error }
  end
end
