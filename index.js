// Function to create an employee record
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
}

// Function to create a time event for an employee
function createTimeEvent(type, employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    const event = { type, hour: parseInt(hour), date };
    if (type === 'TimeIn') {
        employeeRecord.timeInEvents.push(event);
    } else if (type === 'TimeOut') {
        employeeRecord.timeOutEvents.push(event);
    }
    return employeeRecord;
}

// Function to create a time-in event for an employee
function createTimeInEvent(employeeRecord, timeStamp) {
    return createTimeEvent('TimeIn', employeeRecord, timeStamp);
}

// Function to create a time-out event for an employee
function createTimeOutEvent(employeeRecord, timeStamp) {
    return createTimeEvent('TimeOut', employeeRecord, timeStamp);
}

// Function to calculate hours worked on a specific date

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        const timeIn = new Date(timeInEvent.date + 'T' + timeInEvent.hour + ':00');
        const timeOut = new Date(timeOutEvent.date + 'T' + timeOutEvent.hour + ':00');
        const hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60); // Calculate hours worked
        return Math.floor(hoursWorked); // Round down to the nearest whole number
    } else {
        return 0; // Return 0 if either timeInEvent or timeOutEvent is missing
    }
}
// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;

    // Ensure that hoursWorked is a valid number
    if (!isNaN(hoursWorked)) {
        return hoursWorked * payRate;
    } else {
        return 0;
    }
}

// Function to calculate total wages for an employee
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    }, 0);
}


// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
}
