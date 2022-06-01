"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var searchParams = new URLSearchParams(window.location.search);
var topic = searchParams.get("topic");

var Quiz = /*#__PURE__*/function (_React$Component) {
  _inherits(Quiz, _React$Component);

  var _super = _createSuper(Quiz);

  function Quiz(props) {
    var _this;

    _classCallCheck(this, Quiz);

    _this = _super.call(this, props);
    _this.state = {
      answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.score = _this.score.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Quiz, [{
    key: "score",
    value: function score() {
      return Math.round(this.state.answers.reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0) / this.state.answers.length * 100);
    }
  }, {
    key: "update",
    value: function update(i, result) {
      this.setState(function (prevState) {
        prevState.answers[i] = result;
        return _objectSpread({}, prevState);
      });
    }
  }, {
    key: "render",
    value: function render() {
      switch (topic) {
        case "doubles":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Doubles, {
            update: this.update,
            score: this.score
          }));

        default:
          return /*#__PURE__*/React.createElement("div", null, "No topic set");
      }
    }
  }]);

  return Quiz;
}(React.Component);

var Doubles = /*#__PURE__*/function (_React$Component2) {
  _inherits(Doubles, _React$Component2);

  var _super2 = _createSuper(Doubles);

  function Doubles(props) {
    var _this2;

    _classCallCheck(this, Doubles);

    _this2 = _super2.call(this, props);
    _this2.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return _this2;
  }

  _createClass(Doubles, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Doubles"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to solve the addition sentences."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Double, {
          key: i,
          i: i,
          addend: addend,
          update: _this3.props.update,
          score: _this3.props.score
        });
      }));
    }
  }]);

  return Doubles;
}(React.Component);

var Double = /*#__PURE__*/function (_React$Component3) {
  _inherits(Double, _React$Component3);

  var _super3 = _createSuper(Double);

  function Double(props) {
    var _this4;

    _classCallCheck(this, Double);

    _this4 = _super3.call(this, props);
    _this4.check = _this4.check.bind(_assertThisInitialized(_this4));
    _this4.answer = _this4.props.addend + _this4.props.addend;
    _this4.state = {
      correct: false,
      started: false
    };
    _this4.quizzes = [];
    _this4.processResult = _this4.processResult.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Double, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.processResult();
      }
    }
  }, {
    key: "processResult",
    value: function processResult() {
      var _this5 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this5.quizzes = json;
        var type = "Adding";

        var score = _this5.props.score();

        var taken = [];

        if (_this5.quizzes.length > 0) {
          taken = _this5.quizzes.filter(function (quiz) {
            return quiz.context === cap(searchParams.get("topic")) && quiz.structure === "Math" && quiz.type === type;
          });
        }

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
              context: cap(searchParams.get("topic")),
              structure: "Math",
              type: type,
              path: "math-quizzes?topic=" + searchParams.get("topic"),
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
      });
    }
  }, {
    key: "check",
    value: function check(e) {
      var value = e.target.value;

      if (value == this.answer) {
        this.setState(function (prev) {
          return {
            started: true,
            correct: true
          };
        });
        this.props.update(this.props.i, 1);
      } else {
        this.setState(function (prev) {
          return {
            started: true,
            correct: false
          };
        });
        this.props.update(this.props.i, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend, "", " +", "", " ", this.props.addend, " =", " "), /*#__PURE__*/React.createElement("input", {
        onChange: this.check,
        type: "number"
      }), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Double;
}(React.Component);

var Score = function Score(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "score"
  }, "Score: ", props.score());
};

ReactDOM.render( /*#__PURE__*/React.createElement(Quiz, null), document.getElementById("app"));

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

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
