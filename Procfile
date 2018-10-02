web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -c 2 -q deconews_main_queue -q default -q mailers