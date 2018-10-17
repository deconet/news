module RedditUtils
  def add_stories_from_reddit
    story_source = StorySource.find_by(name: 'reddit')
    get_reddit_access_token(story_source) unless check_reddit_access_token(story_source.access_token)
    story_source.story_source_categories.each do |category|
      puts "adding stories from #{category.to_json}"
      add_stories_from_subreddit(category, story_source)
    end
  end

  def add_stories_from_subreddit(category, story_source)
    url = "https://oauth.reddit.com/r/#{category.name}.json"
    puts "getting #{url}"
    headers = {
      'Authorization' => "Bearer #{story_source.access_token}",
      'User-Agent' => 'Linux:Dev-News:[news.deco.network]:v1.0'
    }

    res = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: headers
    )
    data = JSON.parse(res.body)

    data['data']['children'].each do |story|
      puts "adding reddit story with id #{story['data']['id']}"
      next if story['data']['stickied'] # skip stickied stuff
      add_story_from_reddit(story, category.id, story_source.id)
    end
  end

  def add_story_from_reddit(story, category_id, story_source_id)
    story_data = story['data']
    puts "story data: #{story_data}"
    s = Story.find_or_create_by(id_at_source: story_data['id'], story_source_id: story_source_id)
    s.update(
      author: story_data['author'],
      title: story_data['title'],
      url: story_data['url'],
      comment_count: story_data['num_comments'],
      score: story_data['ups'],
      story_time: Time.at(story_data['created_utc']),
      story_source_category_id: category_id
    )
  end

  def check_reddit_access_token(token)
    puts "checking reddit access token"
    url = "https://oauth.reddit.com/api/v1/me"
    headers = {
      'Authorization' => "Bearer #{token}",
      'User-Agent' => 'Linux:Dev-News:[news.deco.network]:v1.0'
    }
    resp = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: headers
    )
    parsed = JSON.parse(resp.body)
    puts parsed
    return true
  rescue RestClient::Unauthorized
    return false
  end

  def get_reddit_access_token(story_source)
    puts "getting reddit access token"
    url = "https://www.reddit.com/api/v1/access_token"
    resp = RestClient::Request.execute(
      method: :post,
      url: url,
      user: ENV['DECONET_NEWS_REDDIT_API_ID'],
      password: ENV['DECONET_NEWS_REDDIT_API_SECRET'],
      payload: 'grant_type=client_credentials'
    )
    parsed = JSON.parse(resp.body)
    puts parsed
    story_source.update(access_token: parsed['access_token'])
  end
end