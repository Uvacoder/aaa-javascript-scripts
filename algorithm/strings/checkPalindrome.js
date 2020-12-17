/**
 * @description Check if the input is a palindrome
 *
 * @param {string|number} input
 * @returns {boolean} is input a palindrome?
 */


function checkPalindrome(input)
{
  if(typeof input !== 'string' && typeof input !== 'number')
  {
    return null;
  }
  if(typeof input === 'number')
  {
    input = String(input);
  }

  return input === input.split('').reverse().join('');
}

let input = 'ABDCBA';
console.log(checkPalindrome(input));
