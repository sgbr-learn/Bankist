'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Function to display movements

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, index) => {
    const typeOfMovement = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${typeOfMovement}">${
      index + 1
    } ${typeOfMovement}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}₹</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

//Function to caluclate account balance using reduce method

const calcDisplayBalance = function (movements) {
  //reduce : to caluclate balance
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  //display balance
  labelBalance.textContent = `${balance}₹`;
};

calcDisplayBalance(account1.movements);

//Function that displays transaction summary with the help of chaining array methods

const calcSummaryValues = function (movements) {
  const valueIn = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${valueIn}₹`;

  const valueOut = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(valueOut)}₹`;

  //intrest of 1.2% on every deposit (not happens in real world 🤣) : consider only the intrests which are greater than 1
  const valueIntrest = movements
    .filter(mov => mov > 0)
    .map(mov => mov * (1.2 / 100))
    .filter(mov => mov > 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${valueIntrest}₹`;
};

calcSummaryValues(account1.movements);

//Function to create usernames through owner property

// const username = account1.owner
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');

const userNames = function (acc) {
  acc.forEach(function (user) {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

userNames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
//filter method

const deposits = movements.filter( mov => mov > 0)
console.log(deposits)

//above example with for loop

const depositsFor = [];  //initilize

for(let mov of movements) if (mov > 0 ) depositsFor.push(mov)

console.log(depositsFor)

//challenge 

const withdrawals = movements.filter(mov => mov < 0)
console.log(withdrawals)

//reduce method : acc -> SNOWBALL, array will be reduced into single value

const balance = movements.reduce((acc, mov) => (acc + mov),0)
console.log(balance)

//above using for of loop

let balance2 = 0
for(let mov of movements){
  balance2 += mov
}
console.log(balance2)

//finding maximum value of an array using reduce method

const maxValue = movements.reduce((acc, cur) => {
  if(acc > cur)
    return acc
  else
    return cur
}, movements[0])

console.log(maxValue)


//convert the deposits to usd and caluclate sum of it
//through chaining

const INRTOUSD = 1 / 85;

const balanceToUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * INRTOUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(balanceToUSD);

//NOTE : chaining affect on application performance, use only where needed


//find method returns the first element that satisfys the condition

const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements)
console.log(firstWithdrawal)

const account = accounts.find(acc => acc.username === "jd")
console.log(account)

//above logic using for of loop

let accountOne;
for(let acc of accounts){
  if(acc.username === "jd"){
    accountOne = acc
  }
}
console.log(accountOne)
*/