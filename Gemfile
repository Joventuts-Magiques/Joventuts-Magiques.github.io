source "https://rubygems.org"

# Required for Ruby 3.4+
gem "csv"
gem "logger"
gem "base64"

# Jekyll
gem "jekyll", "~> 4.3.0"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-redirect-from"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
# Commented out due to Ruby 3.4 compatibility issues - not essential for Jekyll to work
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
