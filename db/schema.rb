# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_17_075504) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "stories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "story_source_id"
    t.string "title"
    t.string "url"
    t.integer "comment_count"
    t.integer "score"
    t.string "id_at_source"
    t.datetime "story_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "story_source_category_id"
    t.string "author"
  end

  create_table "story_source_categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "story_source_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "story_sources", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "homepage_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "comments_url"
    t.string "display_name"
    t.string "access_token"
  end

end
