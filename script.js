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

// displayMovements(account1.movements);

//Function to caluclate account balance using reduce method

const calcDisplayBalance = function (acc) {
  //reduce : to caluclate balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //display balance
  labelBalance.textContent = `${acc.balance}₹`;
};

// calcDisplayBalance(account1.movements);

//Function that displays transaction summary with the help of chaining array methods

const calcSummaryValues = function (acc) {
  const valueIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${valueIn}₹`;

  const valueOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(valueOut)}₹`;

  //intrest of 1.2% on every deposit (not happens in real world 🤣) : consider only the intrests which are greater than 1

  const rateOfIntrest = acc.interestRate;

  const valueIntrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (rateOfIntrest / 100))
    .filter(mov => mov > 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${valueIntrest}₹`;
};

// calcSummaryValues(account1.movements);

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

//Function to display UI
function updateUI(acc){
  //Display movements
  displayMovements(acc.movements);
  //Display Summary
  calcSummaryValues(acc);
  //Display balance
  calcDisplayBalance(acc);
}

//Implementing login using find() method.

//Current account

let currentAccount

btnLogin.addEventListener('click', function (event) {
  //preventing default behaviour that happens on clicking form button
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) : using short circuting
  // below method written with the help of optional chaining => ?.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputLoginPin.blur(); //to remove cursor focus on pin
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    
    updateUI(currentAccount)
  }
});

//Implementing transfer

btnTransfer.addEventListener('click', function (e) {
  //prevent default behaviour
  e.preventDefault();

  //get the receiver account
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(Number(inputTransferAmount.value), inputTransferTo.value);
  let amount = Number(inputTransferAmount.value)
  let user = inputTransferTo.value

  //clear the transer inputs
  inputTransferAmount.value = inputTransferTo.value = ''

  //validate conditions : a.Transfer amount > 0, b.Self transfer is not valid, c.existance of receiver account, d.transfer amount <= users balance
  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && user !== currentAccount.username){
    //add negative movement to current account
    currentAccount.movements.push(-amount)
    //add positive movement to receiver account
    receiverAcc.movements.push(amount)
  }

  //reload the UI with updated details
  updateUI(currentAccount)
});

//Close functionality using findIndex() : returns the index of the element we are searching for based on condition(first occurance)
btnClose.addEventListener('click', function(event){
  event.preventDefault()

  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    //find the account to be deleted
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)

    //delete the account
    accounts.splice(index,1)

    //change the opacity
    containerApp.style.opacity = 0

    //clear the input fields
    inputClosePin.value = inputCloseUsername.value = ''
  }
})

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


//findLast and findLastIndex

console.log(movements)

const latestWithdrawal = movements.findLast( mov => mov < 0)
console.log(latestWithdrawal)

//largest movement: movement amount greater than 2000(irrespective of deposit ot withdrawal)

const lastestLargestMovementIndex = movements.findLastIndex(mov => Math.abs(mov) > 2000)
console.log(lastestLargestMovementIndex)
console.log(`Your largest movement was ${movements.length - lastestLargestMovementIndex} movements ago`)


//some and every

console.log(movements)

//checks for equality: returns true if movements array contains 3000 otherwise false
console.log(movements.includes(3000))

//some: can be used to check condition and returns single boolean
console.log(movements.some(mov => mov === 3000)) //implementing includes() method
console.log(movements.some(mov => mov > 0)) //true
console.log(movements.some(mov => mov > 5000)) //false

//every: as name suggests, every element in the array must satisfy the condition for true and returns boolean values
console.log(movements.every(mov => mov > 0)) //false
console.log(account4.movements)
console.log(account4.movements.every(mov => mov > 0)) //true
*/