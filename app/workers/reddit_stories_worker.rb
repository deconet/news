class RedditStoriesWorker
include RedditUtils
include Sidekiq::Worker

  def perform(*args)
    add_stories_from_reddit
  end
end
