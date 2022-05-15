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

      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          item = _this$state.item;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("h1", null, item.context), /*#__PURE__*/React.createElement("h2", {
          className: "instruction"
        }, "Look at the image and click on each letter in order to form the word."), item.words.map(function (word, i) {
          return /*#__PURE__*/React.createElement(Question, {
            key: i,
            image: item.img[i],
            word: item.words[i],
            update: _this3.updateAnswers,
            getState: _this3.getState,
            questionIndex: i
          });
        }), /*#__PURE__*/React.createElement(Check, {
          getResult: this.getState
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
      inBlank: [],
      inLetters: shuffle(_this4.props.word.split(""))
    };
    _this4.pushChar = _this4.pushChar.bind(_assertThisInitialized(_this4));
    _this4.reset = _this4.reset.bind(_assertThisInitialized(_this4));
    _this4.updateResults = _this4.updateResults.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Question, [{
    key: "updateResults",
    value: function updateResults() {
      if (this.state.inBlank.join("") === this.props.word) {
        this.props.update(this.props.questionIndex, 1);
      } else {
        this.props.update(this.props.questionIndex, 0);
      }
    }
  }, {
    key: "pushChar",
    value: function pushChar(_char, i) {
      this.state.inLetters.splice(i, 1);
      this.setState(function (prevState) {
        return {
          inBlank: prevState.inBlank.concat(_char),
          inLetters: prevState.inLetters
        };
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this5 = this;

      this.setState(function () {
        return {
          inBlank: [],
          inLetters: shuffle(_this5.props.word.split(""))
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      this.updateResults();
      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, /*#__PURE__*/React.createElement("img", {
        className: "prompt",
        src: this.props.image
      }), /*#__PURE__*/React.createElement("div", {
        className: "blank",
        "data-input": this.state.inBlank.join("")
      }, this.state.inBlank.map(function (letter, i) {
        return /*#__PURE__*/React.createElement(Letter, {
          key: i,
          letter: letter,
          inLetters: _this6.state.inLetters,
          reset: _this6.reset,
          update: _this6.props.updateAnswers,
          getState: _this6.props.getState,
          questionIndex: i,
          inBlank: _this6.state.inBlank,
          word: _this6.props.word
        });
      })), /*#__PURE__*/React.createElement("div", {
        className: "letters"
      }, this.state.inLetters.map(function (letter, i) {
        return /*#__PURE__*/React.createElement(Letter, {
          key: i,
          letter: letter,
          inLetters: _this6.state.inLetters,
          pushChar: _this6.pushChar,
          update: _this6.props.updateAnswers,
          getState: _this6.props.getState,
          questionIndex: i,
          inBlank: _this6.state.inBlank,
          word: _this6.props.word
        });
      })));
    }
  }]);

  return Question;
}(React.Component);

var Letter = /*#__PURE__*/function (_React$Component3) {
  _inherits(Letter, _React$Component3);

  var _super3 = _createSuper(Letter);

  function Letter(props) {
    var _this7;

    _classCallCheck(this, Letter);

    _this7 = _super3.call(this, props);
    _this7.pickLetter = _this7.pickLetter.bind(_assertThisInitialized(_this7));
    return _this7;
  }

  _createClass(Letter, [{
    key: "pickLetter",
    value: function pickLetter(e) {
      if (e.target.parentNode.className === "letters") {
        var blank = e.target.parentNode.previousSibling;
        this.props.pushChar(e.target.textContent, this.props.inLetters.indexOf(this.props.letter)); // if (blank.getAttribute("data-input") === this.props.word) {
        //   this.props.update(this.props.questionIndex, 1);
        //   console.log("Match");
        //   console.log(this.props.getState());
        // }
      } else {
        this.props.reset(); // this.props.update(this.props.questionIndex, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "letter",
        onClick: this.pickLetter
      }, this.props.letter);
    }
  }]);

  return Letter;
}(React.Component);

var Check = /*#__PURE__*/function (_React$Component4) {
  _inherits(Check, _React$Component4);

  var _super4 = _createSuper(Check);

  function Check(props) {
    var _this8;

    _classCallCheck(this, Check);

    _this8 = _super4.call(this, props);
    _this8.showResults = _this8.showResults.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Check, [{
    key: "showResults",
    value: function showResults() {
      var sum = this.props.getResult().reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0);
      var score = Math.round(sum * 100 / this.props.getResult().length);
      alert("You scored " + score + " points.");
      location.reload();
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
