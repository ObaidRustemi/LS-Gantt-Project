# Entity Relationship Diagram - CP Gantt Visualization

## Visual ERD
*(See Mermaid diagram above showing entity relationships)*

## Key Relationships

### **Data Flow Path**
```
Google Sheets → Team/Project/Phase → Visualization Rendering
```

### **Core Entities & Relationships**

1. **Team (1) ↔ Projects (Many)**
   - Each team owns multiple projects
   - Projects belong to exactly one team
   - Enables team-level filtering and grouping

2. **Project (1) ↔ Phases (Many)**  
   - Each project has multiple CP phases (CP3, CP3.5, CP4, CP5)
   - Phases belong to exactly one project
   - Enables project timeline visualization

3. **User (1) ↔ Annotations (Many)**
   - Users can comment on multiple projects/phases
   - Each annotation belongs to one user
   - Enables collaborative feedback

4. **User (1) ↔ UserActions (Many)**
   - Track user interactions for analytics
   - Helps optimize UX and performance

### **Data Transformation Logic**

#### Google Sheets → Visualization Entities
```
1. GoogleSheet.team → Team.name
2. GoogleSheet.summary → Project.name  
3. GoogleSheet.cp3_date → Phase{name: CP3, start_date: cp3_date}
4. GoogleSheet.cp3_5_date → Phase{name: CP3.5, start_date: cp3_5_date}
5. etc.
```

#### Phase Date Logic
```
CP3 Phase: start = cp3_date, end = cp3_5_date
CP3.5 Phase: start = cp3_5_date, end = cp4_date  
CP4 Phase: start = cp4_date, end = cp5_date
CP5 Phase: start = cp5_date, end = calculated_end
```

### **Future Integration Points**

#### Jira → Project Mapping
```
JiraEpic.key → Project.jira_key
JiraEpic.summary → Project.name
JiraEpic.custom_fields → Phase dates
JiraEpic.assignee → Project.project_manager
```

### **Cardinality Summary**
- **Team** : **Project** = 1 : Many
- **Project** : **Phase** = 1 : Many (exactly 4-5 phases per project)
- **Project** : **Annotation** = 1 : Many
- **User** : **Annotation** = 1 : Many
- **User** : **UserAction** = 1 : Many
- **GoogleSheet** : **Project** = 1 : 1 (each row becomes one project)
- **JiraEpic** : **Project** = 1 : 1 (future integration)

### **Data Integrity Rules**
1. Every Project must belong to a Team
2. Every Phase must belong to a Project
3. Phase dates must be chronological within a Project
4. Annotation.project_id must reference valid Project
5. UserAction.user_id must reference valid User

---

*This ERD supports both current Google Sheets implementation and future Jira integration while maintaining clean separation between source data, processed entities, and user interactions.*