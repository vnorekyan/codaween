console.log('main.js is connected');

var updateCostumeVotes = function(id, newVotes) {
  console.log(id, newVotes);
  $.ajax({
    url: `http://localhost:8080/costumes/${id}`,
    type: 'PUT',
    dataType:'json',
    data: {
      costumeVotes: newVotes
    }
  }).done(function() {
    console.log('ajax request done');
  });
};

var updateUserVotes = function(id, newVotes) {
  console.log(id, newVotes);
  $.ajax({
    url: `http://localhost:8080/users/${id}`,
    type: 'PUT',
    dataType:'json',
    data: {
      userVotes: newVotes
    }
  }).done(function() {
    console.log('ajax request done');
  });
};

$('.vote').click(function() {
  var oldCostumeVotes = Number($('body').find('.votes').text().split(' ')[1]);
  var newCostumeVotes = oldCostumeVotes + 1;
  $('body').find('.votes').text('Votes: ' + newCostumeVotes);

  updateCostumeVotes(this.id, newCostumeVotes);

});
