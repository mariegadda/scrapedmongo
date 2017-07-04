// modal function:
$(document).ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

  
});

//show the comments when you click on the comments div on each card
$(document).on("click", "#comments", function(){

	var thisId =$(this).attr("data-id");
	var appendTo=$(this);

	console.log(thisId);
   $.ajax({
    method: "GET",
    url: "/scrape/" + thisId
  })
    // adds the note information to the page
    .done(function(data) {
      console.log(data);
      $(appendTo).append("<p>"+ data.note.name +"</p>");
       $(appendTo).append("<p>"+ data.note.body +"</p>");
      // $(this).append("<p>" + data.body + "</p>");
      // if (data.comments) {
      //  	$("#titleinput").val(data.comments.title);
      //   $("#bodyinput").val(data.comments.body);
      // }
    });
});




$(document).on("click", "#addnote", function() {
    // on the addnote button, save the id number of that document and give it to 
    //a div inside of the modal, so it can be called from the modal submit button. 
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    $("#iddiv").attr("data-id", thisId);
});

$(document).on("click", "#savenote", function() {
    //  capture the id of the mongo document this comment refers to.
    var thisId = $("#iddiv").attr("data-id");
    console.log(thisId);
    // grabs the id associated with the article from the submit button

    // runs a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/scrape/" + thisId,
            data: {
                // captures  from title input
                name: $("#name").val(),
                // takes values from note textarea
                body: $("#textarea1").val()
            }
        })
        .done(function(data) {
            // logs the response
            console.log(data);
            // empties the notes section
            $("#textarea1").empty();
        });
});
