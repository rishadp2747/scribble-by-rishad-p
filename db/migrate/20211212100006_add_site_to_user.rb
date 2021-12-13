# frozen_string_literal: true

class AddSiteToUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :site, foreign_key: true
  end
end
