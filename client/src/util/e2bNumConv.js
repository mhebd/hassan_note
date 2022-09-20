/* eslint-disable no-restricted-globals */
const e2bNumConv = (num) => {
  const numbers = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯',
  };

  let numArr = [];
  if (num) numArr = num.toString().split('');

  return numArr
    .map((n) => {
      if (isNaN(n)) {
        return n;
      }
      return numbers[n];
    })
    .join('');
};

export default e2bNumConv;
