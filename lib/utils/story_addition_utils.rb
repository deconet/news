module StoryAdditionUtils
  def add_stories_from_ycombinator
    story_source_id = StorySource.find_by(name: 'ycombinator')
    url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    puts "getting #{url}"
    res = RestClient.get(url)
    data = JSON.parse(res.body)
    data.each do |story_id|
      puts "adding ycombinator story #{story_id}"
      begin
        add_story_from_ycombinator(story_id, story_source_id)
      rescue RestClient::Exceptions::Timeout => e
        puts "timeout exception trying to get #{story_id}.  skipping."
      end
    end
  end

  def add_story_from_ycombinator(story_id, story_source)
    url = "https://hacker-news.firebaseio.com/v0/item/#{story_id}.json"
    puts "getting #{url}"
    res = RestClient.get(url)
    story_data = JSON.parse(res.body)
    s = Story.find_or_create_by(id_at_source: story_data['id'])
    s.update(
      title: story_data['title'],
      url: story_data['url'],
      comment_count: story_data['descendants'],
      score: story_data['score'],
      story_time: Time.at(story_data['time']),
      story_source_id: story_source_id
    )
  end

  def add_stories_from_reddit
    story_source = StorySource.find_by(name: 'reddit')
    story_source.story_source_categories.each do |category|
      puts "adding stories from #{category.to_json}"
      add_stories_from_subreddit(category, story_source)
    end
  end

  def add_stories_from_subreddit(category, story_source)
    url = "https://www.reddit.com/r/#{category.name}.json"
    puts "getting #{url}"
    res = RestClient.get(url)
    data = JSON.parse(res.body)
    data['data']['children'].each do |story|
      puts "adding reddit story #{story_id}"
      begin
        add_story_from_reddit(story, category.id, story_source_id)
      rescue RestClient::Exceptions::Timeout => e
        puts "timeout exception trying to get #{story_id}.  skipping."
      end
    end
  end

  def add_story_from_reddit(category_id, story_source_id)

  end
end