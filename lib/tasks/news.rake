require 'utils/yc_utils'
include YcUtils

require 'utils/reddit_utils'
include RedditUtils

namespace :news do
  desc 'Add yc news stories'
  task add_stories_from_yc: :environment do
    add_stories_from_ycombinator
  end

  desc 'Add reddit stories'
  task add_stories_from_reddit: :environment do
    add_stories_from_reddit
  end

  desc 'Get reddit access token'
  task get_reddit_access_token: :environment do
    story_source = StorySource.find_by(name: 'reddit')
    get_reddit_access_token(story_source)
  end

  desc 'Check reddit access token'
  task check_reddit_access_token: :environment do
    story_source = StorySource.find_by(name: 'reddit')
    puts check_reddit_access_token(story_source.access_token)
  end
end
