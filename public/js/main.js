console.log('main.js is connected');

if(JSON.parse(localStorage.getItem('buttonArray')) === null) {
  var array = [];
  localStorage.setItem('buttonArray', JSON.stringify(array));
}

if (localStorage.getItem('clicked') === 'true') {
  var buttonIds = JSON.parse(localStorage.getItem('buttonArray'));
  for (let i = 0; i < buttonIds.length; i++) {
    console.log('buttonIds', buttonIds[i]);
    $(`#${buttonIds[i]}`).attr('disabled', 'disabled');
  }
}

var updateCostumeVotes = function(id) {
  var costumeId = id;
  console.log('costumeid', costumeId);

  $.ajax({
    url: `https://codaween.herokuapp.com/costumes/data/${costumeId}`,
    type: 'GET',
    dataType: 'json'
  }).then(function(getResponse) {
    console.log('response',getResponse);
    var oldVotes = getResponse.costumeVotes;
    var newVotes = oldVotes + 1;
    console.log('newvotes', newVotes);

    $.ajax({
      url: `https://codaween.herokuapp.com/costumes/data/${costumeId}`,
      type: 'GET',
      dataType:'json'
      // data: {
      //   costumeVotes: newVotes
      // }
    }).then(function() {
      console.log('ajax request done');
    });
  });
};

$('.vote').click(function() {
  // var oldCostumeVotes = Number($('body').find('.votes').text().split(' ')[1]);
  // var newCostumeVotes = oldCostumeVotes + 1;
  // $('body').find('.votes').text('Votes: ' + newCostumeVotes);

  updateCostumeVotes(this.id);

  var array = JSON.parse(localStorage.getItem('buttonArray'));
  array.push(Number(this.id));
  localStorage.setItem('clicked', true);
  localStorage.setItem('buttonArray', JSON.stringify(array));
  $(`#${this.id}`).attr('disabled', 'disabled');

});
