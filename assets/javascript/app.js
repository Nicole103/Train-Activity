// Initialize Firebase
var config = {
  apiKey: "AIzaSyCMGC7-jjw9YscrcVMOcJ-jnrzx33siBpU",
  authDomain: "train-scheduler-280bf.firebaseapp.com",
  databaseURL: "https://train-scheduler-280bf.firebaseio.com",
  projectId: "train-scheduler-280bf",
  storageBucket: "train-scheduler-280bf.appspot.com",
  messagingSenderId: "339430017300",
  appId: "1:339430017300:web:7f1ae948dd7ec214995a01"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding to the schedule trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFreq = $("#freq-input").val().trim();

    // object to send to firebase
  var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrain: firstTrain,
    frequency: trainFreq
  };

  // Uploads data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("A train has been scheduled!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

// Create Firebase event for adding trains to the database 
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var trainFreq = childSnapshot.val().frequency;

 
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(trainFreq);


  var firstTrainPretty = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainPretty);

  var currentTime = moment();
  console.log("current time:" + moment(currentTime).format("HH:mm"));

   // calculate the differenct between the first trian in minutes
  var diffTimeInMin = moment(currentTime).diff(moment(firstTrainPretty), "minutes");
  console.log("different time " +diffTimeInMin);

  var freqRemainingMin = diffTimeInMin % trainFreq;
  console.log("frequency remaining " +freqRemainingMin);

  var minAway = trainFreq - freqRemainingMin;
  console.log ("minutes away " +minAway);

  var nextTrain = moment().add(minAway, "minutes");
  console.log("arrival time:" +moment(nextTrain).format("HH:mm"));


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(moment(nextTrain).format("HH:mm")),
    $("<td>").text(minAway)
  );


  $("#schedule-table > tbody").append(newRow);

});

