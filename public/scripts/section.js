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
var subject = searchParams.get("subject");
var topic = searchParams.get("topic");
var main = searchParams.get("main");
var context = searchParams.get("context");

var Section = /*#__PURE__*/function (_React$Component) {
  _inherits(Section, _React$Component);

  var _super = _createSuper(Section);

  function Section(props) {
    var _this;

    _classCallCheck(this, Section);

    _this = _super.call(this, props);
    _this.state = {
      topics: [],
      sections: [],
      section: [],
      loaded: false,
      quizzes: [],
      loggedIn: false
    };
    _this.passed = _this.passed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Section, [{
    key: "passed",
    value: function passed(path) {
      var passed = false;

      if (this.state.quizzes.length > 0) {
        passed = this.state.quizzes.some(function (quiz) {
          return quiz.path === path && quiz.grade >= 75;
        });
      }

      return passed;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/vocabulary").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            topics: json.topics,
            sections: context ? json.vocab.filter(function (vocab) {
              return vocab.context === context;
            }) : [],
            section: json.vocab.filter(function (section) {
              return section.vocab === topic;
            }),
            loaded: true
          });
        });

        fetch("/quizzes").then(function (res) {
          return res.json();
        }).then(function (json) {
          var loggedIn = false;

          if (json.length > 0) {
            loggedIn = true;
          }

          _this2.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              quizzes: json,
              loggedIn: loggedIn
            });
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (subject === "Math" && topic === "Adding") {
        return /*#__PURE__*/React.createElement(Maths, {
          passed: this.passed,
          loggedIn: this.state.loggedIn
        });
      } else if (subject === "Math" && topic === "Subtracting") {
        return /*#__PURE__*/React.createElement(MathsSub, {
          passed: this.passed,
          loggedIn: this.state.loggedIn
        });
      } else if (subject === "Language") {
        return this.state.loaded && /*#__PURE__*/React.createElement(Language, {
          passed: this.passed,
          data: this.state.section[0],
          loggedIn: this.state.loggedIn
        });
      } else if (context) {
        return this.state.loaded && /*#__PURE__*/React.createElement(Main, {
          className: "container",
          data: this.state.sections
        });
      } else if (this.state.loaded) {
        return /*#__PURE__*/React.createElement(Menu, {
          data: this.state.topics,
          topics: this.state.topics
        });
      } else {
        return /*#__PURE__*/React.createElement("div", null, "Loading...");
      }
    }
  }]);

  return Section;
}(React.Component);

var Feedback = function Feedback(props) {
  if (props.loggedIn) {
    return /*#__PURE__*/React.createElement("div", {
      className: "feedback"
    }, props.passed && /*#__PURE__*/React.createElement("img", {
      className: "check",
      src: "media/topics/check.jpg"
    }), !props.passed && /*#__PURE__*/React.createElement("img", {
      className: "cross",
      src: "media/topics/cross.png"
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
};

var Menu = function Menu(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Transition Skills"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "section?subject=Math&topic=Subtracting"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/Subtraction_menu.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Math Subtraction"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "section?subject=Math&topic=Adding"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/math.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Math Addition"))), props.topics.map(function (topic, i) {
    return /*#__PURE__*/React.createElement(Context, {
      key: i,
      topic: topic
    });
  })), /*#__PURE__*/React.createElement("h2", null, "Pre K"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "vocales?t\xEDtulo=Inspector de Vocales 1"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/vocales/oso.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Inspector de Vocales 1"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "vocales?t\xEDtulo=Inspector de Vocales 2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/vocales/dulce.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Inspector de Vocales 2"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "vocales?t\xEDtulo=Inspector de Vocales 3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/vocales/pelota.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Inspector de Vocales 3"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "odd?title=Basic Sounds"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/phonics/img/sun.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Basic Sounds"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "odd?title=Basic Sounds&audio=true"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/phonics/img/turtle.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Basic Sounds Listening")))));
};

var Context = function Context(props) {
  return /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/section?context=" + props.topic
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/" + props.topic + "_menu.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, props.topic)));
};

var Main = function Main(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, context), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, props.data.map(function (topic, i) {
    return /*#__PURE__*/React.createElement(Topic, {
      key: i,
      data: topic
    });
  })));
};

var Topic = function Topic(props) {
  return /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/section?subject=Language&topic=" + props.data.vocab
  }, /*#__PURE__*/React.createElement("img", {
    src: props.data.icon
  }), /*#__PURE__*/React.createElement("figcaption", null, props.data.vocab)));
};

var Language = function Language(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, props.data.vocab), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.vocabulary
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/vocabulary.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Vocabulary"))), props.data.sentences && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.sentences
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/sentences.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Sentences"))), props.data.video && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.video
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/youtube.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Video"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.match
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/match.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Match the Words")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.match),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.readingQuiz
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/reading.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Reading Quiz")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.readingQuiz),
    loggedIn: props.loggedIn
  })), props.data.listeningQuiz && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.listeningQuiz
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/listening.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Listening Quiz")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.listeningQuiz),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.unscrambleSentence
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/unscramble-sentence.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Unscramble the Sentence")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.unscrambleSentence),
    loggedIn: props.loggedIn
  })), props.data.unscrambleWord && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.unscrambleWord
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/unscramble-word.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Unscramble the Word")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.unscrambleWord),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.typing
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/typing.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Typing")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.typing),
    loggedIn: props.loggedIn
  })), props.data.decoding && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.decoding
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/decoding.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Decoding")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed(props.data.decoding),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.paper
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/quiz.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Paper Quiz"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.paperReading
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/paper-reading.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Paper Reading"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.unscrambled_paper
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/unscrambled-paper.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Paper Unscramble Sentences"))), props.data.unscrambled_paper_phrase && /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: props.data.unscrambled_paper_phrase
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/unscrambled-paper-phrase.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Paper Unscramble Words")))));
};

var Maths = function Maths(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Adding"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=doubles"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/doubles-missing.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Sum")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=doubles"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=doubles%20Missing"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/doubles.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Missing")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=doubles%20Missing"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add one digit to three"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/3.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add One Digit to 3 ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add one digit to three"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add one digit to six"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/6.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add One Digit to 6 ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add one digit to six"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add one digit to nine"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/9.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add One Digit to 9 ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add one digit to nine"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add ten more"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/ten-more.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add Ten More ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add ten more"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add to ten"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/one-to-ten.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add 1 Number to Ten ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add to ten"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math-quizzes?topic=add to a ten"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/mult_10.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Add 1 Number to a Multiple of Ten ")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add to a ten"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "math-quizzes?topic=add ten to any"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/hundreds_chart.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "10 more than any number")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=add ten to any"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    className: "link",
    href: "https://ictgames.com/mobilePage/archeryDoubles/index.html"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/game.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Archery Doubles"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    className: "link",
    href: "https://www.youtube.com/watch?v=8jOzhiACB68"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/youtube.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Rap"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    className: "link",
    href: "https://www.youtube.com/watch?v=At0quRa90rs"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/youtube.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Facts Song"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math?topic=doubles"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/worksheet.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Sum"))), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "/math?topic=doubles%20Missing"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/worksheet.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Doubles Missing")))));
};

var MathsSub = function MathsSub(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Subtracting"), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "math-quizzes?topic=subtract ten less"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/img_1/ten.jpg"
  }), /*#__PURE__*/React.createElement("figcaption", null, "10 Less than a multiple of ten")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=subtract ten less"),
    loggedIn: props.loggedIn
  })), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "math-quizzes?topic=sub ten to any"
  }, /*#__PURE__*/React.createElement("img", {
    src: "media/topics/hundreds_chart.png"
  }), /*#__PURE__*/React.createElement("figcaption", null, "10 Less than any number")), /*#__PURE__*/React.createElement(Feedback, {
    passed: props.passed("math-quizzes?topic=sub ten to any"),
    loggedIn: props.loggedIn
  }))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Section, null), document.getElementById("app"));
