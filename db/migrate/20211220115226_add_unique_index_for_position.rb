# frozen_string_literal: true

class AddUniqueIndexForPosition < ActiveRecord::Migration[6.1]
  def change
    add_index :categories, :position, unique: true
  end
end
