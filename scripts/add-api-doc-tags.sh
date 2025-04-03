#!/bin/bash

# Path to your swagger.yaml file
SWAGGER_FILE="static/swagger.yaml"

# Check if tags section already exists
if grep -q "^tags:" "$SWAGGER_FILE"; then
  # If it exists, we could either replace it or leave it
  echo "Tags section already exists in $SWAGGER_FILE"
else
  # If it doesn't exist, add it before the 'swagger:' line at the end
  cat << 'EOF' > tags_section.tmp
tags:
  - name: API Keys
    description: Manage API keys for authentication
  - name: Application Configuration
    description: Configure application settings
  - name: Audit Logs
    description: Access and manage audit logs
  - name: Custom Claims
    description: Manage custom claims for users and groups
  - name: OIDC
    description: OpenID Connect authentication operations
  - name: Users
    description: User management operations
  - name: User Groups
    description: User group management operations
  - name: Well Known
    description: Discovery endpoints for OpenID Connect
EOF
  
  # Insert the tags section before the 'swagger:' line
  sed -i '' -e '/^swagger:/i\
' -e '/^swagger:/i\\' -e '/^swagger:/r tags_section.tmp' "$SWAGGER_FILE"
  
  # Remove temporary file
  rm tags_section.tmp
  
  echo "Added tags section to $SWAGGER_FILE"
fi
