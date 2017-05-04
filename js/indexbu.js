$(document).ready(function() {

  //add numerical span elements to screen
  $('span').not('.operator').not('#zero').click(function() {
    let last= $('#screen span:last-child');
    last.hasClass('evaluated') || last.hasClass('zero') ? $('#screen').empty() : null;
    $('#screen').append(`<span>${$(this).text()}</span>`);
  })

  //add operator span elements
  $('.operator').not('#clear').not('#equals').click(function() {
    let hasOperator = false;
    //check if screen is zero
    if (!$('#screen span:last-child').hasClass('zero') || $(this).text() === '-') {
      //check if previous spans contain operands
      $('#screen').children().each(function() {
        if ($(this).hasClass('operator')) {
          hasOperator = true;
        }
      })
      hasOperator === false ? $('#screen').append(`<span class='operator'>${$(this).text()}</span>`) : null;
    }
  })

  //zero button input validation
  $('#zero').click(function() {
    let last = $('#screen span:last-child');
    //check if screen is zero
    if (!$(last.hasClass('zero'))) {
      //check if previous span contain operands
      if (!$(last.hasClass('operator'))) {
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
