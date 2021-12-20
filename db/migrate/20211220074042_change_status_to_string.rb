# frozen_string_literal: true

class ChangeStatusToString < ActiveRecord::Migration[6.1]
  def change
    change_column :articles, :status, :string, default: "draft"
  end
end
