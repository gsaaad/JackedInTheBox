const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Workout, User } = require("../../models");

// get all workouts, similar to SELECT * FROM workouts;

router.get("/", withAuth, (req, res) => {
  Workout.findAll({
    where: {
      user_id: req.session.user_id,
    },
    order: [["date", "ASC"]],
  })
    .then((workoutData) => res.json(workoutData))
    .catch((err) => {
      console.log(
        err,
        "There was a problem with getting all workouts.. Try again!"
      );
    });
});

// GET WORKOUT BY ID, similar to SELECT * FROM workouts, where id = ?
router.get("/:id", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((workoutData) => {
      if (!workoutData) {
        res.status(404).json({
          message: "There's no workout found with this ID, Try Again...",
        });
      }
      res.json(workoutData);
    })
    .catch((err) => {
      console.log(
        err,
        "There was an error in getting a single workout ID, Try again"
      );
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // expect name, date, goal, sequence, muscleGroup, equipment
  Workout.create({
    name: req.body.name,
    date: req.body.date,
    goal: req.body.goal,
    sequence: req.body.sequence,
    muscleGroup: req.body.muscleGroup,
    user_id: req.session.user_id,
  })
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      console.log(err, "There was an error in creating/POST new workout");
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Workout.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((workoutData) => {
      if (!workoutData) {
        res
          .status(404)
          .json({ message: "No workout found with this ID, Try again..." });
      }
      res.json(workoutData);
    })
    .catch((err) => {
      console.log(err, "There was an error in UPDATING/PUT workouts");
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Workout.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((workoutData) => {
      if (!workoutData) {
        res
          .status(404)
          .json({ message: "There is no user with this ID.. Try again" });
      }
      res.json(workoutData);
    })
    .catch((err) => {
      console.log(err, "There was a problem with deleting a workout");
      res.status(500).json(err);
    });
});

module.exports = router;
