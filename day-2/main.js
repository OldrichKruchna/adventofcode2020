import fs from 'fs';

const data = fs.readFileSync('./passwords.txt').toString();

const passwordRecords = data.split(/\n/g);
const passwords = passwordRecords.map(record => {
    const parsedChunks = record.split(/ /);
    const policyCount = parsedChunks[0];
    // extract policy letter with ":" at the end
    const policyLetter = parsedChunks[1].substring(0, tmp[1].length - 1);
    const password = parsedChunks[2];

    const parsedPolicyCount = policyCount.split(/-/);
    const policyCountMin = parseInt(parsedPolicyCount[0]);
    const policyCountMax = parseInt(parsedPolicyCount[1]);

    debugger;
});
debugger;
// const parsedExpenseReport = expenseReport.map(item => parseInt(item));