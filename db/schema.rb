# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_20_115752) do

  create_table "articles", force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.string "status", default: "draft", null: false
    t.integer "category_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["category_id"], name: "index_articles_on_category_id"
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "position", default: 0
    t.index ["title"], name: "index_categories_on_title", unique: true
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "redirections", force: :cascade do |t|
    t.string "from_path", null: false
    t.string "to_path", null: false
    t.integer "site_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["from_path"], name: "index_redirections_on_from_path", unique: true
    t.index ["site_id"], name: "index_redirections_on_site_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest"
    t.string "authentication_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["authentication_token"], name: "index_sites_on_authentication_token", unique: true
    t.index ["name"], name: "index_sites_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "site_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["site_id"], name: "index_users_on_site_id"
  end

  add_foreign_key "articles", "categories", on_delete: :nullify
  add_foreign_key "articles", "users"
  add_foreign_key "categories", "users"
  add_foreign_key "redirections", "sites"
  add_foreign_key "users", "sites"
end
