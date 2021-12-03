# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :status, null: false, default: 0
      t.references :category, foreign_key: { on_delete: :nullify }
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
