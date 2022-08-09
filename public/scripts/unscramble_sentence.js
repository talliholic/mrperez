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
      loaded: false,
      data: [],
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
          loaded: true,
          data: json,
          answers: answers
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var searchParams = new URLSearchParams(window.location.search);

      if (this.state.loaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "practice"
        }, /*#__PURE__*/React.createElement("h1", null, this.state.data.vocab), /*#__PURE__*/React.createElement("h2", {
          className: "instruction"
        }, "Look at the image and click on each word to make a sentence. Check your answers at the bottom."), this.state.data.img.map(function (img, i) {
          return /*#__PURE__*/React.createElement(Question, {
            key: i,
            i: i,
            img: img,
            sentence: _this3.state.data.sentences[i],
            update: _this3.updateAnswers
          });
        }), /*#__PURE__*/React.createElement(Check, {
          getResult: this.getState,
          data: this.state.data,
          path: "unscramble_sentence?context=" + searchParams.get("context") + "&index=" + searchParams.get("index")
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
    _this4.state = {
      unscramble: [],
      words: shuffle(_this4.props.sentence.split(" "))
    };
    _this4.moveword = _this4.moveword.bind(_assertThisInitialized(_this4));
    _this4.reset = _this4.reset.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Question, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.unscramble !== this.state.unscramble) {
        if (this.props.sentence == this.state.unscramble.join(" ")) {
          this.props.update(this.props.i, 1);
        } else {
          this.props.update(this.props.i, 0);
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this5 = this;

      this.setState(function (prevState) {
        return {
          unscramble: [],
          words: shuffle(_this5.props.sentence.split(" "))
        };
      });
    }
  }, {
    key: "moveword",
    value: function moveword(word, i) {
      this.state.words.splice(i, 1);
      this.setState(function (prevState) {
        return {
          unscramble: prevState.unscramble.concat(word),
          words: prevState.words
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "question"
      }, /*#__PURE__*/React.createElement("img", {
        className: "image",
        src: this.props.img
      }), /*#__PURE__*/React.createElement("div", {
        className: "unscrambled",
        onClick: function onClick() {
          return _this6.reset();
        }
      }, this.state.unscramble.join(" ")), /*#__PURE__*/React.createElement("div", {
        className: "scrambled"
      }, this.state.words.map(function (word, i) {
        return /*#__PURE__*/React.createElement(Word, {
          moveword: _this6.moveword,
          i: i,
          key: i,
          word: word
        });
      })));
    }
  }]);

  return Question;
}(React.Component);

var Word = /*#__PURE__*/function (_React$Component3) {
  _inherits(Word, _React$Component3);

  var _super3 = _createSuper(Word);

  function Word(props) {
    _classCallCheck(this, Word);

    return _super3.call(this, props);
  }

  _createClass(Word, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      return /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          return _this7.props.moveword(_this7.props.word, _this7.props.i);
        },
        className: "word"
      }, this.props.word);
    }
  }]);

  return Word;
}(React.Component);

var Check = /*#__PURE__*/function (_React$Component4) {
  _inherits(Check, _React$Component4);

  var _super4 = _createSuper(Check);

  function Check(props) {
    var _this8;

    _classCallCheck(this, Check);

    _this8 = _super4.call(this, props);
    _this8.showResults = _this8.showResults.bind(_assertThisInitialized(_this8));
    _this8.state = {
      loggedIn: false,
      quizzes: []
    };
    return _this8;
  }

  _createClass(Check, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this9 = this;

      fetch("/loggedin").then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.loggedIn) {
          _this9.setState(function (prevState) {
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
      var _this10 = this;

      if (prevState.loggedIn !== this.state.loggedIn) {
        fetch("/quizzes").then(function (res) {
          return res.json();
        }).then(function (json) {
          _this10.setState(function () {
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
      var _this11 = this;

      var type = "Unscramble the Sentence";
      var sum = this.props.getResult().reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0);
      var score = Math.round(sum * 100 / this.props.getResult().length);
      var taken = this.state.quizzes.filter(function (quiz) {
        return quiz.context === _this11.props.data.context && quiz.structure === _this11.props.data.vocab && quiz.type === type;
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

function shuffle(array) {
  var currentIndex = array.length,
      randomIndex; // While there remain elements to shuffle.

  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.

    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }

  return array;
}
