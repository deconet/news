class AddCommentsUrlToStorySource < ActiveRecord::Migration[5.2]
  def change
    add_column :story_sources, :comments_url, :string
  end
end
