Rails.application.routes.draw do
  root to: "pages#root"

  # namespace the json endpoints under v0
  scope 'v0' do
    get 'stories' => 'stories#index'
  end
end
