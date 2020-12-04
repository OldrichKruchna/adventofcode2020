import fs from 'fs';

const data = fs.readFileSync('./expense-data.txt').toString();

const expenseReport = data.split(/\n/g);
const parsedExpenseReport = expenseReport.map(item => parseInt(item));

const sum = findSumEqualsNumber(parsedExpenseReport, 2020);

if (typeof sum !== 'object' && !sum.length) {
  throw new Error('sum is not an array. It is ' + typeof sum + sum);
} 

if (sum.length !== 3) {
  throw new Error('sum does not have two items.')
}

if(sum[0] + sum[1] + sum[2] !== 2020) {
  throw new Error('sum is not equal to 2020');
}

console.log('sum', sum);
console.log('Final result sum[0] * sum[1] * sum[2] = ', sum[0] * sum[1] * sum[2]);

function findSumEqualsNumber(array, number) {
  const arrayWithoutPivot = [...array];
  const pivot = arrayWithoutPivot.pop();

  const matches = arrayWithoutPivot.filter((item, index) => {
    const arrayWithoutSecondPivot = [...arrayWithoutPivot];
    arrayWithoutSecondPivot.splice(index, 1);

    const pivot2 = arrayWithoutSecondPivot.find(item2 => item2 + item + pivot === number);

    return item + pivot + pivot2 === number;
  });

  if(matches.length > 0) {
    return [...matches, pivot];
  }

  return findSumEqualsNumber(arrayWithoutPivot, number);
}
