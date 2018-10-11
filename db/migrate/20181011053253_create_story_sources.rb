class CreateStorySources < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
    create_table :story_sources, id: :uuid do |t|
      t.string :name
      t.string :homepage_url

      t.timestamps
    end
  end
end
