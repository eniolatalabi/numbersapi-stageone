const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Default route: Inform users how to use the API
app.get('/', (req, res) => {
  res.send('Welcome to the Number Classification API! Use /api/classify-number?number=YOUR_NUMBER');
});

// Utility function: Check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Utility function: Check if a number is perfect (i.e., equals the sum of its proper divisors)
function isPerfect(num) {
  if (num <= 1) return false;
  let sum = 1; // 1 is always a divisor
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
}

// Utility function: Check if a number is an Armstrong number (narcissistic number)
function isArmstrong(num) {
  const digits = num.toString().split('');
  const numDigits = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numDigits), 0);
  return sum === num;
}

// Utility function: Calculate the sum of digits of the number
function digitSum(num) {
  return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Main endpoint: GET /api/classify-number?number=<value>
app.get('/api/classify-number', async (req, res) => {
  const numParam = req.query.number;

  if (!numParam || isNaN(numParam)) {
    return res.status(400).json({
      number: numParam,
      error: true,
      message: 'Invalid input. Please provide a valid integer.'
    });
  }

  const number = parseInt(numParam, 10);
  const primeStatus = isPrime(number);
  const perfectStatus = isPerfect(number);
  const armstrongStatus = isArmstrong(number);
  const sumDigits = digitSum(number);

  const properties = [];
  if (armstrongStatus) {
    properties.push("armstrong");
  }
  properties.push(number % 2 === 0 ? "even" : "odd");

  let funFact = '';
  try {
    const response = await fetch(`http://numbersapi.com/${number}/math?json`);
    if (response.ok) {
      const data = await response.json();
      funFact = data.text;
    } else {
      funFact = `No fun fact available for ${number} at the moment.`;
    }
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    funFact = `No fun fact available for ${number} at the moment.`;
  }

  res.status(200).json({
    number: number,
    is_prime: primeStatus,
    is_perfect: perfectStatus,
    properties: properties,
    digit_sum: sumDigits,
    fun_fact: funFact
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
