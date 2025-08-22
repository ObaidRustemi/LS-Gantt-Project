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

function renderEmptyState(svg, width, height) {
  // Beautiful empty state with CP branding
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Main message
  const emptyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  emptyText.setAttribute('x', centerX);
  emptyText.setAttribute('y', centerY - 20);
  emptyText.setAttribute('text-anchor', 'middle');
  emptyText.setAttribute('font-family', 'Inter, sans-serif');
  emptyText.setAttribute('font-size', '24');
  emptyText.setAttribute('font-weight', '600');
  emptyText.setAttribute('fill', '#F9FAFB');
  emptyText.textContent = '⏳ CP Gantt: Waiting for project data...';
  svg.appendChild(emptyText);
  
  // Subtitle
  const subtitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  subtitle.setAttribute('x', centerX);
  subtitle.setAttribute('y', centerY + 15);
  subtitle.setAttribute('text-anchor', 'middle');
  subtitle.setAttribute('font-family', 'Inter, sans-serif');
  subtitle.setAttribute('font-size', '14');
  subtitle.setAttribute('fill', '#9CA3AF');
  subtitle.textContent = 'Connect your Google Sheets with team, summary, and CP phase dates';
  svg.appendChild(subtitle);
}

function renderSingleProject(svg, project, yPosition, timelineLayout) {
  const rowHeight = 40;
  const barHeight = 24;
  const barY = yPosition + (rowHeight - barHeight) / 2;
  
  // Project label
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', '20');
  label.setAttribute('y', yPosition + rowHeight / 2 + 5);
  label.setAttribute('font-family', 'Inter, sans-serif');
  label.setAttribute('font-size', '14');
  label.setAttribute('font-weight', '500');
  label.setAttribute('fill', '#F9FAFB');
  label.textContent = `${project.team} - ${project.summary}`;
  svg.appendChild(label);
  
  // Render CP phase segments
  let currentX = timelineLayout.offsetX;
  
  CP_PHASES.forEach((phase, index) => {
    if (project.phases[phase]) {
      const phaseDate = project.phases[phase];
      const daysSinceStart = Math.floor((phaseDate - timelineLayout.minDate) / (24 * 60 * 60 * 1000));
      const segmentX = timelineLayout.offsetX + (daysSinceStart * timelineLayout.scale);
      
      // Calculate segment width (from current position to this phase)
      const segmentWidth = Math.max(segmentX - currentX, 20); // Min 20px width
      
      // Create CP phase rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', currentX);
      rect.setAttribute('y', barY);
      rect.setAttribute('width', segmentWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', CP_COLORS[phase]);
      rect.setAttribute('rx', '4'); // Rounded corners
      rect.setAttribute('class', `cp-segment ${phase}`);
      
      // Add subtle shadow
      rect.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
      
      svg.appendChild(rect);
      
      // Phase label on the segment
      if (segmentWidth > 40) { // Only show label if segment is wide enough
        const phaseLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        phaseLabel.setAttribute('x', currentX + segmentWidth / 2);
        phaseLabel.setAttribute('y', barY + barHeight / 2 + 4);
        phaseLabel.setAttribute('text-anchor', 'middle');
        phaseLabel.setAttribute('font-family', 'Inter, sans-serif');
        phaseLabel.setAttribute('font-size', '11');
        phaseLabel.setAttribute('font-weight', '600');
        phaseLabel.setAttribute('fill', 'white');
        phaseLabel.setAttribute('class', 'timeline-text');
        phaseLabel.textContent = phase.toUpperCase().replace('_', '.');
        svg.appendChild(phaseLabel);
      }
      
      currentX = segmentX;
    }
  });
}

function renderCPGanttTimeline(svg, processedData, timelineLayout, width, height) {
  console.log('🎨 Rendering CP Gantt timeline...');
  
  // Timeline header
  const headerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  headerText.setAttribute('x', '20');
  headerText.setAttribute('y', '30');
  headerText.setAttribute('font-family', 'Inter, sans-serif');
  headerText.setAttribute('font-size', '20');
  headerText.setAttribute('font-weight', '600');
  headerText.setAttribute('fill', '#F9FAFB');
  headerText.textContent = `🚀 CP Gantt Timeline (${processedData.projects.length} projects)`;
  svg.appendChild(headerText);
  
  // Render first project as proof of concept
  if (processedData.projects.length > 0) {
    const firstProject = processedData.projects[0];
    renderSingleProject(svg, firstProject, 60, timelineLayout);
    
    // Show date range info with formatted dates
    if (timelineLayout.minDate && timelineLayout.maxDate) {
      const dateInfo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      dateInfo.setAttribute('x', '20');
      dateInfo.setAttribute('y', '130');
      dateInfo.setAttribute('font-family', 'Inter, sans-serif');
      dateInfo.setAttribute('font-size', '12');
      dateInfo.setAttribute('fill', '#9CA3AF');
      dateInfo.textContent = `📅 ${formatDateForDisplay(timelineLayout.minDate)} → ${formatDateForDisplay(timelineLayout.maxDate)} (${timelineLayout.totalDays} days)`;
      svg.appendChild(dateInfo);
    }
  }
}

function drawViz(data) {
  // Container setup
  let container = document.getElementById('container');
  if (container) {
    container.textContent = '';
  } else {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  // Get container dimensions
  const containerWidth = container.clientWidth || 800;
  const containerHeight = container.clientHeight || 600;
  
  console.log(`📐 Container dimensions: ${containerWidth}x${containerHeight}`);
  
  // Process the data
  const processedData = processProjectData(data);
  const timelineLayout = calculateTimelineLayout(processedData, containerWidth, containerHeight);
  
  // Create SVG container
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', containerWidth);
  svg.setAttribute('height', containerHeight);
  svg.style.background = 'linear-gradient(135deg, #1F2937 0%, #111827 100%)';
  
  // Render the CP Gantt timeline
  if (processedData.projects.length > 0) {
    renderCPGanttTimeline(svg, processedData, timelineLayout, containerWidth, containerHeight);
  } else {
    // Show waiting state with beautiful styling
    renderEmptyState(svg, containerWidth, containerHeight);
  }
  
  container.appendChild(svg);
}

// Subscribe to data and style changes. Use the table format for data.
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
