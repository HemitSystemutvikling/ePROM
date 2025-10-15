#!/usr/bin/env ruby
# Build a precompiled search index for Lunr.
# Scans all .md files (excluding _site, assets, .github) and outputs assets/search-index.json
# Usage: ruby scripts/build_search_index.rb

require 'json'
require 'time' # for Time#iso8601 on Windows Ruby

BASE_DIR = File.expand_path('..', __dir__)
Dir.chdir(BASE_DIR)

def strip_markdown(text)
  return '' unless text
  t = text.dup
  # Remove code blocks
  t.gsub!(/```[\s\S]*?```/, ' ')
  # Remove inline code
  t.gsub!(/`[^`]*`/, ' ')
  # Remove HTML tags
  t.gsub!(/<[^>]+>/, ' ')
  # Replace links with just link text
  t.gsub!(/\[([^\]]+)\]\([^\)]+\)/, '\\1')
  # Headings -> keep text
  t.gsub!(/^[#]{1,6}\s+(.+)$/, '\\1')
  # Images ![alt](src)
  t.gsub!(/!\[[^\]]*\]\([^\)]+\)/, ' ')
  # Emphasis / formatting chars
  t.gsub!(/[>*_~`#-]/, ' ')
  # Collapse whitespace
  t.gsub!(/\s+/, ' ')
  t.strip
end

md_files = Dir.glob('**/*.md')
  .reject { |p| p.start_with?('_site/') || p.start_with?('assets/') || p.start_with?('.github/') }

docs = []
md_files.each do |path|
  begin
    raw = File.read(path, encoding: 'UTF-8')
  rescue => e
    warn "Could not read #{path}: #{e.message}"
    next
  end
  title = raw[/^#\s+(.+)/, 1] || File.basename(path, '.md')
  content = strip_markdown(raw)
  next if content.empty?
  url = '/' + path.sub(/\.md$/i, '.html')
  docs << { id: path, title: title, content: content, url: url }
end

out_dir = File.join('assets')
Dir.mkdir(out_dir) unless Dir.exist?(out_dir)
out_path = File.join(out_dir, 'search-index.json')

generated_at = begin
  Time.now.utc.iso8601
rescue NoMethodError
  Time.now.utc.strftime('%Y-%m-%dT%H:%M:%SZ')
end

File.write(out_path, JSON.pretty_generate({ generated_at: generated_at, doc_count: docs.size, docs: docs }), mode: 'w', encoding: 'UTF-8')
puts "Wrote #{docs.size} docs to #{out_path}"
