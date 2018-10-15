class AddDisplayNameToStorySource < ActiveRecord::Migration[5.2]
  def change
    add_column :story_sources, :display_name, :string
  end
end
