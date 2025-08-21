# Entity Relationship Diagram - CP Gantt Visualization

## Overview
This ERD captures the data model for our CP Gantt visualization, from current Google Sheets structure through future Jira integration.

---

## Current State: Google Sheets Data Model

### Primary Entity: Project
```
Project {
  team: STRING           // Team ownership (Platform, Mobile, Frontend)
  summary: STRING        // Project name/description  
  cp3_date: DATE         // CP3 milestone date
  cp3_5_date: DATE       // CP3.5 milestone date
  cp4_date: DATE         // CP4 milestone date
  cp5_date: DATE         // CP5 milestone date
}
```

### Sample Data Structure
| team | summary | cp3_date | cp3_5_date | cp4_date | cp5_date |
|------|---------|----------|------------|----------|----------|
| Platform | User Authentication Redesign | 2024-01-15 | 2024-02-01 | 2024-03-01 | 2024-04-15 |
| Mobile | iOS App Performance | 2024-01-22 | 2024-02-15 | 2024-03-15 | 2024-05-01 |

---

## Visualization Data Model

### Logical Entities (How viz processes data)

```
Team {
  id: STRING
  name: STRING
  color_theme: STRING
  projects: Project[]
}

Project {
  id: STRING
  team_id: STRING (FK → Team)
  name: STRING
  phases: Phase[]
  status: ENUM[on_track, at_risk, blocked, completed]
  priority: ENUM[high, medium, low]
}

Phase {
  id: STRING
  project_id: STRING (FK → Project)
  name: ENUM[CP3, CP3.5, CP4, CP5, CP6]
  start_date: DATE
  end_date: DATE (derived or explicit)
  status: ENUM[not_started, in_progress, completed, at_risk, blocked]
  confidence: ENUM[committed, probable, tentative]
}
```

### Data Transformation Logic
```
Google Sheets Row → Visualization Objects:

1. Create Project from (team, summary)
2. Create Phases from date columns:
   - cp3_date → Phase{name: CP3, start_date: cp3_date, end_date: cp3_5_date}
   - cp3_5_date → Phase{name: CP3.5, start_date: cp3_5_date, end_date: cp4_date}
   - cp4_date → Phase{name: CP4, start_date: cp4_date, end_date: cp5_date}
   - cp5_date → Phase{name: CP5, start_date: cp5_date, end_date: derived}
3. Group Projects by Team
4. Sort Phases chronologically
```

---

## Future State: Jira Integration

### Jira Entity Mapping
```
Epic (Jira) → Project (Our Model)
Custom Fields → Phase Dates
Components → Teams
Issue Status → Project Status
Assignee → Project Owner
```

### Extended Data Model
```
Project {
  // Core fields (unchanged)
  team: STRING
  summary: STRING
  
  // Enhanced from Jira
  jira_key: STRING           // PROJ-123
  jira_url: STRING           // Link back to Jira
  project_manager: STRING    // Assignee
  engineering_manager: STRING
  status: ENUM              // From Jira status
  priority: ENUM            // From Jira priority
  
  // Calculated fields
  completion_percentage: FLOAT
  days_until_next_cp: INT
  is_at_risk: BOOLEAN
}

Phase {
  // Core fields (unchanged)
  name: ENUM[CP3, CP3.5, CP4, CP5, CP6]
  start_date: DATE
  end_date: DATE
  
  // Enhanced from Jira
  jira_field_id: STRING      // customfield_12345
  confidence: ENUM           // From custom field
  blockers: STRING[]         // Impediments
  dependencies: STRING[]     // Other epics this depends on
  
  // Calculated fields
  duration_days: INT
  is_overdue: BOOLEAN
  variance_from_plan: INT    // Days ahead/behind
}
```

---

## Annotation Layer (User Interactions)

### Comments/Notes Entity
```
Annotation {
  id: UUID
  project_id: STRING (FK → Project)
  phase_name: STRING         // Which phase this applies to
  user_id: STRING           // Who made the comment
  timestamp: DATETIME
  content: STRING           // Comment text
  type: ENUM[comment, flag, suggestion]
  status: ENUM[active, resolved]
}
```

### User Interaction Entity
```
UserAction {
  id: UUID
  user_id: STRING
  timestamp: DATETIME
  action_type: ENUM[view, filter, drill_down, export, annotate]
  context: JSON             // What they were looking at
  duration_seconds: INT
}
```

---

## Data Quality & Constraints

### Required Fields
- `team`: Must be non-empty
- `summary`: Must be non-empty and unique per team
- At least one CP date must be present

### Data Validation Rules
- CP dates must be chronological: cp3_date ≤ cp3_5_date ≤ cp4_date ≤ cp5_date
- Dates cannot be in the past (configurable warning)
- Team names must be from approved list
- Summary length: 5-100 characters

### Performance Considerations
- Maximum 1000 projects per view
- Data refresh frequency: Daily (Google Sheets), Real-time (future Jira)
- Cache timeline calculations for large datasets

---

## Relationships Summary

```
Team (1) ←→ (Many) Project
Project (1) ←→ (Many) Phase
Project (1) ←→ (Many) Annotation
User (1) ←→ (Many) UserAction
User (1) ←→ (Many) Annotation
```

---

## Security & Privacy

### Data Sensitivity
- Project names: Internal use only
- Team assignments: Internal use only  
- Dates: Business sensitive
- User interactions: Analytics only

### Access Control (Future)
- Team-based filtering (users see only their team's projects)
- Role-based permissions (view vs annotate vs admin)
- Audit logging for all data access

---

## Technology Stack

### **Chosen Architecture: Lightweight Vanilla JS + SVG**

```
Tech Stack (Option A - Recommended for 1-week PoC):
├── index.html (DSCC integration)
├── index.js (vanilla JS + manual SVG)  
├── styles.css (custom design)
├── manifest.json (Community Viz config)
└── cc_config.json (data/style contract)
```

### **Core Technologies**

#### **Frontend Framework**
- **Vanilla JavaScript** - No framework overhead, direct DOM manipulation
- **Native Web APIs** - Fetch, Date, SVG manipulation
- **ES6+ Features** - Modern JS without transpilation needs

#### **Visualization**
- **SVG** - Scalable vector graphics for timeline rendering
- **CSS3** - Custom styling, animations, hover states
- **Web Animations API** - Smooth transitions (if needed)

#### **Data Integration**
- **Google DSCC** - Required Looker Studio Community Components SDK
- **Native JSON parsing** - Google Sheets data transformation
- **Manual date calculations** - No external libraries needed

#### **Hosting & Deployment**
- **GitHub Pages** - Static file hosting for development
- **CDN delivery** - Fast asset loading for production

### **Why This Stack?**

#### **Pros**
- ✅ **Fast development** - No build process, direct editing
- ✅ **Small bundle size** - Minimal external dependencies  
- ✅ **Easy debugging** - Direct browser dev tools, no source maps
- ✅ **Complete control** - Pixel-perfect executive-quality design
- ✅ **Performance** - Native browser APIs, no framework overhead
- ✅ **Security friendly** - Minimal external dependencies for enterprise review

#### **Cons**
- ⚠️ **Manual work** - Date calculations, SVG generation by hand
- ⚠️ **Code organization** - No component structure (manageable for PoC)
- ⚠️ **Future scaling** - May need refactor for complex features

### **Alternative Stacks Considered**

#### **Option B: D3.js Enhanced** (Future consideration)
- **When to use**: If date/time calculations become complex
- **Benefits**: Powerful data transformation, built-in time scales
- **Tradeoff**: Larger bundle, learning curve

#### **Option C: React** (V2+ consideration)  
- **When to use**: If UI becomes complex with many interactive components
- **Benefits**: Component architecture, familiar development patterns
- **Tradeoff**: Build process, bundle size, overkill for single visualization

### **Implementation Architecture**

#### **File Structure**
```
/LS Gantt Project/
├── docs/                          # Documentation
│   ├── Technical_Design_Doc.md
│   ├── ERD.md  
│   └── PRD.md
├── manifest.json                   # Community Viz definition
├── cc_config.json                 # Data contract with Looker Studio
├── index.html                     # Main visualization container
├── index.js                       # Core visualization logic
├── styles.css                     # Custom styling
├── sample_data.csv               # Development test data
└── README.md                     # Setup instructions
```

#### **Data Flow Architecture**
```
Google Sheets → Looker Studio → DSCC SDK → index.js → SVG DOM
```

#### **Rendering Pipeline**
```
1. DSCC receives data from Looker Studio
2. parseData() transforms LS format → Project/Phase objects  
3. calculateLayout() computes pixel positions for timeline
4. renderTimeline() creates SVG elements
5. attachInteractions() adds hover/click handlers
```

### **Performance Considerations**
- **Target**: <3 second initial load, <500ms interactions
- **Optimization**: Virtual scrolling if >100 projects
- **Memory**: Minimal DOM nodes, efficient SVG reuse
- **Network**: Single HTML/JS/CSS bundle, no external dependencies

---

*This lightweight stack enables rapid 1-week proof of concept development while maintaining executive-quality visual design and performance.*
