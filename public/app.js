// modal function:
$(document).ready(function() {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();  
});

//show the comments when you click on the comments div on each card
$(document).on("click", "#comments", function(){
	var thisId =$(this).attr("data-id");
	var theTrackCard=$(this);
	console.log(thisId);
   $.ajax({
    method: "GET",
    url: "/scrape/" + thisId
  })
    // adds the note information to the page
    .done(function(data) {
      console.log(data);
      // need to make some kind of for loop here
      $(theTrackCard).html("<p>"+ data.note.name +" says:" + "</p>" +"<p>"+ data.note.body+"<a data-noteid=" +data.note._id+ " data-id="+ data._id +" id='delete' class='btn-floating btn-small waves-effect waves-light red right-align right'>"+ "<i class='material-icon'>" +"-" +"</i></a>" +"</p>" );
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
            $("#name").empty();
        });
});

//button click function for removing a comment
$(document).on("click", "#delete", function(){
	//id of the track
	var thisId =$(this).attr("data-id");
	//id of the note
	var noteId =$(this).attr("data-noteid");
	console.log("regular " + thisId);
	console.log("note "+ noteId );
	//this just makes a blank comment, not exactly what I want it to do
	//GET HELP WITH THIS!

	//something to do with on the routes page making a post request for a delete path,
	//and using the request body to find the note to delete, using $pull to remove the note
	//put the note id in the ajax data??
	$.ajax({
		method: "POST",
		url: "scrape/" + thisId,
		data: {
			name: " ",
			body: " "
		}
	})
	.done(function(data){
		console.log(data);
	});
});



$(document).on("click", "#savetrack", function() {
    //  capture the id of the mongo document this button refers to.
    var thisId = $(this).attr("data-id");
    //grabs the id associated with the article from the save button
    //runs a POST request to change the saved to true
    $.ajax({
            method: "POST",
            url: "/saved/" + thisId,
            data: {
                saved: true
            }
        })
        .done(function(data) {
            // logs the response
            console.log(data);
           
        });
});














