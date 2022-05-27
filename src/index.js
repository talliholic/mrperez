const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
require("./db/mongoose");
const userRouter = require("./routers/user");
const quizRouter = require("./routers/quiz");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
app.use(userRouter);
app.use(quizRouter);

const vocab = require("../data/vocab.json");
const projectable = require("../data/projectable.json");

app.get("/loggedin", (req, res) => {
  let loggedIn = false;
  if (req.cookies.jwt) {
    loggedIn = true;
  }
  res.send({ loggedIn });
});

app.get("", (req, res) => {
  res.render("transition_skills");
});
app.get("/sentence_practice", (req, res) => {
  res.render("sentence_practice");
});
app.get("/unscramble_word", (req, res) => {
  res.render("unscramble_word");
});
app.get("/unscramble_sentence", (req, res) => {
  res.render("unscramble_sentence");
});
app.get("/projectable", (req, res) => {
  res.render("projectable");
});
app.get("/vocab_reading_quiz", (req, res) => {
  res.render("vocab_reading_quiz");
});
app.get("/vocabulary_ref", (req, res) => {
  res.render("vocabulary");
});
app.get("/vocab_listening_quiz", (req, res) => {
  res.render("vocab_listening_quiz");
});
app.get("/paper_quiz", (req, res) => {
  res.render("paper_quiz");
});
app.get("/paper_reading", (req, res) => {
  res.render("paper_reading");
});
app.get("/unscrambled_paper", (req, res) => {
  res.render("unscrambled_paper");
});
app.get("/decoding", (req, res) => {
  res.render("decoding");
});
app.get("/tutorials", (req, res) => {
  res.render("tutorials");
});

app.get("/projectable_data", (req, res) => {
  res.send(projectable);
});

app.get("/vocab/:context", (req, res) => {
  const filteredVocab = vocab.filter(
    (item) => item.context === req.params.context
  );
  const mappedVocab = filteredVocab.map((item) => {
    return {
      ...item,
      img: [],
      audio: [],
    };
  });
  mappedVocab.forEach((item) => {
    item.words.forEach((word) => {
      if (fs.existsSync("./public/media/img_1/" + word + ".png")) {
        item.img.push("media/img_1/" + word + ".png");
      } else if (fs.existsSync("./public/media/img_1/" + word + ".jpg")) {
        item.img.push("media/img_1/" + word + ".jpg");
      }
      if (
        fs.existsSync("./public/media/audio/" + item.key + "_" + word + ".mp3")
      ) {
        item.audio.push("media/audio/" + item.key + "_" + word + ".mp3");
      }
    });
  });
  res.send(mappedVocab);
});
app.get("/vocabulary", (req, res) => {
  const topics = [...new Set(vocab.map((item) => item.context))];
  res.send({ topics, vocab });
});
app.get("/vocab_quiz/:context/:index", (req, res) => {
  const filteredVocab = vocab.filter(
    (item) => item.context === req.params.context
  );
  const mappedVocab = filteredVocab.map((item) => {
    return {
      ...item,
      img: [],
      audio: [],
    };
  });
  mappedVocab.forEach((item) => {
    item.words.forEach((word) => {
      if (fs.existsSync("./public/media/img_1/" + word + ".png")) {
        item.img.push("media/img_1/" + word + ".png");
      } else if (fs.existsSync("./public/media/img_1/" + word + ".jpg")) {
        item.img.push("media/img_1/" + word + ".jpg");
      }
      if (
        fs.existsSync("./public/media/audio/" + item.key + "_" + word + ".mp3")
      ) {
        item.audio.push("media/audio/" + item.key + "_" + word + ".mp3");
      }
    });
  });

  let vocabQuiz = {
    ...mappedVocab[req.params.index],
    other: [],
    options: [],
    sentences: [],
  };
  for (let i = 0; i < vocabQuiz.words.length; i++) {
    vocabQuiz.other[i] = [];
    vocabQuiz.options[i] = [];
    if (vocabQuiz.prefix) {
      vocabQuiz.sentences[i] =
        capFirst(vocabQuiz.words[i]) + " " + vocabQuiz.structure + ".";
    } else {
      vocabQuiz.sentences[i] =
        vocabQuiz.structure + " " + vocabQuiz.words[i] + ".";
    }
    for (let j = 0; j < vocabQuiz.words.length; j++) {
      if (j === i) {
        continue;
      }
      vocabQuiz.other[i].push(vocabQuiz.img[j]);
    }
    shuffle(vocabQuiz.other[i]);
    vocabQuiz.options[i].push(vocabQuiz.img[i]);
    for (let k = 0; k < 3; k++) {
      vocabQuiz.options[i].push(vocabQuiz.other[i][k]);
    }
    shuffle(vocabQuiz.options[i]);
  }

  res.send(vocabQuiz);
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
