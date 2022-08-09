const express = require("express");
const Quiz = require("../models/quiz");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/quizzes", auth, async (req, res) => {
  const quiz = new Quiz({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await quiz.save();
    res.status(201).send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/quizzes", auth, async (req, res) => {
  try {
    await req.user.populate("quizzes");
    if (req.query.taken) {
      const taken = req.user.quizzes.some(
        (quiz) => quiz.structure === req.query.taken
      );
      if (taken) {
        const quiz = req.user.quizzes.filter(
          (quiz) => quiz.structure === req.query.taken
        );
        res.send({ taken, quiz_id: quiz[0]._id });
      }
    }
    res.send(req.user.quizzes);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/quizzes/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const quiz = await Quiz.findOne({ _id, owner: req.user._id });

    if (!quiz) {
      return res.status(404).send();
    }

    res.send(quiz);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/quizzes/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["grade"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!quiz) {
      return res.status(404).send({ error: "" });
    }

    updates.forEach((update) => (quiz[update] = req.body[update]));
    await quiz.save();
    res.send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/quizzes/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!quiz) {
      res.status(404).send();
    }

    res.send(quiz);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
