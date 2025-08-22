// CP Gantt Functions for Testing
// Extracted functions from cp-gantt-simple.js for isolated testing

function parseDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
        return null;
    }
    
    // Handle DD/MMM/YY format (e.g., "15/Jan/24")
    const ddMmmYyMatch = dateString.match(/^(\d{1,2})\/([A-Za-z]{3})\/(\d{2})$/);
    if (ddMmmYyMatch) {
        const day = parseInt(ddMmmYyMatch[1], 10);
        const monthStr = ddMmmYyMatch[2].toLowerCase();
        const year = 2000 + parseInt(ddMmmYyMatch[3], 10);
        
        const monthMap = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };
        
        const monthIndex = monthMap[monthStr];
        if (monthIndex !== undefined) {
            const parsed = new Date(year, monthIndex, day);
            return isNaN(parsed.getTime()) ? null : parsed;
        }
    }
    
    // Handle other common formats
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateForDisplay(date) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }
    
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    
    return `${month}/${day}/${year}`;
}

function processProjectData(data) {
    console.log('Processing project data:', data);
    
    if (!data || !data.tables || !data.tables.DEFAULT) {
        console.log('No valid data.tables.DEFAULT found');
        return [];
    }
    
    const rows = data.tables.DEFAULT;
    console.log('Processing', rows.length, 'rows');
    
    const projects = [];
    
    rows.forEach((row, index) => {
        console.log(`Processing row ${index}:`, row);
        
        const project = {
            team: row.team || '',
            summary: row.summary || '',
            cp3_date: parseDate(row.cp3_date),
            cp3_5_date: parseDate(row.cp3_5_date),
            cp4_date: parseDate(row.cp4_date),
            cp5_date: parseDate(row.cp5_date)
        };
        
        console.log(`Parsed project ${index}:`, project);
        projects.push(project);
    });
    
    return projects;
}

function calculateTimelineLayout(projects) {
    if (projects.length === 0) {
        return { dateRange: null, timelineWidth: 800, projectHeight: 40 };
    }
    
    let minDate = null;
    let maxDate = null;
    
    projects.forEach(project => {
        [project.cp3_date, project.cp3_5_date, project.cp4_date, project.cp5_date].forEach(date => {
            if (date) {
                if (!minDate || date < minDate) minDate = date;
                if (!maxDate || date > maxDate) maxDate = date;
            }
        });
    });
    
    return {
        dateRange: minDate && maxDate ? { start: minDate, end: maxDate } : null,
        timelineWidth: 800,
        projectHeight: 40
    };
}
