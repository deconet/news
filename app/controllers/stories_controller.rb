class StoriesController < ApplicationController
  def index
    render json: {
      stories: Story.all
        .includes(:story_source, :story_source_category)
        .order(story_time: :desc)
        .as_json(methods: [
          :story_source,
          :comments_url
        ])
    }
  end
end
