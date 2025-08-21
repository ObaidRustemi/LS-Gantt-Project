#!/bin/bash

# CP Gantt Smart Deploy Helper
# Watches for file changes and helps with quick deployment

BUCKET="obie-cp-tutorial"
WATCH_DIR="tutorial"
CONSOLE_URL="https://console.cloud.google.com/storage/browser/obie-cp-tutorial"

echo "🎯 CP Gantt Auto-Deploy Helper"
echo "📁 Watching: $WATCH_DIR/"
echo "🔗 Bucket: gs://$BUCKET"
echo ""
echo "💡 When files change, I'll help you deploy quickly!"
echo "🛑 Press Ctrl+C to stop watching"
echo ""

# Function to handle file change
handle_change() {
    local file=$1
    echo ""
    echo "🔄 CHANGE DETECTED: $file"
    echo "⏰ $(date '+%H:%M:%S')"
    echo ""
    echo "📋 QUICK DEPLOYMENT OPTIONS:"
    echo ""
    echo "1️⃣  DRAG & DROP:"
    echo "   👉 I'll open the GCS console - just drag '$file' to upload!"
    echo ""
    echo "2️⃣  MANUAL UPLOAD:"
    echo "   👉 Go to: $CONSOLE_URL"
    echo "   👉 Delete old '$file' → Upload new '$file'"
    echo ""
    
    # Automatically open console (if on macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🚀 Opening GCS Console automatically..."
        open "$CONSOLE_URL"
    fi
    
    echo ""
    echo "✅ After upload, refresh Looker Studio to see changes!"
    echo "🔗 Test with: gs://$BUCKET"
    echo ""
    echo "👀 Continuing to watch for more changes..."
    echo "=================================================="
}

# Check if fswatch is available
if ! command -v fswatch &> /dev/null; then
    echo "📦 Installing fswatch for file monitoring..."
    brew install fswatch
fi

# Watch for changes in tutorial directory
echo "👀 Watching for changes in $WATCH_DIR/..."
echo ""

fswatch -o "$WATCH_DIR" | while read f; do
    # Find which specific file changed
    CHANGED_FILE=$(find "$WATCH_DIR" -newer /tmp/last_change_marker 2>/dev/null | head -1)
    touch /tmp/last_change_marker
    
    if [[ -n "$CHANGED_FILE" ]]; then
        FILENAME=$(basename "$CHANGED_FILE")
        handle_change "$FILENAME"
    fi
done
