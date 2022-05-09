const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

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
app.use(express.urlencoded({ extended: true }));

const vocab = require("../data/vocab.json");
const projectable = require("../data/projectable.json");

app.get("/sentence_practice", (req, res) => {
  res.render("sentence_practice");
});
app.get("/projectable", (req, res) => {
  res.render("projectable");
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

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
