var topics = ["Dog","Cat","Squirrel","Monkey","Elephant","Giraffe","Lion","Tiger",
"Wolf","Bear","Panda","Fox", "Red Panda",];
var extraTopics = [];

$(window).on("load", function(){
    displayButtons();
    playGif();
    addTopic();
})

function displayButtons() {
    // target display class element
    $(".display").empty();
    // loops through current length of topics array
    for (var i = 0; i < topics.length; i++) {
        // prepares buttons from current array
        var topicButtons = $('<button>').addClass('topic-button').attr("data-animal", topics[i]).text(topics[i]);
        // appends buttons
        $('.buttons').append(topicButtons);
    }
}
function addTopic() {
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newTopics = $("#animal-input").val().trim();
        topics.push(newTopics);
        $('#animal-input').val("");
        newTopics = $('<button>').addClass('topic-button').attr("data-animal", newTopics).text(newTopics)
        $(".buttons").append(newTopics);
    });
}
$(document).on("click", ".topic-button", displayGifs);



function displayGifs() {
    var animal = $(this).text();
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

          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("gif-still", results[i].images.fixed_height_still.url);
          animalImage.attr("gif-animate", results[i].images.fixed_height.url);
          animalImage.attr("gif-state", "still")
          animalImage.addClass("gif");

          gifDiv.append(p);
          gifDiv.prepend(animalImage);
          $("#animalsGif").prepend(gifDiv);
        }
      });
}


function playGif() {
    $(".gif").on("click", function() {
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