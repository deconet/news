class CreateStorySourceCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :story_source_categories, id: :uuid do |t|
      t.uuid :story_source_id
      t.string :name

      t.timestamps
    end
    add_column :stories, :story_source_category_id, :uuid
  end
end
