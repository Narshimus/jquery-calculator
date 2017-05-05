$(document).ready(function() {
  let operators = {
    '+': add,
    '-': sub,
    'x': mul,
    '÷': div
  }
  let num1 = 0;
  let num2 = 0;
  let oper = '';
  let hasResult = false;

  //event listener for numeric and operator buttons
  $('span').not('#clear').not('#equals').click(function() {
    //check if screen displays error
    if ($('#screen').text() !== 'error') {
      //check if button is operator and variable is empty
      if ($(this).hasClass('operator')) {
        oper = $(this).text();
        //check if second digit field should be displayed
        num2 === 0 ? $('#screen').text(`${num1}${oper}`) : $('#screen').text(`${num1}${oper}${num2}`);
        //if no operator has been inputed default to first digit field
      } else if (oper === '') {
        //check result state and call clear screen
        if (hasResult) {
          clearScreen();
          hasResult = false;
        }
        //update digit values and screen display
        num1 = num1 * 10 + parseInt($(this).text());
        $('#screen').text(`${num1}`);
      } else if (!$(this).hasClass('operator') && oper !== '') {
        num2 = num2 * 10 + parseInt($(this).text());
        $('#screen').text(`${num1}${oper}${num2}`);
      }
    }
  });

  //event listener for clear button
  $('#clear').click(function() {
    clearScreen();
  })

  //event listener for equals button
  $('#equals').click(function() {
    //check error status and verify that an operator has been inputed
    if ($('#screen').text() !== 'error' && oper !== '') {
      //call operators functions accordingly
      let results = operators[oper](num1, num2);
      num1 = results;
      num2 = 0;
      oper = '';
      hasResult = true;
      //check for 0 division
      if (results === Infinity) {
        results = 'error'
      }
      //display results
      $('#screen').text(results);
    }
  })

  //clears screen and resets variables to initial state
  function clearScreen() {
    num1 = 0;
    num2 = 0;
    oper = '';
    error = false;
    $('#screen').text(`0`);
  }

  //math functions
  function add(x, y) {
    return x + y;
  }

  function sub(x, y) {
    return x - y;
  }

  function mul(x, y) {
    return x * y;
  }

  function div(x, y) {
    return x / y;
  }


})
