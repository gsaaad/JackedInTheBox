//for Giphy/Exercise
var gifButton = $("#gifButton");
var searchedMuscle = $("#searchedMuscle");
var exerciseName = $("#exercise-name");
var exerciseBP = $("#exercise-bodyPart");
var exerciseTarget = $("#exercise-target");
var exerciseGiphy = $("#exercise-giphy");
var exerciseEquipment = $("#exercise-equipment");
var muscleGroupsArr = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
];

// for login Forum
var nameOfUser = $("name");
var lastName = $("lastname");
var emailOfUser = $("email");
var formButton = $("registerBtn");

gifButton.on("click", function () {
  var userEventText = searchedMuscle.val();
  console.log(userEventText);

  // checking input for lowercase, user may put ABS, and it becomes invalid..
  if (muscleGroupsArr.includes(userEventText.toLowerCase())) {
    console.log("There is a match!");
    // run fetch call with user's input

    const fetchExercises = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "204482477cmshdd6f520fedecd46p1ea1fbjsne7e8a3e634f6",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    fetch(
      "https://exercisedb.p.rapidapi.com/exercises/target/" + userEventText,
      fetchExercises
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("All Exercises: ", response);
        const allExercises = response;
        const lengthOfExercises = allExercises.length;
        const randomNum = Math.floor(Math.random() * lengthOfExercises);
        const randomExercise = allExercises[randomNum];
        console.log(randomExercise);

        // Exercise properties from random exercise
        const exerciseName = randomExercise.name;
        const exerciseBodyPart = randomExercise.bodyPart;
        const exerciseEquipment = randomExercise.equipment;
        const exerciseGIF = randomExercise.gifUrl;

        // Target display
        var exerciseNameDisplay = $("#exercise-name");
        var exerciseBPDisplay = $("#exercise-bodyPart");
        var exerciseTargetDisplay = $("#exercise-target");
        var exerciseGiphyDisplay = $("#exercise-giphy");
        var exerciseEquipmentDisplay = $("#exercise-equipment");

        // assign display to new data
        exerciseNameDisplay[0].innerHTML = `Exercise Name: ${exerciseName}`;
        exerciseBPDisplay[0].innerHTML = `Main body part: ${userEventText}`;
        exerciseTargetDisplay[0].innerHTML = `Target muscle: ${exerciseBodyPart}`;
        exerciseGiphyDisplay[0].src = exerciseGIF;
        exerciseEquipmentDisplay[0].innerHTML = `Equipment: ${exerciseEquipment}`;
      })
      .catch((err) => console.error(err));
  } else {
    console.error(
      "Could not find this muscle group... Try one of the following"
    );
    console.error(muscleGroupsArr);
    alert("Could not find this muscle group... Try one of the following");
    alert(muscleGroupsArr);
  }
});
