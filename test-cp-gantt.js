// CP Gantt Test Suite - Simple JavaScript Testing
// Run in browser console or test runner HTML

console.log('🧪 CP Gantt Test Suite Starting...\n');

// Test Counter
let testCount = 0;
let passedTests = 0;

function runTest(testName, testFunction) {
  testCount++;
  try {
    const result = testFunction();
    if (result) {
      passedTests++;
      console.log(`✅ Test ${testCount}: ${testName} - PASSED`);
    } else {
      console.error(`❌ Test ${testCount}: ${testName} - FAILED`);
    }
  } catch (error) {
    console.error(`💥 Test ${testCount}: ${testName} - ERROR:`, error.message);
  }
}

// ===== DATE PARSING TESTS =====

function testParseDateString() {
  // Test valid date string
  const date1 = parseDate('2024-01-15');
  const date2 = parseDate('2024-02-01');
  
  console.log('🔍 Valid date test details:', { 
    date1, 
    date2,
    date1Type: typeof date1,
    date1instanceof: date1 instanceof Date,
    date1Time: date1 ? date1.getTime() : 'null',
    date1isNaN: date1 ? isNaN(date1.getTime()) : 'null',
    actualYear: date1 ? date1.getFullYear() : 'null',
    actualMonth: date1 ? date1.getMonth() : 'null', 
    actualDate: date1 ? date1.getDate() : 'null',
    expectedDate: 15
  });
  
  // More flexible test - just check if it's a valid date in January 2024
  const isValidDate = date1 instanceof Date && !isNaN(date1.getTime());
  const isCorrectYear = date1.getFullYear() === 2024;
  const isCorrectMonth = date1.getMonth() === 0; // January
  const isCorrectDay = date1.getDate() === 15 || date1.getUTCDate() === 15; // Allow for timezone
  
  console.log('🔍 Test components:', { isValidDate, isCorrectYear, isCorrectMonth, isCorrectDay });
  
  return isValidDate && isCorrectYear && isCorrectMonth && isCorrectDay;
}

function testParseDateTimestamp() {
  // Test timestamp (milliseconds)
  const timestamp = 1705363200000; // 2024-01-15 in ms
  const date = parseDate(timestamp);
  
  return date instanceof Date && 
         !isNaN(date.getTime()) &&
         date.getTime() === timestamp;
}

function testParseDateNull() {
  // Test null/undefined handling
  const date1 = parseDate(null);
  const date2 = parseDate(undefined);
  const date3 = parseDate('');
  
  return date1 === null && date2 === null && date3 === null;
}

function testParseDateInvalid() {
  // Test invalid date strings
  const date1 = parseDate('invalid-date');
  const date2 = parseDate('2024-13-45'); // Invalid month/day
  
  // Both should return null or be invalid dates
  const result1 = date1 === null || (date1 instanceof Date && isNaN(date1.getTime()));
  const result2 = date2 === null || (date2 instanceof Date && isNaN(date2.getTime()));
  
  console.log('🔍 Invalid date test details:', { date1, date2, result1, result2 });
  
  return result1 && result2;
}

// ===== DATE FORMATTING TESTS =====

function testFormatDateDisplay() {
  // Test MM/DD/YY format
  const date1 = new Date('2024-01-15'); // January 15, 2024
  const date2 = new Date('2024-02-01'); // February 1, 2024
  const date3 = new Date('2024-12-25'); // December 25, 2024
  
  const formatted1 = formatDateForDisplay(date1);
  const formatted2 = formatDateForDisplay(date2);
  const formatted3 = formatDateForDisplay(date3);
  
  console.log('🔍 Date formatting test:', {
    input1: '2024-01-15',
    output1: formatted1,
    expected1: '01/15/24',
    input2: '2024-02-01', 
    output2: formatted2,
    expected2: '02/01/24',
    input3: '2024-12-25',
    output3: formatted3,
    expected3: '12/25/24'
  });
  
  return formatted1 === '01/15/24' && 
         formatted2 === '02/01/24' && 
         formatted3 === '12/25/24';
}

// ===== DATA PROCESSING TESTS =====

function testProcessProjectDataEmpty() {
  // Test empty/null data
  const result1 = processProjectData(null);
  const result2 = processProjectData({});
  const result3 = processProjectData({ tables: {} });
  
  return result1.projects.length === 0 && 
         result1.teams.length === 0 &&
         result2.projects.length === 0 &&
         result3.projects.length === 0;
}

function testProcessProjectDataSample() {
  // Test with sample data structure
  const mockData = {
    tables: {
      DEFAULT: {
        headers: [
          { name: 'team' },
          { name: 'summary' },
          { name: 'cp3_date' },
          { name: 'cp3_5_date' },
          { name: 'cp4_date' },
          { name: 'cp5_date' }
        ],
        rows: [
          ['Platform', 'Auth Redesign', '2024-01-15', '2024-02-01', '2024-03-01', '2024-04-01'],
          ['Mobile', 'iOS Performance', '2024-01-20', '2024-02-10', '2024-03-10', '2024-04-10']
        ]
      }
    }
  };
  
  const result = processProjectData(mockData);
  
  return result.projects.length === 2 &&
         result.teams.length === 2 &&
         result.teams.includes('Platform') &&
         result.teams.includes('Mobile') &&
         result.projects[0].summary === 'Auth Redesign' &&
         result.projects[1].summary === 'iOS Performance' &&
         result.dateRange !== null;
}

function testProcessProjectDataTeamGrouping() {
  // Test team grouping logic
  const mockData = {
    tables: {
      DEFAULT: {
        headers: [
          { name: 'team' },
          { name: 'summary' },
          { name: 'cp3_date' }
        ],
        rows: [
          ['Platform', 'Project A', '2024-01-15'],
          ['Platform', 'Project B', '2024-01-20'],
          ['Mobile', 'Project C', '2024-01-25']
        ]
      }
    }
  };
  
  const result = processProjectData(mockData);
  
  return result.teamGroups['Platform'].length === 2 &&
         result.teamGroups['Mobile'].length === 1 &&
         result.teamGroups['Platform'][0].summary === 'Project A';
}

// ===== TIMELINE LAYOUT TESTS =====

function testTimelineLayoutBasic() {
  // Test basic timeline calculation
  const mockProcessedData = {
    dateRange: {
      min: new Date('2024-01-01'),
      max: new Date('2024-04-01') // 91 days
    }
  };
  
  const layout = calculateTimelineLayout(mockProcessedData, 800, 600);
  
  return layout.scale > 0 &&
         layout.offsetX === 100 &&
         layout.totalDays > 80 && layout.totalDays < 100 && // ~91 days
         layout.timelineWidth === 600; // 800 - 200 margin
}

function testTimelineLayoutNoData() {
  // Test with no date range
  const mockProcessedData = { dateRange: null };
  const layout = calculateTimelineLayout(mockProcessedData, 800, 600);
  
  return layout.scale === 1 &&
         layout.offsetX === 50;
}

// ===== RUN ALL TESTS =====

console.log('🧪 Running Date Parsing Tests...');
runTest('Parse Date String', testParseDateString);
runTest('Parse Date Timestamp', testParseDateTimestamp);
runTest('Parse Date Null/Empty', testParseDateNull);
runTest('Parse Date Invalid', testParseDateInvalid);

console.log('\n📅 Running Date Formatting Tests...');
runTest('Format Date MM/DD/YY', testFormatDateDisplay);

console.log('\n📊 Running Data Processing Tests...');
runTest('Process Empty Data', testProcessProjectDataEmpty);
runTest('Process Sample Data', testProcessProjectDataSample);
runTest('Team Grouping Logic', testProcessProjectDataTeamGrouping);

console.log('\n📏 Running Timeline Layout Tests...');
runTest('Basic Timeline Layout', testTimelineLayoutBasic);
runTest('Timeline No Data', testTimelineLayoutNoData);

// ===== RESULTS =====
console.log(`\n🎯 TEST RESULTS: ${passedTests}/${testCount} tests passed`);

if (passedTests === testCount) {
  console.log('✅ ALL TESTS PASSED! Data processing and formatting is solid! 🚀');
} else {
  console.log(`⚠️  ${testCount - passedTests} tests failed - check implementation`);
}

console.log('\n💡 To run tests: Include test-cp-gantt.js after cp-gantt-simple.js in a test HTML file');
