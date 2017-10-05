console.log('sort is connected');
var sortCostumes = function() {
  $.ajax({
    url: `http://localhost:8080/costumes/data`,
    type: 'GET',
    dataType:'json'
  }).done(function(response) {
    console.log('ajax request done');
    console.log('before sorting');
    response.sort(function(a, b) {
      return b.costumeVotes - a.costumeVotes;
    });

    response.forEach(costume => {
      var costumeDiv = $('<div>');
      var name = $('<a>').text(costume.costumeName).attr('href', `http://localhost:8080/costumes/${costume.id}`);
      var picture = $('<img>').attr('src', costume.costumePicture);
      var description = $('<p>').text(costume.costumeDescription);
      var votes = $('<h2>').text(costume.costumeVotes);
      costumeDiv.append(name);
      costumeDiv.append(picture);
      costumeDiv.append(description);
      costumeDiv.append(votes);
      $('body').append(costumeDiv);
    })


  });
};

sortCostumes();
