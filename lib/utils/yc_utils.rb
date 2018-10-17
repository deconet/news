module YcUtils
  def add_stories_from_ycombinator
    story_source = StorySource.find_by(name: 'ycombinator')
    url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    puts "getting #{url}"
    res = RestClient.get(url)
    data = JSON.parse(res.body)
    data.each do |story_id|
      puts "adding ycombinator story #{story_id}"
      begin
        add_story_from_ycombinator(story_id, story_source)
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
    puts "adding yc story #{story_data}"
    s = Story.find_or_create_by(id_at_source: story_data['id'], story_source_id: story_source.id)
    s.update(
      author: story_data['by'],
      title: story_data['title'],
      url: story_data['url'],
      comment_count: story_data['descendants'],
      score: story_data['score'],
      story_time: Time.at(story_data['time'])
    )
    if s.errors.keys.length != 0
      puts s.errors.to_json
    end
  end

end