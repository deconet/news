class Story < ApplicationRecord
  belongs_to :story_source_category
  belongs_to :story_source
  validates :story_source_id, presence: true
  validates :id_at_source, uniqueness: true
end
