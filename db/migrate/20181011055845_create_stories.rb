class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories, id: :uuid do |t|
      t.uuid :story_source_id
      t.string :title
      t.string :url
      t.integer :comment_count
      t.integer :score
      t.string :id_at_source
      t.timestamp :story_time

      t.timestamps
    end
  end
end
