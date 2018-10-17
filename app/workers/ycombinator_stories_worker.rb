class YcombinatorStoriesWorker
  include YcUtils
  include Sidekiq::Worker

  def perform(*args)
    add_stories_from_ycombinator
  end
end
