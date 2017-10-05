console.log('main.js is connected');

if (localStorage.getItem('clicked') === 'true') {
  var buttonIds = JSON.parse(localStorage.getItem('buttonArray'));
  for (let i = 0; i < buttonIds.length; i++) {
    console.log('buttonIds', buttonIds[i]);
    $(`#${buttonIds[i]}`).attr('disabled', 'disabled');
  }
}

var updateUserVotes = function(id) {
  var userId = id;
  $.ajax({
    url: `http://localhost:8080/users/data/${userId}`,
    type: 'GET',
    dataType: 'json'
  }).then(function(getResponse) {
    var oldVotes = getResponse.userVotes;
    if(oldVotes > 0) {
      var newVotes = oldVotes - 1;
    }

    $.ajax({
      url: `http://localhost:8080/users/${userId}`,
      type: 'PUT',
      dataType:'json',
      data: {
        userVotes: newVotes
      }
    }).done(function() {
      console.log('ajax request done');
    });
  });
};

var updateCostumeVotes = function(id) {
  var costumeId = id;
  console.log('costumeid', costumeId);
  $.ajax({
    url: `http://localhost:8080/costumes/data/${costumeId}`,
    type: 'GET',
    dataType: 'json'
  }).then(function(getResponse) {
    console.log(getResponse);
    var oldVotes = getResponse.costumeVotes;
    var newVotes = oldVotes + 1;

    $.ajax({
      url: `http://localhost:8080/costumes/${costumeId}`,
      type: 'PUT',
      dataType:'json',
      data: {
        costumeVotes: newVotes
      }
    }).done(function() {
      console.log('ajax request done');
    });
  });
};

$('.vote').click(function() {
  var oldCostumeVotes = Number($('body').find('.votes').text().split(' ')[1]);
  var newCostumeVotes = oldCostumeVotes + 1;
  $('body').find('.votes').text('Votes: ' + newCostumeVotes);

  var userLink = $('.userLink').attr('href').split('');
  var userId = userLink[userLink.length - 1];

  updateCostumeVotes(this.id);
  updateUserVotes(userId);

  var array = JSON.parse(localStorage.getItem('buttonArray'));
  array.push(Number(this.id));
  localStorage.setItem('clicked', true);
  localStorage.setItem('buttonArray', JSON.stringify(array));
  $(`#${this.id}`).attr('disabled', 'disabled');

});
