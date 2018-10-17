class AddAccessTokenToStorySource < ActiveRecord::Migration[5.2]
  def change
    add_column :story_sources, :access_token, :string
  end
end
