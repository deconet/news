class RedditStoriesWorker
  include StoryAdditionUtils
  include Sidekiq::Worker

  def perform(*args)
    add_stories_from_reddit
  end
end
