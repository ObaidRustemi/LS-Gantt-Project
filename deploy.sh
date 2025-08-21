#!/bin/bash

# CP Gantt Auto-Deploy Script
# Uploads files to GCS bucket using REST API

BUCKET="obie-cp-tutorial"
FILES_TO_UPLOAD=("viz-codelab.css" "viz-codelab.js" "viz-codelab.json" "manifest.json")

echo "🚀 Deploying CP Gantt files to GCS..."

# Function to upload file using curl
upload_file() {
    local file=$1
    local bucket=$2
    
    if [[ ! -f "tutorial/$file" ]]; then
        echo "❌ File tutorial/$file not found"
        return 1
    fi
    
    echo "📤 Uploading $file..."
    
    # Get access token (you'll need to be authenticated)
    TOKEN=$(gcloud auth print-access-token 2>/dev/null)
    
    if [[ -z "$TOKEN" ]]; then
        echo "❌ Not authenticated with gcloud. Please run 'gcloud auth login' first"
        return 1
    fi
    
    # Upload file using REST API
    curl -X POST \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: $(file --mime-type -b tutorial/$file)" \
        -T "tutorial/$file" \
        "https://storage.googleapis.com/upload/storage/v1/b/$bucket/o?uploadType=media&name=$file"
    
    if [[ $? -eq 0 ]]; then
        echo "✅ $file uploaded successfully"
    else
        echo "❌ Failed to upload $file"
        return 1
    fi
}

# Upload each file
for file in "${FILES_TO_UPLOAD[@]}"; do
    upload_file "$file" "$BUCKET"
    echo ""
done

echo "🎉 Deployment complete! Files uploaded to gs://$BUCKET/"
echo "🔗 Test in Looker Studio with: gs://$BUCKET"
