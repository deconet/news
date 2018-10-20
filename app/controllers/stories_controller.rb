class StoriesController < ApplicationController
  def index

    page = (params[:page].nil? ? 0 : params[:page].to_i)
    hours_per_page = 24
    from_time = (page * hours_per_page).hours.ago
    to_time = ((page + 1) * hours_per_page).hours.ago

    order = {}
    order[params[:sorting]] = :desc

    render json: {
      stories: Story.where('story_time <= ? and story_time > ?', from_time, to_time)
        .includes(:story_source, :story_source_category)
        .order(order)
    }
  end
end
