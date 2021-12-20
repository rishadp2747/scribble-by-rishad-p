# frozen_string_literal: true

class AddUniqueIndexForAuthenticationToken < ActiveRecord::Migration[6.1]
  def change
    add_index :sites, :authentication_token, unique: true
  end
end
