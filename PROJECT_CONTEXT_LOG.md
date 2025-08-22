# CP Gantt Project - Context Log

**Purpose**: This log captures critical project insights, debugging tips, and contextual knowledge for future coding companions.

## 🏗️ **Project Overview**
- **Goal**: Create a professional Looker Studio Community Visualization for CP phase timelines
- **Tech Stack**: Vanilla JS, DSCC framework, Google Cloud Storage, SVG rendering
- **Data Source**: Google Sheets with CP project data (team, summary, CP3/3.5/4/5 dates)

## 🚨 **Critical Debugging Knowledge**

### **Manifest.json Issues**
- **CRITICAL**: Must use `gs://` URLs for resources, NOT `https://` URLs
- **Format**: Follow codelab example exactly - `devMode: true`, all required fields
- **Caching**: Always set `Cache-Control: no-store, max-age=0, must-revalidate` headers
- **Deployment**: Use versioned filenames for cache-busting (e.g., `v9-fieldtest`)

### **Looker Studio Connection Issues**
- **403/400 Errors**: Usually manifest format or missing GCS permissions
- **"Visualization not found"**: Check manifest URL accessibility and JSON formatting
- **Field mapping**: Use debug logging to see actual Google Sheets field names vs expected

### **Date Parsing Challenges**
- **Input Format**: Google Sheets provides "DD/MMM/YY" (e.g., "15/Jan/24")
- **Output Format**: Display as "MM/DD/YY" using UTC methods to avoid timezone shifts
- **Critical Fix**: Use regex parsing for month abbreviations (jan=0, feb=1, etc.)

### **Deployment Pipeline**
- **Bucket**: `gs://obie-ls-cp-gantt-plugin` (public read access required)
- **Cache-Busting**: Version filenames and update manifest for each deployment
- **Headers**: Must set no-cache headers after every upload

### **Common Gotchas**
- **Commit Hangs**: Use short ASCII messages (<50 chars), no emojis/rich text
- **Long Commit Messages**: Multiline/detailed commit messages cause git to hang - keep it simple!
- **gsutil Staging**: Add `gsutil/` to `.gitignore` to prevent accidental commits
- **Line Breaks**: Keep manifest JSON compact to avoid parsing issues

## 🧪 **Testing Strategy**
- **Local Tests**: `test-runner.html` runs 12 comprehensive unit tests
- **Functions**: Isolated in `cp-gantt-functions.js` for testing
- **Test Coverage**: Date parsing, formatting, data processing, timeline calculations
- **Auto-Testing Policy**: Feel free to automatically add tests for new features/functions when it makes engineering sense - no need to ask permission

## 📁 **File Structure**
```
cp-gantt-simple.js          # Main visualization logic
cp-gantt-simple-config.json # Looker Studio configuration panel
cp-gantt-simple.css         # Dark mode styling
manifest.json               # DSCC registration (gs:// URLs!)
test-cp-gantt.js            # 12-test suite
test-runner.html            # Browser test runner
cp-gantt-functions.js       # Isolated functions for testing
```

## 🎨 **Visual Design**
- **Theme**: Dark mode with professional gradient backgrounds
- **Colors**: CP3 (Blue #3B82F6), CP3.5 (Purple #8B5CF6), CP4 (Green #10B981), CP5 (Amber #F59E0B)
- **Logo**: Custom CP Gantt logo at `CPG-Logo.PNG`

## 🔄 **Version History**
- **V9**: Current working version with enhanced date parsing
- **V10**: Failed header debug attempt (broke connection)
- **Cache-Busting**: Use `cp-gantt-tim-vX-description.js` naming

## 💡 **Success Patterns**
- **Parallel Development**: Maintain both `cp-gantt-simple.*` (dev) and versioned files (deploy)
- **Incremental Testing**: Deploy → Test → Debug → Fix → Deploy
- **Debug Logging**: Extensive console.log for field mapping and data processing

## ⚠️ **Emergency Recovery**
- **Lost Files**: Download from GCS using `gsutil cp gs://bucket/file ./local-file`
- **Broken Deployment**: Revert manifest to last working version immediately
- **Cache Issues**: Delete and re-upload with proper headers

## 👥 **Original Dream Team** 
- **🔧 Alex (Engineering)**: Technical architect who built the DSCC infrastructure and deployment pipeline
- **🎨 Maya (Design)**: Design genius behind the beautiful mockups, dark mode specs, and UX flow
- **📊 Sam (Data Science)**: Data wizard who planned Google Sheets integration and field mapping strategy
- **🤝 Current Team**: Sophia (Senior Staff Engineer) continuing their collaborative legacy

---
*Last Updated: $(date)*  
*Current Status: Manifest fixed with gs:// URLs, ready to test visualization connection*  
*Legacy: Built on the incredible foundation laid by Alex, Maya, and Sam*
