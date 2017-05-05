$(document).ready(function() {

  //add numerical span elements to screen
  $('span').not('.operator').not('#zero').click(function() {
    let last= $('#screen span:last-child');
    last.hasClass('evaluated') || last.hasClass('zero') ? $('#screen').empty() : null;
    !last.hasClass('error') ? $('#screen').append(`<span>${$(this).text()}</span>`) : null;
  })

  //add operator span elements
  $('.operator').not('#clear').not('#equals').click(function() {
    let hasOperator = false;
    //check if screen is zero
    if ($('#screen span:last-child').hasClass('zero')){
      if ($(this).text() === '-') {
        $('#screen').empty();
        $('#screen').append(`<span class='operator negative'>${$(this).text()}</span>`);
      }
    }
      else{
      //check if previous spans contain operands or is negative
      $('#screen').children().each(function() {
        if ($(this).hasClass('operator') && !$(this).hasClass('negative')) {
          hasOperator = true;
        }
      })
      if (hasOperator === false && !$('#screen span:last-child').hasClass('error') ) {
        $('#screen').append(`<span class='operator'>${$(this).text()}</span>`);
      }
      else{
        $('#screen').empty();
        $('#screen').append("<span class='error'>error</span>")
      }
    }
  })

  //zero button input validation
  $('#zero').click(function() {
    let last = $('#screen span:last-child');
    //check if screen is zero
    if (!last.hasClass('zero')) {
      //check if previous span contain operands
      if (!last.hasClass('operator')) {
        $('#screen').append(`<span>${$(this).text()}</span>`);
      }
    }
  })

  //create equal button
  $('#equals').click(function() {
    if (!$('#screen span:last-child').hasClass('operator')) {
      let str = '';
      $('#screen').children().each(function() {
        $(this).text() === 'x' ? str += '*' : $(this).text() === '÷' ? str += '/' : str += $(this).text();
      })
      $('#screen').empty();
      $('#screen').append(`<span class='evaluated'>${eval(str)}</span>`);
    }
  })

  //clear button
  $('#clear').click(function() {
    $('#screen').empty();
    $('#screen').append('<span class ="zero">0</span>')
  });

});
