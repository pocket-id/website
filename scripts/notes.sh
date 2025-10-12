##this script is just used for a initial import of the changelog from github releases
# leaving it in the repo incase we ever need to use it again. 

#!/bin/bash
set -euo pipefail

# Create docs directory if it doesn't exist
mkdir -p docs

# Fetch all releases from GitHub
echo "Fetching all releases..."
curl -s -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/pocket-id/pocket-id/releases" \
  > all_releases.json

# Start with frontmatter
cat > docs/changelog.md << 'EOF'
---
title: 'Changelog'
description: 'Release notes for pocket-id'
---

EOF

# Process each release (jq will output them newest to oldest by default)
jq -c '.[]' all_releases.json | while read -r release; do
  TAG=$(echo "$release" | jq -r '.tag_name')
  DATE=$(echo "$release" | jq -r '.published_at' | cut -dT -f1)
  URL=$(echo "$release" | jq -r '.html_url')
  BODY=$(echo "$release" | jq -r '.body // ""')
  
  echo "Adding $TAG..."
  
  cat >> docs/changelog.md << EOF
## $TAG - $DATE

[Release]($URL)

$BODY

EOF
done

# Cleanup
rm all_releases.json

echo "✅ Changelog imported successfully to docs/changelog.md"