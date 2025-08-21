# Design Mockups - CP Gantt Visualization

## 🎨 **Design Wave 1: Desktop Executive Interface**

*Created by Maya Rodriguez - Principal Designer*

---

## 📐 **Overall Layout Wireframe**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CP GANTT VISUALIZATION                          [Team Filter ▼] [Export]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┬─────────── DATE HEADER ──────────────────────────────────┐ │
│  │ PROJECT     │  JAN 2025                                                 │ │
│  │ LABELS      │  WEEK1    WEEK2    WEEK3    WEEK4    WEEK5              │ │
│  │ (120px)     │  1  2  3  6  7  8  13 14 15 20 21 22 27 28              │ │
│  └─────────────┼───────────────────────────────────────────────────────────┤ │
│  │             │                                                           │ │
│  │ Platform    │  ████ CP3 ████████ CP3.5 ████████ CP4 ████ CP5          │ │
│  │ Auth Redsn  │  ░░░░       ░░░░░░░░       ░░░░░░░░       ░░░░            │ │
│  │             │                                                           │ │
│  │ Mobile      │      ████ CP3 ████████ CP3.5 ████████ CP4 ████ CP5      │ │
│  │ iOS Perf    │      ░░░░       ░░░░░░░░       ░░░░░░░░       ░░░░        │ │
│  │             │                                                           │ │
│  │ Platform    │          ████ CP3 ████████ CP3.5 ████████ CP4 ████      │ │
│  │ DB Migration│          ░░░░       ░░░░░░░░       ░░░░░░░░       ░░░░     │ │
│  │             │                                                           │ │
│  └─────────────┴───────────────────────────────────────────────────────────┘ │
│                                                                             │
│  [◄ Today Line (red dashed)]                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Key Design Decisions**

### **Date Header Design** (Inspired by clean calendar header)
```
┌─────────────────────── DATE HEADER ────────────────────────┐
│  JANUARY 2025                                              │ ← Month/Year (18px, bold)
│  WEEK1     WEEK2     WEEK3     WEEK4     WEEK5            │ ← Week Labels (14px, medium)  
│  1  2  3   6  7  8   13 14 15  20 21 22  27 28           │ ← Day Numbers (12px, light)
└────────────────────────────────────────────────────────────┘
```

### **Project Row Design** (Stacked CP Phases)
```
┌─────────────┬─────────────────────────────────────────────┐
│ Platform    │ ████████ CP3 ██████████ CP3.5 ████████ CP4 │ ← Main timeline
│ Auth Redesign│ ░░░░░░░░      ░░░░░░░░░░      ░░░░░░░░     │ ← Subtle background
│ (PM: Alex)  │                                             │ ← Metadata (optional)
└─────────────┴─────────────────────────────────────────────┘
```

### **Color Strategy**
- **CP3**: `#2563EB` (Blue) - Foundation work
- **CP3.5**: `#EA580C` (Orange) - Transition phase  
- **CP4**: `#059669` (Green) - Core development
- **CP5**: `#DC2626` (Red) - Critical/launch prep
- **Background**: `#F8FAFC` (Light gray)
- **Grid**: `#E2E8F0` (Subtle lines)

---

## 🎨 **Visual Component Specifications**

### **1. Project Label Area (120px width)**
```css
.project-label {
  width: 120px;
  padding: 8px 12px;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  font-family: 'Inter', sans-serif;
}

.project-name {
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.3;
}

.project-meta {
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
}
```

### **2. Timeline Area**
```css
.timeline-area {
  flex: 1;
  background: #F8FAFC;
  position: relative;
}

.date-header {
  height: 60px;
  background: #FFFFFF;
  border-bottom: 2px solid #E2E8F0;
  padding: 8px 16px;
}

.month-label {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}

.week-labels {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.day-numbers {
  font-size: 12px;
  color: #6B7280;
}
```

### **3. CP Phase Segments**
```css
.cp-phase {
  height: 24px;
  border-radius: 4px;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cp-phase:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cp3 { background: #2563EB; }
.cp3-5 { background: #EA580C; }
.cp4 { background: #059669; }
.cp5 { background: #DC2626; }

.phase-label {
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 0 8px;
  line-height: 24px;
}
```

---

## 🖱️ **Interaction Design**

### **Hover States**
```
Normal State:     ████████ CP3 ████████
                  ░░░░░░░░      ░░░░░░░░

Hover State:      ████████ CP3 ████████  ← Subtle lift + shadow
                  ░░░░░░░░      ░░░░░░░░
                  
                  ┌─────────────────────┐ ← Tooltip appears
                  │ Platform Team       │
                  │ Auth Redesign       │ 
                  │ CP3: Jan 15 - Feb 1 │
                  │ Status: On Track    │
                  └─────────────────────┘
```

### **Tooltip Design**
```css
.tooltip {
  background: #1F2937;
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.4;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 250px;
  z-index: 1000;
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.tooltip-detail {
  opacity: 0.9;
}
```

---

## 📱 **Team Filtering Design**

```
┌─────────────────────────────────────────────────────┐
│  CP GANTT VISUALIZATION    [All Teams ▼] [Export]   │ ← Header with controls
├─────────────────────────────────────────────────────┤
│                                                     │
│  When "Platform" selected:                          │
│  ┌─────────────┬─────────────────────────────────┐   │
│  │ Platform    │ ████ CP3 ████ CP3.5 ████ CP4   │   │ ← Only Platform projects
│  │ Auth Redesign│                                 │   │
│  │             │                                 │   │
│  │ Platform    │     ████ CP3 ████ CP3.5 ████   │   │
│  │ DB Migration│                                 │   │
│  └─────────────┴─────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🚨 **At-Risk Project Highlighting**

```
Normal Project:   ████████ CP3 ████████ CP3.5 ████████ CP4
                  ░░░░░░░░      ░░░░░░░░      ░░░░░░░░

At-Risk Project:  ████████ CP3 ⚠️ ████████ CP3.5 ████████ CP4  ← Warning icon
                  ▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓        ← Darker background

Blocked Project:  ████████ CP3 🔴 ████████ BLOCKED ████████    ← Red indicator
                  ████████      ████████  ████████            ← Bold borders
```

---

## 📏 **Responsive Breakpoints** (Future V2)

```
Desktop (>1200px):  Full layout with 120px labels, rich tooltips
Tablet (768-1200px): 100px labels, simplified tooltips  
Mobile (<768px):    Stacked layout, project list + selected timeline
```

---

## 🎯 **Design Validation Checklist**

### **Executive Requirements**
- ✅ **30-second insight rule** - At-risk projects immediately visible
- ✅ **Professional appearance** - Suitable for C-level presentations
- ✅ **Clean information hierarchy** - Most important info prominent
- ✅ **Scannable layout** - Easy to process multiple projects quickly

### **Technical Requirements**  
- ✅ **SVG-compatible** - All elements can be programmatically generated
- ✅ **Looker Studio friendly** - Works within LS iframe constraints
- ✅ **Performance optimized** - Minimal DOM nodes, efficient rendering
- ✅ **Accessible** - Proper contrast ratios, keyboard navigation

### **User Experience**
- ✅ **Intuitive interactions** - Hover and click behaviors are obvious
- ✅ **Smooth animations** - Subtle transitions, no jarring movements
- ✅ **Clear affordances** - Users know what's clickable/interactive
- ✅ **Error forgiveness** - Graceful handling of edge cases

---

*This design wave establishes our visual foundation. Ready for team review and coding implementation!*
