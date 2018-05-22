var topics = ["Dog","Cat","Squirel","Monkey","Elephant","Giraffe","Lion","Tiger",
"Wolf","Bear","Panda","Fox", "Red Panda",];
var extraTopics = [];

$(window).on("load", function(){
    displayButtons();
    playGif();
    addTopic();
})

function displayButtons() {
    $(".display").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButtons = $('<button>').addClass('topic-button').attr("data-animal", topics[i]).text(topics[i]);
        $('.buttons').append(topicButtons);
    }
}
function addTopic() {
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newTopics = $("#animal-input").val().trim();
        topics.push(newTopics);
        $('#animal-input').val("");
        displayButtons();
    });
}
$(document).on("click", ".topic-button", displayGifs);



function displayGifs() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animalImage = $("<img>");

          animalImage.attr("src", results[i].images.fixed_height.url);
          animalImage.attr("gif-still", results[i].images.fixed_height.url);
          animalImage.attr("gif-animate", results[i].images.fixed_height.url);
          animalImage.attr("gif-state", "still")
          animalImage.attr("image-gif");

          gifDiv.append(p);
          gifDiv.prepend(animalImage);
          $("#animalsGif").prepend(gifDiv);
        }
      });
}


function playGif() {
    $("body").on("click", ".image-gif", function() {
        var state = $(this).attr("gif-state")
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("gif-animate"));
            $(this).attr("gif-state", "animate");
        }
        else {
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
        }
        });
}