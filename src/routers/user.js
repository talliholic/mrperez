const express = require("express");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendmail = require("../email/sendgrid");

const users = (filter = {}) => {
  return new Promise((res, rej) => {
    try {
      res(User.find(filter));
    } catch (error) {
      rej(error);
    }
  });
};
const quizzes = () => {
  return new Promise((res, rej) => {
    try {
      res(Quiz.find());
    } catch (error) {
      rej(error);
    }
  });
};

router.get("/loginuser", (req, res) => {
  res.render("loginuser");
});

router.get("/leaderboard", auth, async (req, res) => {
  let userss = await users();
  if (req.query.me) {
    userss = await users({ _id: req.user.id });
  }
  const quizzess = await quizzes();
  const usersQuizzes = userss.map((user) => {
    return {
      user,
      quizzes: quizzess.filter(
        (quiz) => quiz.owner.toString() === user._id.toString()
      ),
    };
  });
  let leaderboard = usersQuizzes.map((user) => {
    return {
      user: user.user.name + " " + user.user.lastname,
      totalScore: user.quizzes
        .map((quiz) => quiz.grade)
        .reduce((partialSum, a) => partialSum + a, 0),
      quizzes: user.quizzes.map((quiz) => {
        return {
          context: quiz.context,
          structure: quiz.structure,
          type: quiz.type,
          score: quiz.grade,
        };
      }),
    };
  });

  leaderboard = leaderboard.sort((a, b) => {
    return b.totalScore - a.totalScore;
  });

  try {
    res.send(leaderboard);
  } catch (error) {
    res.send(e);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "There was an error" });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, { httpOnly: true });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "There was an error" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "You've been logged out!" });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "You've been logged out of all devices!" });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/forgot-password", (req, res, next) => {
  res.render("forgot-password");
});

router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const link =
      "https://mrperez.herokuapp.com/reset-password/" + user._id + "/" + token;
    sendmail(user.email, link);

    res.send(
      "<h2>A link to reset your password has been sent to the email registered. The link is valid for 15 minutes.</h2>"
    );
  } catch (e) {
    res.send("<h2>User not found. Go back</h2>");
  }
});

router.get("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    jwt.verify(token, process.env.JWT_SECRET);
    res.render("reset-password", { email: user.email });
  } catch (e) {
    res.send("<h2>Link has expired!</h2>");
  }
});
router.post("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  let { password, password2 } = req.body;
  if (password !== password2) {
    return res.send("<h2>Passwords do not match! Go back.</h2>");
  }
  try {
    password = await bcrypt.hash(password, 8);
    const user = await User.findOne({ _id: id });
    jwt.verify(token, process.env.JWT_SECRET);
    await User.findOneAndUpdate({ _id: id }, { password });
    res.send(
      '<h2>Password has been reset! <br /><a href="/loginuser">Log in</a></h2>'
    );
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
