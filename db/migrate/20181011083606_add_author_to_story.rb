class AddAuthorToStory < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :author, :string
  end
end
