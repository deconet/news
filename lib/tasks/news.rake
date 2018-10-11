require 'utils/story_addition_utils'
include StoryAdditionUtils

namespace :news do
  desc 'Add yc news stories'
  task add_stories_from_yc: :environment do
    add_stories_from_ycombinator
  end

  desc 'Add reddit stories'
  task add_stories_from_reddit: :environment do
    add_stories_from_reddit
  end
end
