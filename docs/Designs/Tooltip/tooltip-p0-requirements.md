# Tooltip Component - P0 Requirements & Task List

## 🔒 **LOCKED P0 REQUIREMENTS (Week 1 PoC)**

### **Critical Business Value**
The tooltip provides instant executive insight when hovering over CP timeline segments, with **CP phase identification** as the primary information need.

---

## 📋 **P0 Visual Specifications**

### **Container Design**
- ✅ **Background**: #1F2937 (Professional dark charcoal)
- ✅ **Border Radius**: 8px 
- ✅ **Drop Shadow**: 0 10px 25px rgba(0,0,0,0.3)
- ✅ **Max Width**: 320px
- ✅ **Padding**: 16px horizontal, 14px vertical
- ✅ **Arrow Pointer**: 8px triangle pointing to timeline segment

### **Information Hierarchy (Top to Bottom)**
```
1. Team Context:        "Platform Team"           (13px, Inter Regular, #FFFFFF)
2. Project Identity:    "Auth Redesign Project"   (13px, Inter Regular, #FFFFFF)  
3. 📅 CP TIMELINE:      "CP3.5: Feb 1 - Feb 15, 2025"  (15px, Inter Bold, #F9FAFB)
4. Status:              "● On Track"              (13px, Inter Regular, #FFFFFF + #10B981)
5. Duration:            "14 days remaining"       (12px, Inter Regular, rgba(255,255,255,0.8))
```

### **Critical P0 Element: Enhanced CP Timeline Section**
- ✅ **Format**: "📅 CP3.5: Feb 1 - Feb 15, 2025"
- ✅ **Calendar Icon**: 14px Unicode 📅 positioned left
- ✅ **Background Highlight**: #374151 bar spanning full width behind this line
- ✅ **Typography**: 15px Inter Bold weight vs 13px regular for other text
- ✅ **Color**: #F9FAFB (brighter white) vs #FFFFFF for emphasis
- ✅ **Spacing**: 6px padding above and below this section

### **Status Indicator**
- ✅ **Green Dot**: ● (#10B981) next to "On Track" text
- ✅ **Clear Visual**: Instant confidence indicator for executives

---

## 🛠️ **P0 Implementation Task List**

### **Task 1: HTML Structure** (30 minutes)
```html
<div class="tooltip" id="cp-tooltip">
  <div class="tooltip-content">
    <div class="team-name">Platform Team</div>
    <div class="project-name">Auth Redesign Project</div>
    <div class="cp-timeline-section">
      <span class="calendar-icon">📅</span>
      <span class="cp-phase">CP3.5: Feb 1 - Feb 15, 2025</span>
    </div>
    <div class="status">
      <span class="status-dot">●</span>
      <span class="status-text">On Track</span>
    </div>
    <div class="duration">14 days remaining</div>
  </div>
  <div class="tooltip-arrow"></div>
</div>
```

### **Task 2: CSS Styling** (45 minutes)
```css
.tooltip {
  background: #1F2937;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  max-width: 320px;
  padding: 14px 16px;
  position: absolute;
  z-index: 1000;
  font-family: Inter, sans-serif;
}

.cp-timeline-section {
  background: #374151;
  padding: 6px 8px;
  margin: 6px -8px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  color: #F9FAFB;
}

.status-dot {
  color: #10B981;
  margin-right: 6px;
}
```

### **Task 3: Show/Hide Logic** (30 minutes)
```javascript
function showTooltip(event, projectData) {
  const tooltip = document.getElementById('cp-tooltip');
  
  // Update content
  tooltip.querySelector('.team-name').textContent = projectData.team;
  tooltip.querySelector('.project-name').textContent = projectData.name;
  tooltip.querySelector('.cp-phase').textContent = 
    `${projectData.cpPhase}: ${projectData.startDate} - ${projectData.endDate}`;
  
  // Position tooltip
  tooltip.style.left = event.pageX - tooltip.offsetWidth/2 + 'px';
  tooltip.style.top = event.pageY - tooltip.offsetHeight - 12 + 'px';
  tooltip.style.display = 'block';
}

function hideTooltip() {
  document.getElementById('cp-tooltip').style.display = 'none';
}
```

### **Task 4: Timeline Integration** (45 minutes)
```javascript
// Add to timeline segment rendering
timelineSegments.forEach(segment => {
  segment.addEventListener('mouseenter', (e) => {
    const projectData = {
      team: segment.dataset.team,
      name: segment.dataset.projectName,
      cpPhase: segment.dataset.cpPhase,
      startDate: segment.dataset.startDate,
      endDate: segment.dataset.endDate,
      status: segment.dataset.status
    };
    showTooltip(e, projectData);
  });
  
  segment.addEventListener('mouseleave', hideTooltip);
});
```

### **Task 5: Testing & Polish** (30 minutes)
- ✅ Test hover triggers on different timeline segments
- ✅ Verify tooltip positioning (doesn't go off-screen)
- ✅ Test with different CP phases (CP3, CP3.5, CP4, CP5)
- ✅ Validate color contrast and readability
- ✅ Confirm calendar icon displays correctly

---

## ⏱️ **P0 Implementation Timeline**

**Total Estimated Time**: 3 hours
- HTML Structure: 30 min
- CSS Styling: 45 min  
- Show/Hide Logic: 30 min
- Timeline Integration: 45 min
- Testing & Polish: 30 min

**Dependencies**: 
- Timeline segments must have proper data attributes
- Inter font family loaded in application

**Success Criteria**:
- ✅ Tooltip appears on timeline segment hover
- ✅ CP phase prominently displayed with calendar icon
- ✅ Professional appearance suitable for executive demo
- ✅ Smooth show/hide behavior
- ✅ Accurate project data display

---

## 🚫 **P1 Features (NOT in PoC)**

### **Advanced Polish** (Future V2)
- ❌ Smooth fade-in/out animations
- ❌ Smart edge detection and repositioning  
- ❌ Click to pin tooltip open
- ❌ Keyboard navigation support
- ❌ Light theme variant
- ❌ Touch-friendly mobile interactions

### **Enhanced Content** (Future V2)
- ❌ Progress indicators within phases
- ❌ Dependency information
- ❌ Risk/confidence indicators
- ❌ Team member avatars
- ❌ Custom status colors beyond green

---

## ✅ **Definition of Done**

**P0 Tooltip is complete when:**
1. ✅ Displays on hover with correct CP phase information
2. ✅ Uses exact visual design from approved mockup
3. ✅ Calendar icon and enhanced CP section implemented
4. ✅ Professional dark theme with proper contrast
5. ✅ Smooth interaction without lag or visual bugs
6. ✅ Works with all CP phases (CP3, CP3.5, CP4, CP5)
7. ✅ Ready for executive demo presentation

---

*This P0 scope delivers the core tooltip value while maintaining focus on the 1-week proof of concept timeline.*
