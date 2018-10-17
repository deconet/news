class StorySource < ApplicationRecord
  has_many :stories
  has_many :story_source_categories

  validates :name, uniqueness: true, presence: true
  validates :comments_url, presence: true

  accepts_nested_attributes_for :story_source_categories
end
