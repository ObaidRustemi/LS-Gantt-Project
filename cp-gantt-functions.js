// CP Gantt Functions - Test Compatible Version
// Contains only the data processing functions without DSCC subscription

// CP Phase Colors and Constants
const CP_COLORS = {
  cp3: '#3B82F6',     // Blue
  cp3_5: '#8B5CF6',   // Purple  
  cp4: '#10B981',     // Green
  cp5: '#F59E0B'      // Amber
};

const CP_PHASES = ['cp3', 'cp3_5', 'cp4', 'cp5'];

function formatDateForDisplay(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  // Use UTC methods to avoid timezone issues
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2); // Last 2 digits
  
  return `${month}/${day}/${year}`;
}

function parseDate(dateValue) {
  if (!dateValue) return null;
  
  // Handle different date formats from Looker Studio
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? null : parsed;
  } else if (typeof dateValue === 'number') {
    // Assuming timestamp
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  
  return null;
}

function processProjectData(data) {
  console.log('🔍 Raw data from Looker Studio:', data);
  
  if (!data || !data.tables || !data.tables.DEFAULT || !data.tables.DEFAULT.rows) {
    console.warn('⚠️ No data available');
    return { projects: [], teams: [], dateRange: null };
  }
  
  const rows = data.tables.DEFAULT.rows;
  const headers = data.tables.DEFAULT.headers;
  
  console.log('📊 Data headers:', headers);
  console.log('📋 Data rows:', rows);
  
  // Map headers to indices for data access
  const headerMap = {};
  headers.forEach((header, index) => {
    headerMap[header.name] = index;
  });
  
  console.log('🗺️ Header mapping:', headerMap);
  
  const projects = [];
  const teams = new Set();
  let minDate = null;
  let maxDate = null;
  
  // Process each project row
  rows.forEach((row, index) => {
    const project = {
      team: row[headerMap.team] || 'Unknown',
      summary: row[headerMap.summary] || `Project ${index + 1}`,
      phases: {}
    };
    
    // Process CP phase dates
    CP_PHASES.forEach(phase => {
      const phaseKey = phase + '_date';
      if (headerMap[phaseKey] !== undefined) {
        const dateValue = row[headerMap[phaseKey]];
        const parsedDate = parseDate(dateValue);
        
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          project.phases[phase] = parsedDate;
          
          // Track date range
          if (!minDate || parsedDate < minDate) minDate = parsedDate;
          if (!maxDate || parsedDate > maxDate) maxDate = parsedDate;
        }
      }
    });
    
    teams.add(project.team);
    projects.push(project);
    
    console.log(`📋 Processed project: ${project.team} - ${project.summary}`, project.phases);
  });
  
  // Group projects by team
  const teamGroups = {};
  Array.from(teams).forEach(team => {
    teamGroups[team] = projects.filter(p => p.team === team);
  });
  
  const result = {
    projects,
    teams: Array.from(teams),
    teamGroups,
    dateRange: minDate && maxDate ? { min: minDate, max: maxDate } : null
  };
  
  console.log('✅ Processed data result:', result);
  return result;
}

function calculateTimelineLayout(processedData, containerWidth, containerHeight) {
  if (!processedData.dateRange) {
    return { scale: 1, offsetX: 50, timelineWidth: containerWidth - 100 };
  }
  
  const { min: minDate, max: maxDate } = processedData.dateRange;
  const totalDays = Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000));
  const availableWidth = containerWidth - 200; // Leave margins
  
  const scale = availableWidth / totalDays;
  
  console.log(`📏 Timeline layout: ${totalDays} days, scale: ${scale}px/day`);
  
  return {
    scale,
    offsetX: 100,
    timelineWidth: availableWidth,
    totalDays,
    minDate,
    maxDate
  };
}
