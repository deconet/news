class Story < ApplicationRecord
  validates :story_source_id, presence: true
  validates :id_at_source, uniqueness: true
end
