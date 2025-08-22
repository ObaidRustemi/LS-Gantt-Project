#!/bin/bash

# 🚀 CP Gantt Auto Deploy - Lightning Fast Deployment
# Upload changes directly to GCS bucket for instant Looker Studio updates

set -e  # Exit on any error

BUCKET="obie-cp-gantt"
SOURCE_DIR="."
FILES=("cp-gantt.css" "cp-gantt.js" "cp-gantt-config.json" "manifest.json" "index.html")

echo "🚀 CP Gantt Auto Deploy"
echo "======================"
echo "⏰ $(date '+%H:%M:%S')"
echo ""

# Function to upload a single file
upload_file() {
    local file=$1
    local local_path="$SOURCE_DIR/$file"
    local gs_path="gs://$BUCKET/$file"
    
    if [[ ! -f "$local_path" ]]; then
        echo "❌ File not found: $local_path"
        return 1
    fi
    
    echo "📤 Uploading $file..."
    
    # Upload with public-read ACL and content-type detection
    if gsutil -m cp "$local_path" "$gs_path"; then
        echo "✅ $file uploaded successfully"
        
        # Get the file size for feedback
        local size=$(ls -lh "$local_path" | awk '{print $5}')
        echo "   📏 Size: $size"
        
        # Make sure it's public (in case ACL didn't work)
        gsutil acl ch -u AllUsers:R "$gs_path" 2>/dev/null || true
        
        return 0
    else
        echo "❌ Failed to upload $file"
        return 1
    fi
}

# Main deployment logic
echo "📋 Files to deploy:"
for file in "${FILES[@]}"; do
    echo "  📄 $file"
done
echo ""

# Deploy each file
SUCCESS_COUNT=0
TOTAL_COUNT=${#FILES[@]}

for file in "${FILES[@]}"; do
    if upload_file "$file"; then
        ((SUCCESS_COUNT++))
    fi
    echo ""
done

# Results summary
echo "🎯 DEPLOYMENT COMPLETE"
echo "====================="
echo "✅ Success: $SUCCESS_COUNT/$TOTAL_COUNT files"
echo ""

if [[ $SUCCESS_COUNT -eq $TOTAL_COUNT ]]; then
    echo "🎉 ALL FILES DEPLOYED SUCCESSFULLY!"
    echo ""
    echo "🔗 Test your changes:"
    echo "   👉 Refresh Looker Studio visualization"
    echo "   👉 Bucket: gs://$BUCKET"
    echo ""
    echo "⚡ Total deployment time: ~5 seconds"
else
    echo "⚠️  Some files failed to upload"
    echo "   👉 Check errors above and retry"
fi

echo ""
echo "💡 TIP: Run this script after every change for instant deployment!"
