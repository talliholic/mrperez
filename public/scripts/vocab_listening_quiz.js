"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Practice = /*#__PURE__*/function (_React$Component) {
  _inherits(Practice, _React$Component);

  var _super = _createSuper(Practice);

  function Practice(props) {
    var _this;

    _classCallCheck(this, Practice);

    _this = _super.call(this, props);
    _this.state = {
      item: [],
      dataLoaded: false,
      answers: []
    };
    _this.updateAnswers = _this.updateAnswers.bind(_assertThisInitialized(_this));
    _this.getState = _this.getState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Practice, [{
    key: "updateAnswers",
    value: function updateAnswers(i, result) {
      this.state.answers[i] = result;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state.answers;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var searchParams = new URLSearchParams(window.location.search);
      fetch("/vocab_quiz/" + searchParams.get("context") + "/" + searchParams.get("index")).then(function (res) {
        return res.json();
      }).then(function (json) {
        var answers = [];
        json.words.forEach(function () {
          answers.push(0);
        });

        _this2.setState({
          item: json,
          dataLoaded: true,
          answers: answers
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var searchParams = new URLSearchParams(window.location.search);
      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          item = _this$state.item;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("h1", null, item.vocab), /*#__PURE__*/React.createElement("h2", {
          className: "instruction"
        }, "Listen to the sentence and click on the related image."), item.vocabu.map(function (word, i) {
          return /*#__PURE__*/React.createElement(Question, {
            key: i,
            sentence: item.sentences[i],
            img: item.options[i],
            question: item.vocabu[i],
            audio: item.audio[i],
            update: _this3.updateAnswers,
            getState: _this3.getState,
            questionIndex: i
          });
        }), /*#__PURE__*/React.createElement(Check, {
          getResult: this.getState,
          data: item,
          path: "vocab_listening_quiz?context=" + searchParams.get("context") + "&index=" + searchParams.get("index")
        }));
      }

      return /*#__PURE__*/React.createElement("p", null, "Data did not load");
    }
  }]);

  return Practice;
}(React.Component);

var Question = /*#__PURE__*/function (_React$Component2) {
  _inherits(Question, _React$Component2);

  var _super2 = _createSuper(Question);

  function Question(props) {
    var _this4;

    _classCallCheck(this, Question);

    _this4 = _super2.call(this, props);
    _this4.getWord = _this4.getWord.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Question, [{
    key: "getWord",
    value: function getWord(imagePath) {
      var end = imagePath.length - 4;
      return imagePath.substring(12, end);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, /*#__PURE__*/React.createElement("audio", {
        controls: true
      }, /*#__PURE__*/React.createElement("source", {
        src: this.props.audio,
        type: "audio/mpeg"
      })), /*#__PURE__*/React.createElement("div", {
        className: "images"
      }, this.props.img.map(function (image, i) {
        return /*#__PURE__*/React.createElement(Image, {
          key: i,
          img: image,
          question: _this5.props.question,
          word: _this5.getWord(image),
          update: _this5.props.update,
          getState: _this5.props.getState,
          questionIndex: _this5.props.questionIndex,
          imgIndex: i
        });
      })));
    }
  }]);

  return Question;
}(React.Component);

var Image = /*#__PURE__*/function (_React$Component3) {
  _inherits(Image, _React$Component3);

  var _super3 = _createSuper(Image);

  function Image(props) {
    var _this6;

    _classCallCheck(this, Image);

    _this6 = _super3.call(this, props);
    _this6.pickImage = _this6.pickImage.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(Image, [{
    key: "pickImage",
    value: function pickImage(e) {
      var qIndex = e.target.getAttribute("data-qindex");
      var question = e.target.getAttribute("data-question");
      var answer = e.target.getAttribute("data-word");
      var imgIndex = e.target.getAttribute("data-imgindex");
      var parent = e.target.parentElement;
      var children = parent.childNodes;
      e.target.classList.add("selected");

      if (question === answer) {
        this.props.update(qIndex, 1);
      } else {
        this.props.update(qIndex, 0);
      }

      for (var i = 0; i < children.length; i++) {
        if (i == imgIndex) continue;

        if (children[i].classList.contains("selected")) {
          children[i].classList.remove("selected");
        }
      } // console.log(this.props.getState());

    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("img", {
        onClick: this.pickImage,
        className: "image",
        src: this.props.img,
        "data-question": this.props.question,
        "data-word": this.props.word,
        "data-qindex": this.props.questionIndex,
        "data-imgindex": this.props.imgIndex
      });
    }
  }]);

  return Image;
}(React.Component);

var Check = /*#__PURE__*/function (_React$Component4) {
  _inherits(Check, _React$Component4);

  var _super4 = _createSuper(Check);

  function Check(props) {
    var _this7;

    _classCallCheck(this, Check);

    _this7 = _super4.call(this, props);
    _this7.showResults = _this7.showResults.bind(_assertThisInitialized(_this7));
    _this7.state = {
      loggedIn: false,
      quizzes: []
    };
    return _this7;
  }

  _createClass(Check, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this8 = this;

      fetch("/loggedin").then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.loggedIn) {
          _this8.setState(function (prevState) {
            return {
              loggedIn: true,
              quizzes: []
            };
          });
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this9 = this;

      if (prevState.loggedIn !== this.state.loggedIn) {
        fetch("/quizzes").then(function (res) {
          return res.json();
        }).then(function (json) {
          _this9.setState(function () {
            return {
              loggedIn: true,
              quizzes: json
            };
          });
        });
      }
    }
  }, {
    key: "showResults",
    value: function showResults() {
      var _this10 = this;

      var type = "Listening Quiz";
      var sum = this.props.getResult().reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0);
      var score = Math.round(sum * 100 / this.props.getResult().length);
      var taken = this.state.quizzes.filter(function (quiz) {
        return quiz.context === _this10.props.data.context && quiz.structure === _this10.props.data.vocab && quiz.type === type;
      });

      if (taken.length > 0) {
        fetch("/quizzes/" + taken[0]._id, {
          method: "PATCH",
          body: JSON.stringify({
            grade: score
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          return console.log(json);
        });
      } else {
        fetch("/quizzes/", {
          method: "POST",
          body: JSON.stringify({
            context: this.props.data.context,
            structure: this.props.data.vocab,
            type: type,
            path: this.props.path,
            grade: score
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          return console.log(json);
        });
      }

      alert("You scored " + score + " points.");
      window.location.href = "section?subject=Language&topic=" + this.props.data.vocab;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        className: "show_results",
        onClick: this.showResults
      }, "Check your answers");
    }
  }]);

  return Check;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Practice, null), document.getElementById("app"));
