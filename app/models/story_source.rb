class StorySource < ApplicationRecord
  validates :name, uniqueness: true
end
