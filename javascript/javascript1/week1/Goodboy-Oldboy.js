const dogYearOfBirth = 2015;
const dogYearFuture = 2027; 
const humanYears = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;
if (shouldShowResultInDogYears) {
   const dogYears = humanYears * 7;
   console.log('Your dog will be ' + dogYears +  ' dog years old in ' + dogYearFuture);
}
else {
    console.log('Your dog will be ' + humanYears +  ' human years old in ' + dogYearFuture);
}