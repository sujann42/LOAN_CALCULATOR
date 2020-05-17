//Listen For submit 
document.getElementById('loan-form').addEventListener('submit', function(e){
  //HIDE RESULTS
  document.getElementById('results').style.display= 'none';
  //SHOW LOADER
  document.getElementById('loading').style.display='block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate Results
function calculateResults(e){
  console.log('Calculating......');

  //Required UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayemnt = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //Calculations
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calcualtedPayements = parseFloat(years.value)*12;

  //Monthly Payments
  const x = Math.pow(1+calculatedInterest, calcualtedPayements);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  //Verify if its finite
  if(isFinite(monthly)){
    monthlyPayemnt.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcualtedPayements).toFixed(2);
    totalInterest.value = ((monthly * calcualtedPayements)-principal).toFixed(2);
    //SHOW RESULTS
    document.getElementById('results').style.display= 'block';
    //HIDE LOADING
    document.getElementById('loading').style.display='none';

  }else{
    showError('Please check your numbers');
  }
}

//SHOW ERROR
function showError(error){
  //HIDE RESULTS
  document.getElementById('results').style.display= 'none';
  //HIDE LOADING
  document.getElementById('loading').style.display='none';
  const errorDiv = document.createElement('div');

  //Get Elements (parent) to insert in the card before heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //Create text and apepnd it to the div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading on the card
  card.insertBefore(errorDiv, heading);

  //Clear error after 2 seconds
  setTimeout(clearError, 1000);

  //Clear Error
  function clearError(){
    document.querySelector('.alert').remove();
  }

}

