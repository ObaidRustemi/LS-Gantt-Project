function drawViz(data) {
  // Container setup.
  let container = document.getElementById('container');
  if (container) {
    container.textContent = '';
  } else {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  // Get iframe dimensions from DSCC
  const height = dscc.getHeight();
  const width = dscc.getWidth();
  
  // Create SVG container for our CP Gantt
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.style.background = '#F8FAFC';

  // Access our Google Sheets data
  if (data && data.tables && data.tables.DEFAULT) {
    const headers = data.tables.DEFAULT.headers;
    const rows = data.tables.DEFAULT.rows;
    
    // For now, render a simple "Hello CP Gantt!" message
    // We'll expand this to full timeline rendering
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50');
    text.setAttribute('y', '50');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('font-size', '18');
    text.setAttribute('fill', '#1F2937');
    text.textContent = `Hello CP Gantt! Found ${rows ? rows.length : 0} projects`;
    
    svg.appendChild(text);
    
    // Debug: Show data structure
    if (rows && rows.length > 0) {
      const debugText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      debugText.setAttribute('x', '50');
      debugText.setAttribute('y', '80');
      debugText.setAttribute('font-family', 'Inter, sans-serif');
      debugText.setAttribute('font-size', '14');
      debugText.setAttribute('fill', '#6B7280');
      debugText.textContent = `First project: ${rows[0][0]} - ${rows[0][1]}`;
      svg.appendChild(debugText);
    }
  } else {
    // No data available
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50');
    text.setAttribute('y', '50');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('font-size', '18');
    text.setAttribute('fill', '#DC2626');
    text.textContent = 'CP Gantt: Waiting for data...';
    svg.appendChild(text);
  }

  // Apply styling from our cc_config.json controls
  if (data && data.style) {
    // Apply color scheme if available
    if (data.style.colorScheme) {
      const scheme = data.style.colorScheme.value;
      // We'll implement color theming here
    }
    
    // Apply row height if available  
    if (data.style.rowHeight) {
      const height = data.style.rowHeight.value;
      // We'll implement row height control here
    }
  }

  // Render the visualization
  container.appendChild(svg);
}

// Subscribe to data and style changes. Use the table format for data.
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
