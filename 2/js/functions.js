console.log('Задача 1');
/* Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину
и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
Эта функция нам пригодится для валидации формы. */

const isStringShort = (testString, maxLength) => String(testString.length) <= maxLength;

// Cтрока короче 20 символов
console.log(isStringShort('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(isStringShort('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(isStringShort('проверяемая строка', 10)); // false

console.log('Задача 2');
/* Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза,
которые одинаково читаются и слева направо и справа налево. */

const isPalynodrome = (testString) => {
  const string = String(testString.toLowerCase())
    .replaceAll(' ', '');
  const reverseString = string
    .split('')
    .reverse()
    .join('');
  return string === reverseString;
};

// Строка является палиндромом
console.log(isPalynodrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalynodrome('ДовОд')); // true
// Это не палиндром
console.log(isPalynodrome('Кекс'));  // false
// Это палиндром
console.log(isPalynodrome('Лёша на полке клопа нашёл ')); // true

console.log('Задача 3');
/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN */

/* const getNumbers = (testString) => {
  let result = '';
  for (let i = 0; i < testString.length; i++) {
    if (!Number.isNaN(parseInt(testString.at(i), 10))) {
      result += testString.at(i);
    }
  }
  return parseInt(result, 10);

  const string = testString.replaceAll(' ', '');
  return string;
}; */

const getNumbers = (testString) => {
  const string = String(testString)
    .replace(/\D/g, '');
  return (string === '') ? NaN : parseInt(string, 10);
};

console.log(getNumbers('2023 год'));            // 2023
console.log(getNumbers('ECMAScript 2022'));     // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007'));           // 7
console.log(getNumbers('а я томат'));           // NaN
console.log(getNumbers(2023));                  // 2023
console.log(getNumbers(-1));                    // 1
console.log(getNumbers(1.5));                   // 15

console.log('Задача 4');
/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами —
и возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца. */

const getString = (testString, minLength, addlString) => {
  const actualString = minLength - testString.length;
  return (actualString <= 0) ? testString : addlString.slice(0, actualString % addlString.length) + addlString.repeat(actualString / addlString.length) + testString;
};

// Добавочный символ использован один раз
console.log(getString('1', 2, '0'));      // '01'
// Добавочный символ использован три раза
console.log(getString('1', 4, '0'));      // '0001'
// Добавочные символы обрезаны с конца
console.log(getString('q', 4, 'werty'));  // 'werq'
// Добавочные символы использованы полтора раза
console.log(getString('q', 4, 'we'));     // 'wweq'
// Добавочные символы не использованы, исходная строка не изменена
console.log(getString('qwerty', 4, '0')); // 'qwerty'
