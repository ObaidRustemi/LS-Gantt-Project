#!/bin/bash

# CP Gantt Quick Deploy
# Simple helper for rapid deployment to GCS

BUCKET="obie-cp-tutorial"
CONSOLE_URL="https://console.cloud.google.com/storage/browser/obie-cp-tutorial"

echo "🚀 CP Gantt Quick Deploy"
echo "======================="
echo ""

# Check what files have been modified recently
echo "📋 FILES TO DEPLOY:"
echo ""

cd tutorial
for file in viz-codelab.css viz-codelab.js viz-codelab.json manifest.json; do
    if [[ -f "$file" ]]; then
        # Get file modification time
        if [[ "$OSTYPE" == "darwin"* ]]; then
            MOD_TIME=$(stat -f "%Sm" -t "%H:%M:%S" "$file")
        else
            MOD_TIME=$(stat -c "%Y" "$file")
        fi
        
        echo "  📄 $file (modified: $MOD_TIME)"
    else
        echo "  ❌ $file (missing)"
    fi
done

echo ""
echo "🎯 DEPLOYMENT STEPS:"
echo ""
echo "1️⃣  Opening GCS Console..."

# Open the console
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "$CONSOLE_URL"
else
    echo "   👉 Go to: $CONSOLE_URL"
fi

echo ""
echo "2️⃣  In the console:"
echo "   👉 For each file above:"
echo "   👉   • Delete the old version"
echo "   👉   • Upload the new version from tutorial/ folder"
echo ""
echo "3️⃣  Test deployment:"
echo "   👉 Refresh your Looker Studio visualization"
echo "   👉 Should load from: gs://$BUCKET"
echo ""
echo "✅ That's it! Quick and easy deployment!"
echo ""

# Show current directory for convenience
echo "📁 Upload files from: $(pwd)"
echo ""
echo "💡 TIP: Drag files directly from Finder to GCS Console!"

cd ..
