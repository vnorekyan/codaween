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
    });
  });
};

sortCostumes();
