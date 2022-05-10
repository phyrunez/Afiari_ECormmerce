export const getNumber = (num = '') => {
  if (!num) return 0;
  let number = [];
  for (let index = 0; index < num.length; index++) {
    if (/[0-9.]/.test(num[index])) number.push(num[index]);
  }
  return Number(number.join(''));
};

export const formatCurrency = (value, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
  }).format(value);
};
