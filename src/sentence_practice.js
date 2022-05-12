class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataLoaded: false,
    };
  }
  componentDidMount() {
    let searchParams = new URLSearchParams(window.location.search);
    fetch("/vocab/" + searchParams.get("context"))
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
          <h1>{items[0].context}</h1>
          <VocabItem data={items} />
        </div>
      );
    }
    return <p>Data did not load</p>;
  }
}

class VocabItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.data.map((item, i) => (
      <div className="section" id={item.structure} key={i}>
        <h2>{item.structure}</h2>
        <Words data={item} />
      </div>
    ));
  }
}

class Words extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.data.words.map((item, i) => (
      <figure className="vocab" key={i}>
        <img className="vocab_pic" src={this.props.data.img[i]} />
        <figcaption>
          <h3>{item}</h3>
        </figcaption>
        <audio controls>
          <source src={this.props.data.audio[i]} type="audio/mpeg" />
        </audio>
      </figure>
    ));
  }
}

ReactDOM.render(<Practice />, document.getElementById("app"));
