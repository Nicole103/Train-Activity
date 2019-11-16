// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCMGC7-jjw9YscrcVMOcJ-jnrzx33siBpU",
    authDomain: "train-scheduler-280bf.firebaseapp.com",
    databaseURL: "https://train-scheduler-280bf.firebaseio.com",
    projectId: "train-scheduler-280bf",
    storageBucket: "train-scheduler-280bf.appspot.com",
    messagingSenderId: "339430017300",
    appId: "1:339430017300:web:7f1ae948dd7ec214995a01"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

$("#submitbtn").on("click",function(event){
    
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var firstTrain = moment($("#train-time-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var trainFreq = $("#train-frequency-input").val().trim();
 

    var newTrain = {
        name: trainName,
        destination: trainDest,
        frequency: trainFreq,
        firstTrain: firstTrain,
    }

    database.ref().push(newTrain);

    alert("New Train Scheduled!");

    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");

    return false;

});

database.ref().on("child_added", function(snapshot){

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("HH:mm");
    
    $("#trainScheduleTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");


});


