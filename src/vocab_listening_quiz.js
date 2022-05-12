class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      dataLoaded: false,
      answers: [],
    };
    this.updateAnswers = this.updateAnswers.bind(this);
    this.getState = this.getState.bind(this);
  }

  updateAnswers(i, result) {
    this.state.answers[i] = result;
  }

  getState() {
    return this.state.answers;
  }

  componentDidMount() {
    let searchParams = new URLSearchParams(window.location.search);
    fetch(
      "/vocab_quiz/" +
        searchParams.get("context") +
        "/" +
        searchParams.get("index")
    )
      .then((res) => res.json())
      .then((json) => {
        const answers = [];
        json.words.forEach(() => {
          answers.push(0);
        });
        this.setState({
          item: json,
          dataLoaded: true,
          answers,
        });
      });
  }

  render() {
    const { dataLoaded, item } = this.state;
    if (dataLoaded) {
      return (
        <div className="container">
          <h1>{item.context}</h1>
          <h2 className="instruction">
            Listen to the sentence and click on the related image.
          </h2>
          {item.words.map((word, i) => (
            <Question
              key={i}
              sentence={item.sentences[i]}
              img={item.options[i]}
              question={item.words[i]}
              audio={item.audio[i]}
              update={this.updateAnswers}
              getState={this.getState}
              questionIndex={i}
            />
          ))}
          <Check getResult={this.getState} />
        </div>
      );
    }
    return <p>Data did not load</p>;
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.getWord = this.getWord.bind(this);
  }
  getWord(imagePath) {
    const end = imagePath.length - 4;
    return imagePath.substring(12, end);
  }
  render() {
    return (
      <div className="item">
        <audio controls>
          <source src={this.props.audio} type="audio/mpeg" />
        </audio>
        <div className="images">
          {this.props.img.map((image, i) => (
            <Image
              key={i}
              img={image}
              question={this.props.question}
              word={this.getWord(image)}
              update={this.props.update}
              getState={this.props.getState}
              questionIndex={this.props.questionIndex}
              imgIndex={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.pickImage = this.pickImage.bind(this);
  }
  pickImage(e) {
    const qIndex = e.target.getAttribute("data-qindex");
    const question = e.target.getAttribute("data-question");
    const answer = e.target.getAttribute("data-word");
    const imgIndex = e.target.getAttribute("data-imgindex");
    const parent = e.target.parentElement;
    const children = parent.childNodes;
    e.target.classList.add("selected");
    if (question === answer) {
      this.props.update(qIndex, 1);
    } else {
      this.props.update(qIndex, 0);
    }
    for (let i = 0; i < children.length; i++) {
      if (i == imgIndex) continue;
      if (children[i].classList.contains("selected")) {
        children[i].classList.remove("selected");
      }
    }
    // console.log(this.props.getState());
  }
  render() {
    return (
      <img
        onClick={this.pickImage}
        className="image"
        src={this.props.img}
        data-question={this.props.question}
        data-word={this.props.word}
        data-qindex={this.props.questionIndex}
        data-imgindex={this.props.imgIndex}
      />
    );
  }
}

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.showResults = this.showResults.bind(this);
  }
  showResults() {
    const sum = this.props
      .getResult()
      .reduce((partialSum, a) => partialSum + a, 0);
    const score = Math.round((sum * 100) / this.props.getResult().length);
    alert("You scored " + score + " points.");
    location.reload();
  }
  render() {
    return (
      <button className="show_results" onClick={this.showResults}>
        Check your answers
      </button>
    );
  }
}

ReactDOM.render(<Practice />, document.getElementById("app"));
