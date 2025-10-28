#!/usr/bin/env ruby
# frozen_string_literal: true
# Build Lunr pre-index JSON for all markdown docs (excluding vendor, _site, node_modules etc.)
# Run: ruby scripts/build_search_index.rb

require 'json'
require 'time'
require 'cgi'

ROOT = File.expand_path('..', __dir__)
DOC_EXT = '.md'
OUTPUT_PATH = File.join(ROOT, 'assets', 'search-index.json')
EXCLUDE_DIRS = %w[vendor _site node_modules scripts assets/img assets/images .git].freeze

# Heuristic markdown -> plain text cleaner
# - strips front matter
# - removes code fences, inline code backticks
# - converts images/links to their alt/text
# - strips HTML tags
# - collapses whitespace
# - leaves norwegian characters intact

def strip_markdown(source)
  return '' unless source

  text = source.dup
  # Remove front matter (--- ... --- at top)
  if text.start_with?('---')
    parts = text.split(/^---\s*$\n/, 3)
    text = parts[2] || parts[1] || ''
  end
  # Remove fenced code blocks
  text.gsub!(/```[\s\S]*?```/m, ' ')
  # Inline code
  text.gsub!(/`[^`]*`/, ' ')
  # Images ![alt](src) -> alt
  text.gsub!(/!\[([^\]]*)\]\([^)]*\)/, '\1 ')
  # Links [text](url) -> text
  text.gsub!(/\[([^\]]+)\]\(([^)]+)\)/, '\1 ')
  # HTML tags
  text.gsub!(/<[^>]+>/, ' ')
  # Headings markers, emphasis, bold, tables pipes
  text.gsub!(/[#>*_~`|]/, ' ')
  # Collapse whitespace
  text.gsub!(/\s+/, ' ')
  text.strip!
  text
end

Doc = Struct.new(:id, :title, :content, :url, :type) do
  def as_json(*)
    { id: id, title: title, content: content, url: url, type: type }
  end
end

# Classify doc type by path
# Simplistic: release notes under releasenotes/, else guide

def classify(path)
  return 'release-note' if path.include?('releasenotes/')
  'guide'
end

markdown_files = Dir.glob(File.join(ROOT, '**', '*.md')).reject do |f|
  rel = f.sub(ROOT + File::SEPARATOR, '')
  parts = rel.split(File::SEPARATOR)
  parts.any? { |p| EXCLUDE_DIRS.include?(p) }
end

# Build docs

docs = markdown_files.sort.map do |abs|
  rel = abs.sub(ROOT + File::SEPARATOR, '')
  raw = File.read(abs, mode: 'r:BOM|UTF-8', invalid: :replace, undef: :replace, replace: '') rescue ''
  cleaned = strip_markdown(raw)
  fname = File.basename(abs, DOC_EXT)
  # Title: first ATX heading if present, else derived from filename
  heading = raw[/^#\s+(.+)/, 1]
  title = heading ? heading.strip : fname
  # Trim title length
  title = title[0, 120]
  url = '/' + rel.sub(DOC_EXT, '.html').gsub(' ', '%20')
  Doc.new(rel, title, cleaned, url, classify(rel))
end

payload = {
  generated_at: Time.now.utc.iso8601,
  doc_count: docs.size,
  docs: docs.map(&:as_json)
}

File.write(OUTPUT_PATH, JSON.pretty_generate(payload) + "\n")

warn "Wrote #{docs.size} documents to #{OUTPUT_PATH}"