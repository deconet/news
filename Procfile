web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -c 2 -q devnews_main_queue -q default -q mailers