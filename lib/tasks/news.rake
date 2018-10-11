require 'utils/story_addition_utils'
include StoryAdditionUtils

namespace :news do
  desc 'Add news stories'
  task add_stories: :environment do
    add_stories
  end
end
