console.log('sort is connected');
var sortCostumes = function() {
  $.ajax({
    url: `https://codaween.herokuapp.com/costumes/data`,
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
<<<<<<< HEAD
      var name = costume.costumeName;
      var picture = costume.costumePicture;
      var description = costume.costumeDescription;
      var votes = costume.costumeVotes;

      $('.page').append(`
        <div class="card" style="margin: 1rem; height: 20rem; width:20rem; display:inline-block; align:vertical-align">
          <img class="card-img-top sized" src="${picture}" alt="no photo available">
          <div class="card-block">
            <h3 class="card-title">${name}</h3>
            <p>votes: ${votes} </p>
          </div>
        </div>
   `);
=======
      var name = $('<a>').text(costume.costumeName).attr('href', `https://codaween.herokuapp.com/costumes/${costume.id}`);
      var picture = $('<img>').attr('src', costume.costumePicture);
      var description = $('<p>').text(costume.costumeDescription);
      var votes = $('<h2>').text(costume.costumeVotes);
      costumeDiv.append(name);
      costumeDiv.append(picture);
      costumeDiv.append(description);
      costumeDiv.append(votes);
      $('body').append(costumeDiv);
>>>>>>> 8a6b86d63ca6f572f6580678966870ed32a8ec45
    });
  });
};

sortCostumes();
