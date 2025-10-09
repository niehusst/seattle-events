# Manual Testing Guide: Seattle Events Web Application

## Overview
This guide provides manual testing procedures to verify the functionality of the Seattle Events Web Application.

## Prerequisites
- Application deployed and running
- Database populated with test data
- Access to the web interface

## Test Scenarios

### 1. Event Browsing
**Objective**: Verify users can browse events on the website

**Steps**:
1. Navigate to the main events page
2. Verify events are displayed in reverse chronological order
3. Verify pagination works if there are many events
4. Check that event cards contain necessary information (title, date, location)

**Expected Results**:
- Events are displayed correctly
- Most recent events appear first
- All required information is visible

### 2. Event Detail View
**Objective**: Verify users can view detailed information about an event

**Steps**:
1. Click on an event card from the events list
2. Verify the event detail page loads
3. Check that all event details are displayed (description, date, location, etc.)
4. Verify the "View on Source Website" link works

**Expected Results**:
- Event detail page loads without errors
- All event information is displayed correctly
- Link to source website opens in a new tab

### 3. Event Filtering
**Objective**: Verify users can filter events by various criteria

**Steps**:
1. Use the filter panel to filter by category
2. Use the filter panel to filter by location
3. Use the filter panel to search by keyword
4. Verify filters work together

**Expected Results**:
- Only events matching the filter criteria are displayed
- Multiple filters work correctly together
- Reset button clears all filters

### 4. Scraping Functionality
**Objective**: Verify the event scraping system works

**Steps**:
1. Wait for scheduled scraping to complete
2. Verify new events appear in the database/UI

**Expected Results**:
- Scraping process completes without errors
- New events are added to the database
- Duplicate events are not created

### 5. Responsive Design
**Objective**: Verify the application works on different screen sizes

**Steps**:
1. View the application on desktop resolution
2. Resize browser to tablet resolution
3. Resize browser to mobile resolution
4. Verify layout adjusts appropriately

**Expected Results**:
- Application remains functional at all screen sizes
- Content is readable and accessible
- Navigation works correctly

## Edge Cases to Test

### 1. No Events Available
**Steps**:
1. Ensure database has no events
2. Navigate to events page

**Expected Results**:
- Appropriate message is displayed ("No events found")
- No errors occur

### 2. Invalid Filter Criteria
**Steps**:
1. Enter invalid search terms
2. Apply filters with no matching results

**Expected Results**:
- No errors occur
- Appropriate message is displayed

### 3. Network Issues
**Steps**:
1. Disconnect from network
2. Try to load events

**Expected Results**:
- Error message is displayed
- Application doesn't crash

## Performance Tests

### 1. Load Time
- Measure page load times with varying numbers of events
- Ensure pages load within acceptable time (under 500ms)

### 2. Concurrent Users
- Simulate multiple users accessing the application
- Verify performance remains stable

## Security Tests

### 1. Input Validation
- Test for SQL injection in search fields
- Test for XSS in event data display

### 2. Access Controls
- Verify no authentication is required for public content
- Ensure scraping functionality cannot be misused