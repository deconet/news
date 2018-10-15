class Story < ApplicationRecord
  belongs_to :story_source_category, optional: true
  belongs_to :story_source

  validates :story_source_id, presence: true
  validates :id_at_source, uniqueness: true,  presence: true

  def comments_url
    if story_source_category.nil?
      story_source.comments_url
      .gsub(':story_id', id_at_source)
    else
      story_source.comments_url
      .gsub(':category_name', story_source_category.name)
      .gsub(':story_id', id_at_source)
    end
  end
end
