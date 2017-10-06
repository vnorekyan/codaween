console.log('sort is connected');
var sortCostumes = function() {
  $.ajax({
    url: `https://localhost:8080/costumes/data`,
    type: 'GET',
    dataType:'json'
  }).done(function(response) {
    console.log('ajax request done');
    console.log('before sorting');
    response.sort(function(a, b) {
      return b.costumeVotes - a.costumeVotes;
    });

    response.forEach(costume => {
      var costumeDiv = $('<div>').attr('class', 'card').attr('style', 'margin: 1rem; height: 20rem; width:20rem; display:inline-block; align:vertical-align');
      var name = $('<a>').text(costume.costumeName).attr('href', `https://codaween.herokuapp.com/costumes/${costume.id}`);
      var picture = $('<img>').attr('src', costume.costumePicture).attr('class', 'card-img-top sized');
      var description = $('<p>').text(costume.costumeDescription);
      var cardBlock = $('<div>').attr('class', 'card-block');
      var name = $('<a>').text(costume.costumeName).attr('href', `https://codaween.herokuapp.com/costumes/${costume.id}`);
      var votes = $('<p>').text(`Votes: ${costume.costumeVotes}`).attr('class', 'card-title');
      cardBlock.append(name);
      cardBlock.append(votes);
      costumeDiv.append(picture);
      costumeDiv.append(cardBlock);
      $('body').append(costumeDiv);
    });
  });
};

sortCostumes();
