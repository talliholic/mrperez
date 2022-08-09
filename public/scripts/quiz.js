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
var title = searchParams.get("title");

var Quiz = /*#__PURE__*/function (_React$Component) {
  _inherits(Quiz, _React$Component);

  var _super = _createSuper(Quiz);

  function Quiz(props) {
    var _this;

    _classCallCheck(this, Quiz);

    _this = _super.call(this, props);
    _this.state = {
      data: {},
      grade: 0,
      checked: false,
      quiz: {
        taken: false,
        id: undefined
      },
      page: 1
    };
    _this.increase = _this.increase.bind(_assertThisInitialized(_this));
    _this.decrease = _this.decrease.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    _this.sendResult = _this.sendResult.bind(_assertThisInitialized(_this));
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Quiz, [{
    key: "changePage",
    value: function changePage(page) {
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          page: page
        });
      });
    }
  }, {
    key: "sendResult",
    value: function sendResult(taken) {
      var grade = Math.round(this.state.grade * 100 / this.state.data.questions.length);

      if (!taken) {
        post("/quizzes", {
          context: this.state.data.topic,
          structure: title,
          type: "Exam",
          path: "/quiz?title=" + title,
          grade: grade
        }, function (res) {
          return console.log(res);
        });
      } else {
        patch("/quizzes/" + this.state.quiz.id, {
          grade: grade
        }, function (res) {
          return console.log(res);
        });
      }
    }
  }, {
    key: "submit",
    value: function submit(e) {
      e.preventDefault();
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          checked: true
        });
      });
      this.sendResult(this.state.quiz.taken);
    }
  }, {
    key: "increase",
    value: function increase() {
      this.setState(function (prev) {
        return {
          prev: prev,
          grade: prev.grade + 1
        };
      });
    }
  }, {
    key: "decrease",
    value: function decrease() {
      this.setState(function (prev) {
        return {
          prev: prev,
          grade: prev.grade - 1
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      get("/quiz-data?title=" + title, function (json) {
        _this2.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            data: json
          });
        });

        get("/quizzes?taken=" + title, function (json) {
          return _this2.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              quiz: {
                taken: json.taken,
                id: json.quiz_id
              }
            });
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          data = _this$state.data,
          grade = _this$state.grade,
          checked = _this$state.checked,
          page = _this$state.page;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, data.title), data.title && /*#__PURE__*/React.createElement("div", {
        id: "container"
      }, /*#__PURE__*/React.createElement("div", {
        id: "quiz-header"
      }, /*#__PURE__*/React.createElement("p", null, data.prompt.text), data.prompt.type === "image" && /*#__PURE__*/React.createElement("img", {
        src: data.prompt.media
      })), /*#__PURE__*/React.createElement("form", {
        id: "questions",
        onSubmit: this.submit
      }, data.questions.map(function (question, i) {
        return /*#__PURE__*/React.createElement(Question, {
          key: i,
          i: i,
          data: question,
          increase: _this3.increase,
          decrease: _this3.decrease,
          checked: checked,
          changePage: _this3.changePage,
          page: page,
          quizLength: data.questions.length
        });
      }))));
    }
  }]);

  return Quiz;
}(React.Component);

var Question = /*#__PURE__*/function (_React$Component2) {
  _inherits(Question, _React$Component2);

  var _super2 = _createSuper(Question);

  function Question(props) {
    var _this4;

    _classCallCheck(this, Question);

    _this4 = _super2.call(this, props);
    _this4.state = {
      grade: undefined,
      input: ""
    };
    _this4.grade = _this4.grade.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Question, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.grade !== this.state.grade) {
        //Specify movement between past and present state
        if (state.grade === 0 || state.grade === undefined && this.state.grade === 1) {
          this.props.increase(); //Specify movement between past and present state
        } else if (state.grade === 1 && this.state.grade === 0) {
          this.props.decrease();
        }
      }
    }
  }, {
    key: "grade",
    value: function grade(e) {
      var _this5 = this;

      var answer = e.target.value.toLowerCase().trim();

      var updateGrade = function updateGrade(grade) {
        _this5.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            grade: grade,
            input: e.target.value
          });
        });
      };

      var wordMatch = function wordMatch(dbArray) {
        var answerArray = answer.split(" ");

        if (answerArray[answerArray.length - 1].includes(".")) {
          answerArray[answerArray.length - 1] = answerArray[answerArray.length - 1].slice(0, -1);
        }

        answerArray = answerArray.filter(function (word) {
          return word !== ".";
        });
        answerArray = answerArray.filter(function (word) {
          return word !== "";
        });
        answerArray = answerArray.join(" ");
        return dbArray.some(function (word) {
          return answerArray.includes(word);
        });
      };

      if (wordMatch(this.props.data.answer)) {
        updateGrade(1);
      } else {
        updateGrade(0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          checked = _this$props.checked,
          changePage = _this$props.changePage,
          i = _this$props.i,
          page = _this$props.page,
          quizLength = _this$props.quizLength;
      var _this$state2 = this.state,
          grade = _this$state2.grade,
          input = _this$state2.input;
      return /*#__PURE__*/React.createElement("div", null, i + 1 === page && !checked && /*#__PURE__*/React.createElement("div", {
        className: "question"
      }, /*#__PURE__*/React.createElement("div", {
        className: "nav"
      }, /*#__PURE__*/React.createElement("button", {
        className: "info",
        onClick: function onClick() {
          return changePage(i);
        },
        disabled: i === 0
      }, "Back"), /*#__PURE__*/React.createElement("div", {
        className: "current-page info"
      }, i + 1, " / ", quizLength), /*#__PURE__*/React.createElement("button", {
        className: "info",
        onClick: function onClick() {
          return changePage(i + 2);
        },
        disabled: i + 1 === quizLength || input === ""
      }, "Next")), /*#__PURE__*/React.createElement("h2", null, data.question), data.input === "number" && /*#__PURE__*/React.createElement("input", {
        className: "number",
        onChange: this.grade,
        type: "number",
        disabled: checked,
        value: input,
        required: true
      }), data.input === "text" && /*#__PURE__*/React.createElement("input", {
        className: "text",
        onChange: this.grade,
        type: "text",
        disabled: checked,
        value: input,
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        className: "check",
        type: "submit",
        value: "Check",
        disabled: i + 1 !== quizLength || input === ""
      })), checked && /*#__PURE__*/React.createElement("div", {
        className: "summary"
      }, /*#__PURE__*/React.createElement("h3", null, data.question), /*#__PURE__*/React.createElement("p", {
        className: "feedback-p"
      }, input, " ", grade === 1 && /*#__PURE__*/React.createElement("img", {
        className: "feedback-image",
        src: "media/topics/check.jpg"
      }), grade === 0 && /*#__PURE__*/React.createElement("img", {
        className: "feedback-image",
        src: "media/topics/cross.png"
      }))));
    }
  }]);

  return Question;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Quiz, null), document.getElementById("app"));
