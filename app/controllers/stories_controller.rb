class StoriesController < ApplicationController
  def index
    # 50 items per page
    # items_per_page = 10
    page = (params[:page].nil? ? 0 : params[:page].to_i)
    hours_per_page = 24
    from_time = (page * hours_per_page).hours.ago
    to_time = ((page + 1) * hours_per_page).hours.ago

    # page_offset = page * items_per_page
    render json: {
      stories: Story.where('story_time <= ? and story_time > ?', from_time, to_time)
        .includes(:story_source, :story_source_category)
        .order(score: :desc)
        # .offset(page_offset)
        # .limit(items_per_page)
    }
  end
end
