class StoriesController < ApplicationController
  def index
    # 50 items per page
    items_per_page = 10
    page_offset = params[:page].nil? ? 0 : params[:page].to_i * items_per_page
    render json: {
      stories: Story.all
        .includes(:story_source, :story_source_category)
        .order(story_time: :desc)
        .offset(page_offset)
        .limit(items_per_page)
        .as_json(methods: [
          :story_source,
          :comments_url,
          :story_source_category
        ])
    }
  end
end
