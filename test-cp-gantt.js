// CP Gantt Test Suite
// 12 comprehensive tests for data processing and rendering logic

function runTests() {
    console.log('🧪 Running CP Gantt Test Suite...\n');
    
    let passed = 0;
    let failed = 0;
    
    function test(name, testFunction) {
        try {
            const result = testFunction();
            if (result) {
                console.log(`✅ ${name}`);
                passed++;
            } else {
                console.log(`❌ ${name}`);
                failed++;
            }
        } catch (error) {
            console.log(`❌ ${name} - Error: ${error.message}`);
            failed++;
        }
    }
    
    // Test 1: Date parsing - valid DD/MMM/YY format
    test('Date parsing - valid DD/MMM/YY format', () => {
        const result = parseDate('15/Jan/24');
        return result instanceof Date && result.getFullYear() === 2024 && result.getMonth() === 0 && result.getDate() === 15;
    });
    
    // Test 2: Date parsing - invalid format
    test('Date parsing - invalid format', () => {
        const result = parseDate('invalid-date');
        return result === null;
    });
    
    // Test 3: Date parsing - empty input
    test('Date parsing - empty input', () => {
        const result = parseDate('');
        return result === null;
    });
    
    // Test 4: Date formatting - valid date
    test('Date formatting - valid date', () => {
        const date = new Date(2024, 0, 15); // January 15, 2024
        const result = formatDateForDisplay(date);
        return result === '01/15/24';
    });
    
    // Test 5: Date formatting - invalid date
    test('Date formatting - invalid date', () => {
        const result = formatDateForDisplay(null);
        return result === '';
    });
    
    // Test 6: Data processing - valid data
    test('Data processing - valid data', () => {
        const mockData = {
            tables: {
                DEFAULT: [
                    { team: 'Alpha', summary: 'Project A', cp3_date: '15/Jan/24', cp4_date: '15/Feb/24' },
                    { team: 'Beta', summary: 'Project B', cp3_date: '20/Jan/24', cp4_date: '20/Feb/24' }
                ]
            }
        };
        const result = processProjectData(mockData);
        return Array.isArray(result) && result.length === 2 && result[0].team === 'Alpha';
    });
    
    // Test 7: Data processing - empty data
    test('Data processing - empty data', () => {
        const result = processProjectData({});
        return Array.isArray(result) && result.length === 0;
    });
    
    // Test 8: Timeline layout - with projects
    test('Timeline layout - with projects', () => {
        const projects = [
            { cp3_date: new Date(2024, 0, 15), cp4_date: new Date(2024, 1, 15) }
        ];
        const result = calculateTimelineLayout(projects);
        return result.dateRange !== null && result.timelineWidth === 800;
    });
    
    // Test 9: Timeline layout - empty projects
    test('Timeline layout - empty projects', () => {
        const result = calculateTimelineLayout([]);
        return result.dateRange === null && result.timelineWidth === 800;
    });
    
    // Test 10: Date parsing - different month abbreviations
    test('Date parsing - different month abbreviations', () => {
        const jul = parseDate('04/Jul/24');
        const dec = parseDate('25/Dec/24');
        return jul instanceof Date && jul.getMonth() === 6 && 
               dec instanceof Date && dec.getMonth() === 11;
    });
    
    // Test 11: Data processing - missing CP dates
    test('Data processing - missing CP dates', () => {
        const mockData = {
            tables: {
                DEFAULT: [
                    { team: 'Gamma', summary: 'Project C' } // No dates
                ]
            }
        };
        const result = processProjectData(mockData);
        return result.length === 1 && result[0].cp3_date === null;
    });
    
    // Test 12: Timeline with mixed valid/invalid dates
    test('Timeline with mixed valid/invalid dates', () => {
        const projects = [
            { cp3_date: new Date(2024, 0, 15), cp4_date: null },
            { cp3_date: null, cp4_date: new Date(2024, 1, 15) }
        ];
        const result = calculateTimelineLayout(projects);
        return result.dateRange !== null;
    });
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
        console.log('🎉 All tests passed!');
    } else {
        console.log(`⚠️  ${failed} test(s) failed`);
    }
    
    return { passed, failed };
}

// Auto-run tests when loaded
if (typeof window !== 'undefined') {
    runTests();
}
