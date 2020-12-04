import { debug } from 'console';
import fs from 'fs';

const data = fs.readFileSync('./passwords.txt').toString();

const rawPasswordRecords = data.split(/\n/g);
const passwordRecords = rawPasswordRecords.map(record => {
    const parsedChunks = record.split(/ /);
    const policyCount = parsedChunks[0];
    // extract policy letter with ":" at the end
    const policyLetter = parsedChunks[1].substring(0, parsedChunks[1].length - 1);
    const password = parsedChunks[2];

    const parsedPolicyCount = policyCount.split(/-/);
    const policyCountMin = parseInt(parsedPolicyCount[0]);
    const policyCountMax = parseInt(parsedPolicyCount[1]);

    return {
        policy: {
            min: policyCountMin,
            max: policyCountMax,
            letter: policyLetter
        },
        password
    };
});

const validPasswords = passwordRecords.filter(passwordRecord => {
    let counter = 0;

    if (passwordRecord.policy.max === 0) {
        return false;
    }
    try {
        for (let c of passwordRecord.password) {
            if(c === passwordRecord.policy.letter) {
                counter++;
            }

            if(counter > passwordRecord.policy.max) {
                throw new Error('Max count overflowed.')
            }
        }
        if (counter < passwordRecord.policy.min) {
            throw new Error('Min not fullfiled.')
        }
    } catch (error) {
        return false;
    }
    return true;
});

console.log('Number of valid passwords:', validPasswords.length);
