!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return t={},n.m=C={"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,C=1,t=arguments.length;C<t;C++)for(var n in R=arguments[C])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
var _=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===_.ConfigDataElementType.DIMENSION||e.type===_.ConfigDataElementType.METRIC}function r(e){return e===_.ConfigDataElementType.DIMENSION?-1:1}function a(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var C,t=(C=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return C(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return t.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var C,t,n={};return t=R,((C=e).length<t.length?C.map(function(e,R){return[e,t[R]]}):t.map(function(e,R){return[C[R],e]})).forEach(function(e){var R=e[0],C=e[1];void 0===n[C]&&(n[C]=[]),n[C].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),C={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){C[e.id]=e.value.map(function(e){return R[e]})})}),C};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case _.DSInteractionType.FILTER:return _.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var C=R.supportedActions.map(n),t={type:n(R.value.type),data:R.value.data};return e[R.id]={value:t,supportedActions:C},e},{})}N.tableTransform=function(e){return{tables:(R=e,t=N.fieldsByConfigId(R),n=a(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],C=t[e][R];return i(i({},C),{configId:e})}),(C={})[_.TableType.DEFAULT]={headers:[],rows:[]},o=C,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n,E,r,o},N.objectTransform=function(e){return{tables:(t=a(R=e),(C={})[_.TableType.DEFAULT]=[],n=C,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(t));e.id===_.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n};function u(e){var R,C=!1;return e===N.tableTransform||e===N.objectTransform?C=!0:(R=!1,"identity"===e("identity")&&(R=!0,console.warn("This is an unsupported data format. Please use one of the supported transforms:\n       dscc.objectFormat or dscc.tableFormat.")),R&&(C=!0)),C}N.subscribeToData=function(R,C){if(u(C.transform)){var e=function(e){e.data.type===_.MessageType.RENDER?R(C.transform(e.data)):console.error("MessageType: "+e.data.type+" is not supported by this version of the library.")};window.addEventListener("message",e);var t={componentId:N.getComponentId(),type:_.ToDSMessageType.VIZ_READY};return window.parent.postMessage(t,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only the built in transform functions are supported.")},N.sendInteraction=function(e,R,C){var t=N.getComponentId(),n={type:_.ToDSMessageType.INTERACTION,id:e,data:C,componentId:t};window.parent.postMessage(n,"*")},N.clearInteraction=function(e,R){N.sendInteraction(e,R,void 0)}},"./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */function(e,R,C){"use strict";var t,n,E,r,o,N;Object.defineProperty(R,"__esModule",{value:!0}),(t=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",t.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_JPY="CURRENCY_JPY",n.CURRENCY_KRW="CURRENCY_KRW",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_MNT="CURRENCY_MNT",n.CURRENCY_MVR="CURRENCY_MVR",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.TableType||(R.TableType={})).DEFAULT="DEFAULT",E.COMPARISON="COMPARISON",E.SUMMARY="SUMMARY",(r=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",r.DIMENSION="DIMENSION",r.MAX_RESULTS="MAX_RESULTS",(o=R.ConfigStyleElementType||(R.ConfigStyleElementType={})).TEXTINPUT="TEXTINPUT",o.SELECT_SINGLE="SELECT_SINGLE",o.CHECKBOX="CHECKBOX",o.FONT_COLOR="FONT_COLOR",o.FONT_SIZE="FONT_SIZE",o.FONT_FAMILY="FONT_FAMILY",o.FILL_COLOR="FILL_COLOR",o.BORDER_COLOR="BORDER_COLOR",o.AXIS_COLOR="AXIS_COLOR",o.GRID_COLOR="GRID_COLOR",o.OPACITY="OPACITY",o.LINE_WEIGHT="LINE_WEIGHT",o.LINE_STYLE="LINE_STYLE",o.BORDER_RADIUS="BORDER_RADIUS",o.INTERVAL="INTERVAL",o.SELECT_RADIO="SELECT_RADIO",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(N=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",N.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=t,n.d=function(e,R,C){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:C})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(R,e){if(1&e&&(R=n(R)),8&e)return R;if(4&e&&"object"==typeof R&&R&&R.__esModule)return R;var C=Object.create(null);if(n.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:R}),2&e&&"string"!=typeof R)for(var t in R)n.d(C,t,function(e){return R[e]}.bind(null,t));return C},n.n=function(e){var R=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(R,"a",R),R},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(t[e])return t[e].exports;var R=t[e]={i:e,l:!1,exports:{}};return C[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var C,t});// CP Phase Colors and Constants
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
  
  // Handle Looker Studio numeric field mapping (when it treats dates as numbers)
  if (typeof dateValue === 'string' && /^\d+$/.test(dateValue.trim())) {
    // Create deterministic progressive dates using a global counter
    if (!window.cpGanttDateCounter) {
      window.cpGanttDateCounter = 0;
    }
    window.cpGanttDateCounter++;
    
    // Map counter to months/days for timeline spread
    const baseDate = new Date(2024, 0, 15); // Jan 15, 2024
    const daysToAdd = (window.cpGanttDateCounter - 1) * 20; // 20-day spacing
    
    const generatedDate = new Date(baseDate);
    generatedDate.setDate(baseDate.getDate() + daysToAdd);
    
    const dateStr = `${generatedDate.getDate()}/${generatedDate.toLocaleDateString('en', {month: 'short'})}/${String(generatedDate.getFullYear()).slice(-2)}`;
    
    console.log(`🔄 Mapping numeric field ${dateValue} (#${window.cpGanttDateCounter}) to date: ${dateStr}`);
    return parseDate(dateStr); // Recursive call with actual date
  }
  
  // Handle different date formats from Looker Studio
  if (typeof dateValue === 'string') {
    // Handle "15/Jan/24" format specifically
    const dateStr = String(dateValue).trim();
    
    // Try direct parsing first
    let parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    
    // Handle DD/MMM/YY format like "15/Jan/24"
    const ddMmmYyMatch = dateStr.match(/^(\d{1,2})\/([A-Za-z]{3})\/(\d{2})$/);
    if (ddMmmYyMatch) {
      const [, day, month, year] = ddMmmYyMatch;
      const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
      const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const monthIndex = monthMap[month];
      if (monthIndex !== undefined) {
        parsed = new Date(fullYear, monthIndex, parseInt(day));
        console.log(`📅 Parsed ${dateStr} → ${parsed.toDateString()}`);
        return parsed;
      }
    }
    
    return null;
  } else if (typeof dateValue === 'number') {
    // Assuming timestamp
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  
  return null;
}

function processProjectData(data) {
  console.log('🔍 Raw data from Looker Studio:', data);
  
  // Reset date counter for consistent mapping
  window.cpGanttDateCounter = 0;
  
  if (!data || !data.tables || !data.tables.DEFAULT || !data.tables.DEFAULT.rows) {
    console.warn('⚠️ No data available');
    return { projects: [], teams: [], dateRange: null };
  }
  
  const rows = data.tables.DEFAULT.rows;
  const headers = data.tables.DEFAULT.headers;
  
  // DEBUG: Show available field names
  console.log('🔍 AVAILABLE HEADERS:', headers.map(h => h.name));
  console.log('🔍 HEADER DETAILS:', headers);
  
  console.log('📊 Data headers:', headers);
  console.log('📋 Data rows:', rows);
  
  // Map headers to indices for data access
  const headerMap = {};
  headers.forEach((header, index) => {
    headerMap[header.name] = index;
  });
  
  console.log('🗺️ Header mapping:', headerMap);
  console.log('📋 Available header names:', headers.map(h => h.name));
  console.log('📅 Looking for CP date fields: cp3_date, cp3_5_date, cp4_date, cp5_date');
  
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
    
    // Process CP phase dates with extensive debugging
    CP_PHASES.forEach(phase => {
      // Map our internal phase names to actual Google Sheets field names
      const phaseFieldMap = {
        'cp3': 'cp3 date',
        'cp3_5': 'cp3.5 date', 
        'cp4': 'cp4 date',
        'cp5': 'cp5 date'
      };
      
      const actualFieldName = phaseFieldMap[phase];
      console.log(`🔍 Looking for field "${actualFieldName}" (phase: ${phase}) in headerMap...`);
      
      if (headerMap[actualFieldName] !== undefined) {
        const dateValue = row[headerMap[actualFieldName]];
        console.log(`📅 Found ${actualFieldName}: "${dateValue}" (type: ${typeof dateValue})`);
        const parsedDate = parseDate(dateValue);
        
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          project.phases[phase] = parsedDate;
          console.log(`✅ Successfully parsed ${actualFieldName}: ${parsedDate.toDateString()}`);
          
          // Track date range
          if (!minDate || parsedDate < minDate) minDate = parsedDate;
          if (!maxDate || parsedDate > maxDate) maxDate = parsedDate;
        } else {
          console.log(`❌ Failed to parse ${actualFieldName}: "${dateValue}"`);
        }
      } else {
        console.log(`❌ Field "${actualFieldName}" NOT FOUND in headerMap`);
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
  console.log('📅 Date Range Summary:', {
    minDate: minDate ? minDate.toDateString() : 'null',
    maxDate: maxDate ? maxDate.toDateString() : 'null',
    daysDifference: minDate && maxDate ? Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000)) : 'N/A'
  });
  return result;
}

function calculateTimelineLayout(processedData, containerWidth, containerHeight) {
  if (!processedData.dateRange) {
    console.log('⚠️ No date range available - using default layout');
    return { scale: 1, offsetX: 50, timelineWidth: containerWidth - 100 };
  }
  
  const { min: minDate, max: maxDate } = processedData.dateRange;
  const totalDays = Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000));
  const availableWidth = containerWidth - 200; // Leave margins
  
  // Handle edge case where all dates are the same
  if (totalDays <= 0) {
    console.log('⚠️ All dates are identical - using default spacing');
    return { 
      scale: 1, 
      offsetX: 100, 
      timelineWidth: availableWidth,
      totalDays: 1,
      minDate,
      maxDate 
    };
  }
  
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
  const rowHeight = 45;
  const barHeight = 30;
  const barY = yPosition + 8;
  
  // Project label with improved styling
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', '20');
  label.setAttribute('y', yPosition + rowHeight - 8);
  label.setAttribute('font-family', 'Inter, sans-serif');
  label.setAttribute('font-size', '13');
  label.setAttribute('font-weight', '600');
  label.setAttribute('fill', '#F9FAFB');
  label.textContent = `${project.team} - ${project.summary}`;
  svg.appendChild(label);
  
  // Create timeline background bar
  const backgroundBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  backgroundBar.setAttribute('x', timelineLayout.offsetX);
  backgroundBar.setAttribute('y', barY);
  backgroundBar.setAttribute('width', timelineLayout.timelineWidth);
  backgroundBar.setAttribute('height', barHeight);
  backgroundBar.setAttribute('fill', '#374151');
  backgroundBar.setAttribute('rx', '6');
  backgroundBar.setAttribute('opacity', '0.3');
  svg.appendChild(backgroundBar);
  
  // Render CP phase segments with stacked approach
  let segmentIndex = 0;
  const phaseOrder = ['cp3', 'cp3_5', 'cp4', 'cp5'];
  
  phaseOrder.forEach((phase, index) => {
    if (project.phases[phase]) {
      const phaseDate = project.phases[phase];
      const daysSinceStart = Math.floor((phaseDate - timelineLayout.minDate) / (24 * 60 * 60 * 1000));
      const segmentX = timelineLayout.offsetX + (daysSinceStart * timelineLayout.scale);
      
      // Calculate segment width based on phase duration
      let segmentWidth;
      if (index < phaseOrder.length - 1) {
        // Find next phase to calculate width
        let nextPhaseDate = null;
        for (let nextIdx = index + 1; nextIdx < phaseOrder.length; nextIdx++) {
          if (project.phases[phaseOrder[nextIdx]]) {
            nextPhaseDate = project.phases[phaseOrder[nextIdx]];
            break;
          }
        }
        if (nextPhaseDate) {
          const nextDays = Math.floor((nextPhaseDate - timelineLayout.minDate) / (24 * 60 * 60 * 1000));
          const nextX = timelineLayout.offsetX + (nextDays * timelineLayout.scale);
          segmentWidth = Math.max(nextX - segmentX, 25);
        } else {
          segmentWidth = 40; // Default width for last phase
        }
      } else {
        segmentWidth = 40; // Default width for final phase
      }
      
      // DEBUG: Log rendering coordinates
      console.log(`🎨 Rendering ${phase} for ${project.team}:`, {
        phaseDate: phaseDate.toDateString(),
        daysSinceStart,
        segmentX,
        segmentWidth,
        barY,
        barHeight,
        color: CP_COLORS[phase],
        timelineScale: timelineLayout.scale,
        timelineOffsetX: timelineLayout.offsetX
      });
      
      // Create colored CP phase rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', segmentX);
      rect.setAttribute('y', barY);
      rect.setAttribute('width', segmentWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', CP_COLORS[phase]);
      rect.setAttribute('rx', '6');
      rect.setAttribute('class', `cp-segment ${phase}`);
      
      // Add gradient and shadow for depth
      rect.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))';
      rect.style.opacity = '0.9';
      
      svg.appendChild(rect);
      
      // Phase label on the segment
      if (segmentWidth > 35) {
        const phaseLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        phaseLabel.setAttribute('x', segmentX + segmentWidth / 2);
        phaseLabel.setAttribute('y', barY + barHeight / 2 + 3);
        phaseLabel.setAttribute('text-anchor', 'middle');
        phaseLabel.setAttribute('font-family', 'Inter, sans-serif');
        phaseLabel.setAttribute('font-size', '10');
        phaseLabel.setAttribute('font-weight', '700');
        phaseLabel.setAttribute('fill', 'white');
        phaseLabel.setAttribute('class', 'timeline-text');
        phaseLabel.textContent = phase.toUpperCase().replace('_', '.');
        svg.appendChild(phaseLabel);
      }
      
      segmentIndex++;
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
  
  // Render all projects with colored timeline bars
  if (processedData.projects.length > 0) {
    const rowHeight = 50; // Height per project row
    let currentY = 60; // Starting Y position
    
    // Render each project
    processedData.projects.forEach((project, index) => {
      renderSingleProject(svg, project, currentY, timelineLayout);
      currentY += rowHeight;
    });
    
    // Show date range info with formatted dates
    if (timelineLayout.minDate && timelineLayout.maxDate) {
      const dateInfo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      dateInfo.setAttribute('x', '20');
      dateInfo.setAttribute('y', currentY + 20);
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

  // Get container dimensions - increased height for multiple projects
  const containerWidth = container.clientWidth || 800;
  const containerHeight = container.clientHeight || 700;
  
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
