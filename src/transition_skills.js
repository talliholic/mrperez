class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    fetch("/vocabulary/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          item: json,
          dataLoaded: true,
        });
      });
  }

  render() {
    const { dataLoaded, item } = this.state;
    if (dataLoaded) {
      return (
        <div className="container">
          <h1>Transition Skills</h1>
          {item.topics.map((topic, i) => (
            <Topic
              key={i}
              data={item.vocab.filter((voc) => voc.context === topic)}
              topic={topic}
            />
          ))}
        </div>
      );
    }
    return <p>Data did not load</p>;
  }
}

const Topic = (props) => {
  return (
    <div className="topic">
      <h2>{props.topic}</h2>
      <a href={"sentence_practice?context=" + props.topic}>Practice</a>
      {props.data.map((structure, i) => (
        <Structure key={i} data={structure} />
      ))}
    </div>
  );
};

const Structure = (props) => {
  return (
    <div className="structure">
      <h3>{props.data.structure}</h3>
      <a href={props.data.readingQuiz}>Reading Quiz</a>
      <a href={props.data.listeningQuiz}>Listening Quiz</a>
    </div>
  );
};

ReactDOM.render(<Practice />, document.getElementById("app"));
