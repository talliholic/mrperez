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

var Typing = /*#__PURE__*/function (_React$Component) {
  _inherits(Typing, _React$Component);

  var _super = _createSuper(Typing);

  function Typing(props) {
    var _this;

    _classCallCheck(this, Typing);

    _this = _super.call(this, props);
    _this.state = {
      context: "",
      structure: "",
      sentences: [],
      img: [],
      answers: [],
      vocab: "",
      prefix: false
    };
    _this.quizzes = [];
    _this.updateAnswers = _this.updateAnswers.bind(_assertThisInitialized(_this));
    _this.getState = _this.getState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Typing, [{
    key: "getState",
    value: function getState() {
      return this.state.answers;
    }
  }, {
    key: "updateAnswers",
    value: function updateAnswers(i, result) {
      this.setState(function (prevState) {
        prevState.answers[i] = result;
        return _objectSpread({}, prevState);
      });
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
        json.sentences.forEach(function () {
          answers.push(0);
        });

        _this2.setState(function () {
          return {
            context: json.context,
            structure: json.structure,
            sentences: json.sentences,
            img: json.img,
            answers: answers,
            vocab: json.vocab,
            prefix: json.prefix
          };
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.sentences.length > 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "items"
        }, /*#__PURE__*/React.createElement("h1", null, this.state.vocab), /*#__PURE__*/React.createElement("div", {
          id: "instruction"
        }, "Look at the image. Then read the sentence and complete it by typing the missing word. Use capital letters ONLY to capitalize the first letter in the first word."), /*#__PURE__*/React.createElement("div", {
          className: "score"
        }, "Score:", " ", Math.round(this.state.answers.reduce(function (partialSum, a) {
          return partialSum + a;
        }, 0) / this.state.sentences.length * 100), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
          className: "play_again",
          onClick: function onClick() {
            return location.reload();
          }
        }, "Play Again")), this.state.sentences.map(function (sentence, i) {
          return /*#__PURE__*/React.createElement(Item, {
            key: i,
            i: i,
            update: _this3.updateAnswers,
            sentence: sentence,
            img: _this3.state.img[i],
            answers: _this3.getState,
            structure: _this3.state.structure,
            vocab: _this3.state.vocab,
            prefix: _this3.state.prefix
          });
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", null, "Loading...");
      }
    }
  }]);

  return Typing;
}(React.Component);

var Item = /*#__PURE__*/function (_React$Component2) {
  _inherits(Item, _React$Component2);

  var _super2 = _createSuper(Item);

  function Item(props) {
    var _this4;

    _classCallCheck(this, Item);

    _this4 = _super2.call(this, props);
    _this4.state = {
      sentenceArray: _this4.props.sentence.split(" "),
      missing: "",
      correct: false,
      quizzes: [],
      sentenceArr: _this4.props.sentence.split(" ")
    };

    _this4.state.sentenceArray.pop();

    _this4.state.sentenceArr.shift();

    _this4.check = _this4.check.bind(_assertThisInitialized(_this4));
    _this4.processResult = _this4.processResult.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Item, [{
    key: "processResult",
    value: function processResult() {
      var _this5 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this5.quizzes = json;
        var searchParams = new URLSearchParams(window.location.search);
        var type = "Typing";
        var score = Math.round(_this5.props.answers().reduce(function (partialSum, a) {
          return partialSum + a;
        }, 0) / _this5.props.answers().length * 100);
        var taken = [];

        if (_this5.quizzes.length > 0) {
          taken = _this5.quizzes.filter(function (quiz) {
            return quiz.context === searchParams.get("context") && quiz.structure === _this5.props.vocab && quiz.type === type;
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
              context: searchParams.get("context"),
              structure: _this5.props.vocab,
              type: type,
              path: "typing?context=" + searchParams.get("context") + "&index=" + searchParams.get("index"),
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
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          missing: e.target.value.trim()
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.missing !== this.state.missing) {
        if (!this.props.prefix) {
          if (this.props.sentence === this.state.sentenceArray.join(" ") + " " + this.state.missing + ".") {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: true
              });
            });
            this.props.update(this.props.i, 1);
          } else {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: false
              });
            });
            this.props.update(this.props.i, 0);
          }
        } else {
          if (this.props.sentence === this.state.missing + " " + this.state.sentenceArr.join(" ")) {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: true
              });
            });
            this.props.update(this.props.i, 1);
          } else {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: false
              });
            });
            this.props.update(this.props.i, 0);
          }
        }
      }

      if (state.correct !== this.state.correct) this.processResult();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "sentence"
      }, /*#__PURE__*/React.createElement("img", {
        className: "image",
        src: this.props.img
      }), !this.props.prefix && /*#__PURE__*/React.createElement("label", null, " ", this.state.sentenceArray.join(" "), " ", /*#__PURE__*/React.createElement("input", {
        onChange: this.check,
        name: "missing",
        type: "text",
        value: this.state.missing,
        required: true
      }), "."), this.props.prefix && /*#__PURE__*/React.createElement("label", null, " ", /*#__PURE__*/React.createElement("input", {
        onChange: this.check,
        name: "missing",
        type: "text",
        value: this.state.missing,
        required: true
      }), " ", this.state.sentenceArr.join(" ")), this.state.missing.length > 0 && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.missing.length > 0 && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }));
    }
  }]);

  return Item;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Typing, null), document.getElementById("app"));

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
