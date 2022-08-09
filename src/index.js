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

app.use(userRouter);
app.use(quizRouter);

const vocab = require("../data/vocab.json");
const projectable = require("../data/projectable.json");
const messages = require("../data/messages.json");
const vocales = require("../data/vocales.json");
const odd = require("../data/odd.json");
const examples = require("../data/examples.json");
const quizData = require("../data/quiz.json");

app.get("/loggedin", (req, res) => {
  let loggedIn = false;
  if (req.cookies.jwt) {
    loggedIn = true;
  }
  res.send({ loggedIn });
});

app.get("", (req, res) => {
  res.render("section");
});
app.get("/transition", (req, res) => {
  res.redirect("../");
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
app.get("/unscrambled_paper_phrase", (req, res) => {
  res.render("unscrambled_paper_phrase");
});
app.get("/decoding", (req, res) => {
  res.render("decoding");
});
app.get("/tutorials", (req, res) => {
  res.render("tutorials");
});
app.get("/messages", (req, res) => {
  res.render("messages");
});
app.get("/typing", (req, res) => {
  res.render("typing");
});
app.get("/math-quizzes", (req, res) => {
  res.render("math-quizzes");
});
app.get("/math", (req, res) => {
  res.render("math");
});
app.get("/match", (req, res) => {
  res.render("match");
});
app.get("/vocales", (req, res) => {
  res.render("vocales");
});
app.get("/odd", (req, res) => {
  res.render("odd");
});
app.get("/results", (req, res) => {
  res.render("see-results");
});
app.get("/section", (req, res) => {
  res.render("section", { section: req.query.topic });
});
app.get("/quiz", (req, res) => {
  res.render("quiz", { section: req.query.topic });
});
app.get("/exams", (req, res) => {
  res.render("exams", { section: req.query.topic });
});
app.get("/quiz-data", (req, res) => {
  if (req.query.title) {
    const filteredData = quizData.filter(
      (quiz) => quiz.title === req.query.title
    );
    res.json(filteredData[0]);
  } else {
    res.json(quizData);
  }
});
app.get("/load-messages", (req, res) => {
  res.json(messages);
});

app.get("/projectable_data", (req, res) => {
  res.send(projectable);
});
app.get("/examples", (req, res) => {
  res.render("examples");
});
app.get("/get-examples", (req, res) => {
  res.json(examples);
});

app.get("/cargar-vocales/:title", (req, res) => {
  const filteredVocales = vocales.filter(
    (juego) => juego.título === req.params.title
  );
  res.json(filteredVocales[0]);
});
app.get("/load-odd/:title", (req, res) => {
  const filteredOdd = odd.filter((sounds) => sounds.title === req.params.title);
  res.json(filteredOdd[0]);
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
    }
    if (vocabQuiz.double && vocabQuiz.prefix && !vocabQuiz.middle) {
      vocabQuiz.sentences[i] =
        capFirst(vocabQuiz.words[i]) +
        " " +
        vocabQuiz.structure +
        " " +
        vocabQuiz.complement[i] +
        ".";
    } else if (vocabQuiz.double && !vocabQuiz.prefix && !vocabQuiz.middle) {
      vocabQuiz.sentences[i] =
        capFirst(vocabQuiz.complement[i]) + " " + vocabQuiz.words[i] + ".";
    } else if (vocabQuiz.prefix && !vocabQuiz.middle) {
      vocabQuiz.sentences[i] =
        capFirst(vocabQuiz.words[i]) + " " + vocabQuiz.structure + ".";
    } else if (vocabQuiz.middle) {
      vocabQuiz.sentences[i] =
        vocabQuiz.structure +
        " " +
        vocabQuiz.complement[i] +
        " " +
        vocabQuiz.words[i] +
        ".";
    } else if (vocabQuiz.triple || vocab.prefix) {
      vocabQuiz.sentences[i] =
        vocabQuiz.structure +
        " " +
        vocabQuiz.words[i] +
        " " +
        vocabQuiz.complement[i] +
        ".";
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

  const vocabo = { ...vocabQuiz, words: [], vocabu: vocabQuiz.words };
  vocabQuiz.words.forEach((word) => {
    if (vocabQuiz.wordQuiz) {
      if (word.split(" ").length === 2) {
        vocabo.words.push(word.split(" ")[1]);
      } else {
        vocabo.words.push(word);
      }
    } else {
      vocabo.words.push(word);
    }
  });

  res.send(vocabo);
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
