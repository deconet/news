class YcombinatorStoriesWorker
  include StoryAdditionUtils
  include Sidekiq::Worker

  def perform(*args)
    add_stories_from_ycombinator
  end
end
