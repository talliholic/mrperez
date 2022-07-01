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
    _this.processResult = _this.processResult.bind(_assertThisInitialized(_this));
    _this.check = _this.check.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Quiz, [{
    key: "processResult",
    value: function processResult(quizzes, type) {
      var _this2 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (json) {
        quizzes = json;

        var score = _this2.score();

        var taken = [];

        if (quizzes.length > 0) {
          taken = quizzes.filter(function (quiz) {
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
    value: function check(e, answer, i, correct, incorrect) {
      var value = e.target.value;

      if (value == answer) {
        correct();
        this.update(i, 1);
      } else {
        incorrect();
        this.update(i, 0);
      }
    }
  }, {
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
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "doubles Missing":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(DoublesM, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add one digit to three":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Add1dto3, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add one digit to six":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Add1dto6, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add one digit to nine":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Add1dto9, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add ten more":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Add10more, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "subtract ten less":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Sub10less, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add to ten":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(Addtoten, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add to a ten":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(AddtoAten, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "add ten to any":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(AddtotenAny, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
          }));

        case "sub ten to any":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Score, {
            score: this.score
          }), /*#__PURE__*/React.createElement(SubtotenAny, {
            update: this.update,
            score: this.score,
            processResult: this.processResult,
            check: this.check
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
    var _this3;

    _classCallCheck(this, Doubles);

    _this3 = _super2.call(this, props);
    _this3.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return _this3;
  }

  _createClass(Doubles, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Doubles"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to solve the addition sentences."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Double, {
          key: i,
          i: i,
          addend: addend,
          update: _this4.props.update,
          score: _this4.props.score,
          processResult: _this4.props.processResult,
          check: _this4.props.check
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
    var _this5;

    _classCallCheck(this, Double);

    _this5 = _super3.call(this, props);
    _this5.answer = _this5.props.addend + _this5.props.addend;
    _this5.state = {
      correct: false,
      started: false
    };
    _this5.quizzes = [];
    return _this5;
  }

  _createClass(Double, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Doubles");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend, "", " +", "", " ", this.props.addend, " =", " "), /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this6.props.check(e, _this6.answer, _this6.props.i, function () {
            return _this6.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this6.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
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

var DoublesM = /*#__PURE__*/function (_React$Component4) {
  _inherits(DoublesM, _React$Component4);

  var _super4 = _createSuper(DoublesM);

  function DoublesM(props) {
    var _this7;

    _classCallCheck(this, DoublesM);

    _this7 = _super4.call(this, props);
    _this7.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return _this7;
  }

  _createClass(DoublesM, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Doubles"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to write the missing number that solves the double."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(DoubleM, {
          key: i,
          i: i,
          addend: addend,
          update: _this8.props.update,
          score: _this8.props.score,
          processResult: _this8.props.processResult,
          check: _this8.props.check
        });
      }));
    }
  }]);

  return DoublesM;
}(React.Component);

var DoubleM = /*#__PURE__*/function (_React$Component5) {
  _inherits(DoubleM, _React$Component5);

  var _super5 = _createSuper(DoubleM);

  function DoubleM(props) {
    var _this9;

    _classCallCheck(this, DoubleM);

    _this9 = _super5.call(this, props);
    _this9.answer = _this9.props.addend;
    _this9.state = {
      correct: false,
      started: false
    };
    _this9.quizzes = [];
    return _this9;
  }

  _createClass(DoubleM, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " +", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this10.props.check(e, _this10.answer, _this10.props.i, function () {
            return _this10.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this10.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      }), " ", "= ", this.props.addend * 2), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return DoubleM;
}(React.Component);

var Add1dto3 = /*#__PURE__*/function (_React$Component6) {
  _inherits(Add1dto3, _React$Component6);

  var _super6 = _createSuper(Add1dto3);

  function Add1dto3(props) {
    var _this11;

    _classCallCheck(this, Add1dto3);

    _this11 = _super6.call(this, props);
    _this11.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return _this11;
  }

  _createClass(Add1dto3, [{
    key: "render",
    value: function render() {
      var _this12 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding 1 Digit Numbers by 0 to 3"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Ad1dto3, {
          key: i,
          i: i,
          addend: addend,
          update: _this12.props.update,
          score: _this12.props.score,
          processResult: _this12.props.processResult,
          check: _this12.props.check
        });
      }));
    }
  }]);

  return Add1dto3;
}(React.Component);

var Ad1dto3 = /*#__PURE__*/function (_React$Component7) {
  _inherits(Ad1dto3, _React$Component7);

  var _super7 = _createSuper(Ad1dto3);

  function Ad1dto3(props) {
    var _this13;

    _classCallCheck(this, Ad1dto3);

    _this13 = _super7.call(this, props);
    _this13.addend2 = Math.floor(Math.random() * 4);
    _this13.answer = _this13.props.addend + _this13.addend2;
    _this13.state = {
      correct: false,
      started: false
    };
    _this13.quizzes = [];
    return _this13;
  }

  _createClass(Ad1dto3, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " + ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this14.props.check(e, _this14.answer, _this14.props.i, function () {
            return _this14.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this14.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Ad1dto3;
}(React.Component);

var Add1dto6 = /*#__PURE__*/function (_React$Component8) {
  _inherits(Add1dto6, _React$Component8);

  var _super8 = _createSuper(Add1dto6);

  function Add1dto6(props) {
    var _this15;

    _classCallCheck(this, Add1dto6);

    _this15 = _super8.call(this, props);
    _this15.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return _this15;
  }

  _createClass(Add1dto6, [{
    key: "render",
    value: function render() {
      var _this16 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding 1 Digit Numbers by 4 to 6"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Ad1dto6, {
          key: i,
          i: i,
          addend: addend,
          update: _this16.props.update,
          score: _this16.props.score,
          processResult: _this16.props.processResult,
          check: _this16.props.check
        });
      }));
    }
  }]);

  return Add1dto6;
}(React.Component);

var Ad1dto6 = /*#__PURE__*/function (_React$Component9) {
  _inherits(Ad1dto6, _React$Component9);

  var _super9 = _createSuper(Ad1dto6);

  function Ad1dto6(props) {
    var _this17;

    _classCallCheck(this, Ad1dto6);

    _this17 = _super9.call(this, props);
    _this17.addend2 = 4 + Math.floor(Math.random() * 3);
    _this17.answer = _this17.props.addend + _this17.addend2;
    _this17.state = {
      correct: false,
      started: false
    };
    _this17.quizzes = [];
    return _this17;
  }

  _createClass(Ad1dto6, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this18 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " + ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this18.props.check(e, _this18.answer, _this18.props.i, function () {
            return _this18.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this18.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Ad1dto6;
}(React.Component);

var Add1dto9 = /*#__PURE__*/function (_React$Component10) {
  _inherits(Add1dto9, _React$Component10);

  var _super10 = _createSuper(Add1dto9);

  function Add1dto9(props) {
    var _this19;

    _classCallCheck(this, Add1dto9);

    _this19 = _super10.call(this, props);
    _this19.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return _this19;
  }

  _createClass(Add1dto9, [{
    key: "render",
    value: function render() {
      var _this20 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding 1 Digit Numbers by 7 to 9"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Ad1dto9, {
          key: i,
          i: i,
          addend: addend,
          update: _this20.props.update,
          score: _this20.props.score,
          processResult: _this20.props.processResult,
          check: _this20.props.check
        });
      }));
    }
  }]);

  return Add1dto9;
}(React.Component);

var Ad1dto9 = /*#__PURE__*/function (_React$Component11) {
  _inherits(Ad1dto9, _React$Component11);

  var _super11 = _createSuper(Ad1dto9);

  function Ad1dto9(props) {
    var _this21;

    _classCallCheck(this, Ad1dto9);

    _this21 = _super11.call(this, props);
    _this21.addend2 = 7 + Math.floor(Math.random() * 3);
    _this21.answer = _this21.props.addend + _this21.addend2;
    _this21.state = {
      correct: false,
      started: false
    };
    _this21.quizzes = [];
    return _this21;
  }

  _createClass(Ad1dto9, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this22 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " + ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this22.props.check(e, _this22.answer, _this22.props.i, function () {
            return _this22.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this22.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Ad1dto9;
}(React.Component);

var Add10more = /*#__PURE__*/function (_React$Component12) {
  _inherits(Add10more, _React$Component12);

  var _super12 = _createSuper(Add10more);

  function Add10more(props) {
    var _this23;

    _classCallCheck(this, Add10more);

    _this23 = _super12.call(this, props);
    _this23.addends = shuffle([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
    return _this23;
  }

  _createClass(Add10more, [{
    key: "render",
    value: function render() {
      var _this24 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding 10 more to tens"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Ad10more, {
          key: i,
          i: i,
          addend: addend,
          update: _this24.props.update,
          score: _this24.props.score,
          processResult: _this24.props.processResult,
          check: _this24.props.check
        });
      }));
    }
  }]);

  return Add10more;
}(React.Component);

var Ad10more = /*#__PURE__*/function (_React$Component13) {
  _inherits(Ad10more, _React$Component13);

  var _super13 = _createSuper(Ad10more);

  function Ad10more(props) {
    var _this25;

    _classCallCheck(this, Ad10more);

    _this25 = _super13.call(this, props);
    _this25.addend2 = 10;
    _this25.answer = _this25.props.addend + _this25.addend2;
    _this25.state = {
      correct: false,
      started: false
    };
    _this25.quizzes = [];
    return _this25;
  }

  _createClass(Ad10more, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this26 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " + ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this26.props.check(e, _this26.answer, _this26.props.i, function () {
            return _this26.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this26.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Ad10more;
}(React.Component);

var Addtoten = /*#__PURE__*/function (_React$Component14) {
  _inherits(Addtoten, _React$Component14);

  var _super14 = _createSuper(Addtoten);

  function Addtoten(props) {
    var _this27;

    _classCallCheck(this, Addtoten);

    _this27 = _super14.call(this, props);
    _this27.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return _this27;
  }

  _createClass(Addtoten, [{
    key: "render",
    value: function render() {
      var _this28 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding a 1-digit number to a ten"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Adtoten, {
          key: i,
          i: i,
          addend: addend,
          update: _this28.props.update,
          score: _this28.props.score,
          processResult: _this28.props.processResult,
          check: _this28.props.check
        });
      }));
    }
  }]);

  return Addtoten;
}(React.Component);

var Adtoten = /*#__PURE__*/function (_React$Component15) {
  _inherits(Adtoten, _React$Component15);

  var _super15 = _createSuper(Adtoten);

  function Adtoten(props) {
    var _this29;

    _classCallCheck(this, Adtoten);

    _this29 = _super15.call(this, props);
    _this29.addend2 = 10;
    _this29.answer = _this29.props.addend + _this29.addend2;
    _this29.state = {
      correct: false,
      started: false
    };
    _this29.quizzes = [];
    return _this29;
  }

  _createClass(Adtoten, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this30 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.addend2 + " ", "+ ", this.props.addend + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this30.props.check(e, _this30.answer, _this30.props.i, function () {
            return _this30.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this30.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Adtoten;
}(React.Component);

var AddtoAten = /*#__PURE__*/function (_React$Component16) {
  _inherits(AddtoAten, _React$Component16);

  var _super16 = _createSuper(AddtoAten);

  function AddtoAten(props) {
    var _this31;

    _classCallCheck(this, AddtoAten);

    _this31 = _super16.call(this, props);
    _this31.addends = shuffle([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
    return _this31;
  }

  _createClass(AddtoAten, [{
    key: "render",
    value: function render() {
      var _this32 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding a 1-digit number to a multiple of ten"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(AdtoAten, {
          key: i,
          i: i,
          addend: addend,
          update: _this32.props.update,
          score: _this32.props.score,
          processResult: _this32.props.processResult,
          check: _this32.props.check
        });
      }));
    }
  }]);

  return AddtoAten;
}(React.Component);

var AdtoAten = /*#__PURE__*/function (_React$Component17) {
  _inherits(AdtoAten, _React$Component17);

  var _super17 = _createSuper(AdtoAten);

  function AdtoAten(props) {
    var _this33;

    _classCallCheck(this, AdtoAten);

    _this33 = _super17.call(this, props);
    _this33.addend2 = Math.floor(Math.random() * 10);
    _this33.answer = _this33.props.addend + _this33.addend2;
    _this33.state = {
      correct: false,
      started: false
    };
    _this33.quizzes = [];
    return _this33;
  }

  _createClass(AdtoAten, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this34 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " + ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this34.props.check(e, _this34.answer, _this34.props.i, function () {
            return _this34.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this34.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return AdtoAten;
}(React.Component);

var AddtotenAny = /*#__PURE__*/function (_React$Component18) {
  _inherits(AddtotenAny, _React$Component18);

  var _super18 = _createSuper(AddtotenAny);

  function AddtotenAny(props) {
    var _this35;

    _classCallCheck(this, AddtotenAny);

    _this35 = _super18.call(this, props);
    _this35.addends = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    return _this35;
  }

  _createClass(AddtotenAny, [{
    key: "render",
    value: function render() {
      var _this36 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Adding Ten to Any number"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(AdtotenAny, {
          key: i,
          i: i,
          addend: addend,
          update: _this36.props.update,
          score: _this36.props.score,
          processResult: _this36.props.processResult,
          check: _this36.props.check
        });
      }));
    }
  }]);

  return AddtotenAny;
}(React.Component);

var AdtotenAny = /*#__PURE__*/function (_React$Component19) {
  _inherits(AdtotenAny, _React$Component19);

  var _super19 = _createSuper(AdtotenAny);

  function AdtotenAny(props) {
    var _this37;

    _classCallCheck(this, AdtotenAny);

    _this37 = _super19.call(this, props);
    _this37.addend2 = Math.floor(Math.random() * 90);
    _this37.answer = _this37.props.addend + _this37.addend2;
    _this37.state = {
      correct: false,
      started: false
    };
    _this37.quizzes = [];
    return _this37;
  }

  _createClass(AdtotenAny, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this38 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.addend2 + " ", " + ", this.props.addend + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this38.props.check(e, _this38.answer, _this38.props.i, function () {
            return _this38.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this38.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return AdtotenAny;
}(React.Component);

var Sub10less = /*#__PURE__*/function (_React$Component20) {
  _inherits(Sub10less, _React$Component20);

  var _super20 = _createSuper(Sub10less);

  function Sub10less(props) {
    var _this39;

    _classCallCheck(this, Sub10less);

    _this39 = _super20.call(this, props);
    _this39.addends = shuffle([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    return _this39;
  }

  _createClass(Sub10less, [{
    key: "render",
    value: function render() {
      var _this40 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Subtracting 10 from tens"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Su10less, {
          key: i,
          i: i,
          addend: addend,
          update: _this40.props.update,
          score: _this40.props.score,
          processResult: _this40.props.processResult,
          check: _this40.props.check
        });
      }));
    }
  }]);

  return Sub10less;
}(React.Component);

var Su10less = /*#__PURE__*/function (_React$Component21) {
  _inherits(Su10less, _React$Component21);

  var _super21 = _createSuper(Su10less);

  function Su10less(props) {
    var _this41;

    _classCallCheck(this, Su10less);

    _this41 = _super21.call(this, props);
    _this41.addend2 = 10;
    _this41.answer = _this41.props.addend - _this41.addend2;
    _this41.state = {
      correct: false,
      started: false
    };
    _this41.quizzes = [];
    return _this41;
  }

  _createClass(Su10less, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Subtracting");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this42 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " - ", this.addend2 + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this42.props.check(e, _this42.answer, _this42.props.i, function () {
            return _this42.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this42.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Su10less;
}(React.Component);

var SubtotenAny = /*#__PURE__*/function (_React$Component22) {
  _inherits(SubtotenAny, _React$Component22);

  var _super22 = _createSuper(SubtotenAny);

  function SubtotenAny(props) {
    var _this43;

    _classCallCheck(this, SubtotenAny);

    _this43 = _super22.call(this, props);
    _this43.addends = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    return _this43;
  }

  _createClass(SubtotenAny, [{
    key: "render",
    value: function render() {
      var _this44 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Subtracting Ten to Any Number"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the sum."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(SutotenAny, {
          key: i,
          i: i,
          addend: addend,
          update: _this44.props.update,
          score: _this44.props.score,
          processResult: _this44.props.processResult,
          check: _this44.props.check
        });
      }));
    }
  }]);

  return SubtotenAny;
}(React.Component);

var SutotenAny = /*#__PURE__*/function (_React$Component23) {
  _inherits(SutotenAny, _React$Component23);

  var _super23 = _createSuper(SutotenAny);

  function SutotenAny(props) {
    var _this45;

    _classCallCheck(this, SutotenAny);

    _this45 = _super23.call(this, props);
    _this45.addend2 = 10 + Math.floor(Math.random() * 90);
    _this45.answer = _this45.addend2 - _this45.props.addend;
    _this45.state = {
      correct: false,
      started: false
    };
    _this45.quizzes = [];
    return _this45;
  }

  _createClass(SutotenAny, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.correct !== this.state.correct) {
        this.props.processResult(this.quizzes, "Adding");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this46 = this;

      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.addend2 + " ", " - ", this.props.addend + " ", " =", " ", /*#__PURE__*/React.createElement("input", {
        onChange: function onChange(e) {
          return _this46.props.check(e, _this46.answer, _this46.props.i, function () {
            return _this46.setState(function (prev) {
              return {
                started: true,
                correct: true
              };
            });
          }, function () {
            return _this46.setState(function (prev) {
              return {
                started: true,
                correct: false
              };
            });
          });
        },
        type: "number"
      })), this.state.started && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.started && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return SutotenAny;
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
