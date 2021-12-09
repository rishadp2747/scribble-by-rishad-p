# frozen_string_literal: true

class CreateSites < ActiveRecord::Migration[6.1]
  def change
    create_table :sites do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :password_digest
      t.string :authentication_token

      t.timestamps
    end
  end
end
