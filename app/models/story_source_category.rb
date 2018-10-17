class StorySourceCategory < ApplicationRecord
  has_many :stories, dependent: :destroy
  belongs_to :story_source
end
