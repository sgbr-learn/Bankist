/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know 
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

//calulcate dog age in human years

/*
const calcAverageHumanAge = function (dogsage) {
  const humanYears = dogsage.map(dogAge => {
    if (dogAge <= 2) return 2 * dogAge;
    else return 16 + dogAge * 4;
  });

  const adultAge = humanYears.filter(dogAge => dogAge >= 18);

//   console.log(adultAge);

  const averageHumanAge =
    adultAge.reduce((acc, cur) => acc + cur, 0) / adultAge.length;

  console.log(averageHumanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

//challenge 3
//convert the above functionality : chaining methods and using arrow function syntax

const calcAverageHumanAge = ages => {
  const averageAge = ages
    .map(dogAge => {
      if (dogAge <= 2) return 2 * dogAge;
      else return 16 + dogAge * 4;
    })
    .filter((dogAge, i, arr) => {
      // console.log(arr);
      return dogAge >= 18;
    })
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  console.log(averageAge);
};

/*
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); 
*/

//Challenge 5
/* Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the 
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% 
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate 
the recommended food portion and add it to the object as a new property. Do 
not create a new array, simply loop over the array. Forumla: 
recommendedFood = weight ** 0.75 * 28. (The result is in grams of 
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too 
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in 
the owners array, and so this one is a bit tricky (on purpose) �
3. Create an array containing all owners of dogs who eat too much 
('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and 
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat 
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food 
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food 
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try 
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food 
portion in an ascending order (keep in mind that the portions are inside the 
array's objects �)
The Complete JavaScript Course 26
Hints:
§ Use many different tools to solve these challenges, you can use the summary 
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means: 
current > (recommended * 0.90) && current < (recommended * 
1.10). Basically, the current portion should be between 90% and 110% of the 
recommended portion. */

//test data
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/*
//1.loop over and add property: forEach (side effect)
//formula, recommendedFood = weight ** 0.75 * 28

dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

//2.find saras dog and its food consumption
const sarahsDog = dogs.find(dog => {
  return dog.owners.includes('Sarah');
});

const recommendedMaxConsumption = sarahsDog.recommendedFood * 1.1;
const recommendedMinConsumption = sarahsDog.recommendedFood * 0.9;

if (sarahsDog.curFood > recommendedMaxConsumption) {
  console.log('Eating too much');
} else if (sarahsDog.curFood < recommendedMinConsumption) {
  console.log('Eating little');
}

//3.

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood >= dog.recommendedFood * 1.1)
  .map(dog => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood <= dog.recommendedFood * 0.9)
  .map(dog => dog.owners)
  .flat();

console.log(ownersEatTooLittle, ownersEatTooMuch);

//5.
const exactConsuption = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(exactConsuption)

//6.
const okayConsumption = dogs.some(dog => dog.curFood >= dog.recommendedFood * 0.9 && dog.curFood <= dog.recommendedFood * 1.1)
console.log(okayConsumption)

//7.
const okayConsumptionDogs = dogs.filter(dog => dog.curFood >= dog.recommendedFood * 0.9 && dog.curFood <= dog.recommendedFood * 1.1)
console.log(okayConsumptionDogs)

//8.
// const dogsCopy = [...dogs]
const dogsCopy = dogs.slice()
*/

//Challenge 4 -> complete this first
/* 
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
*/