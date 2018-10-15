# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

story_sources = [
  {
    name: 'reddit',
    homepage_url: 'https://reddit.com',
    comments_url: 'https://www.reddit.com/r/:category_name/comments/:story_id',
    display_name: 'Reddit'
  },
  {
    name: 'ycombinator',
    homepage_url: 'https://news.ycombinator.com',
    comments_url: 'https://news.ycombinator.com/item?id=:story_id',
    display_name: 'Hacker News'
  }
]

story_sources.each do |ss|
  new_story_source = StorySource.find_or_create_by(name: ss[:name])
  new_story_source.update(ss)
end