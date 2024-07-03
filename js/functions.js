const checkStringLength = (string, length) => string.length <= length;

const checkPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';
  for (let i = normalizedString.length; i > 0; i--) {
    reversedString += normalizedString[i - 1];
  }
  return reversedString === normalizedString;
};

const getNumber = (string) => {
  let result = '';
  const normalizedString = String(string).replaceAll(' ', '');
  for (let i = 0; i < normalizedString.length; i++) {
    const char = Number(normalizedString[i]);
    if (char || char === 0) {
      result += normalizedString[i];
    }
  }
  return parseInt(result, 10);
};

checkStringLength();
checkPalindrome();
getNumber();
