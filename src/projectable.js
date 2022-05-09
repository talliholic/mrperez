class Projectable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataLoaded: false,
    };
  }
  componentDidMount() {
    fetch("/projectable_data")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          dataLoaded: true,
        });
      });
  }
  render() {
    const { dataLoaded, items } = this.state;
    if (dataLoaded) {
      return (
        <div className="container">
          {items.map((item, i) => (
            <Lesson key={i} data={item} />
          ))}
        </div>
      );
    }
    return <p>Data did not load</p>;
  }
}

class Lesson extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="lesson">
        <h1>{this.props.data.question}</h1>
        <h3>
          <i>{this.props.data.textbook}</i>
        </h3>
        <h2>Instructions</h2>
        {this.props.data.instructions.map((instruction, i) => (
          <Instruction className="instruction" key={i} data={instruction} />
        ))}
      </div>
    );
  }
}

class Instruction extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul>
        <li>{this.props.data.command}</li>
        {this.props.data.resource && (
          <a target="_blank" href={this.props.data.resource}>
            Resource
          </a>
        )}
      </ul>
    );
  }
}

ReactDOM.render(<Projectable />, document.getElementById("app"));
