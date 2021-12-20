# frozen_string_literal: true

class AddDefaultPositionOfCategory < ActiveRecord::Migration[6.1]
  def change
    change_column_default :categories, :position, from: nil, to: 0
  end
end
