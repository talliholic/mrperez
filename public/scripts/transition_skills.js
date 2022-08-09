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
      dataLoaded: false
    };
    return _this;
  }

  _createClass(Practice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/vocabulary/").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          item: json,
          dataLoaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          item = _this$state.item;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("h1", null, "Transition Skills"), /*#__PURE__*/React.createElement(MathQuizzes, null), item.topics.map(function (topic, i) {
          return /*#__PURE__*/React.createElement(Topic, {
            key: i,
            data: item.vocab.filter(function (voc) {
              return voc.context === topic;
            }),
            topic: topic
          });
        }));
      }

      return /*#__PURE__*/React.createElement("p", null, "Data did not load");
    }
  }]);

  return Practice;
}(React.Component);

var MathQuizzes = /*#__PURE__*/function (_React$Component2) {
  _inherits(MathQuizzes, _React$Component2);

  var _super2 = _createSuper(MathQuizzes);

  function MathQuizzes(props) {
    var _this3;

    _classCallCheck(this, MathQuizzes);

    _this3 = _super2.call(this, props);
    _this3.state = {
      show: false
    };
    _this3.toggle = _this3.toggle.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(MathQuizzes, [{
    key: "toggle",
    value: function toggle() {
      this.setState(function (prev) {
        return {
          show: !prev.show
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "topic"
      }, /*#__PURE__*/React.createElement("h2", null, "Math"), /*#__PURE__*/React.createElement("div", {
        className: "structure"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "title",
        onClick: function onClick() {
          return _this4.toggle();
        }
      }, "Addition"), this.state.show && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "References"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "video",
        href: "https://www.youtube.com/watch?v=8jOzhiACB68"
      }, "Doubles Song 1"), /*#__PURE__*/React.createElement("a", {
        id: "white",
        href: "https://www.youtube.com/watch?v=At0quRa90rs"
      }, "Doubles Song 2"), /*#__PURE__*/React.createElement("a", {
        id: "pink",
        href: "https://ictgames.com/mobilePage/archeryDoubles/index.html"
      }, "Doubles Game 1")), /*#__PURE__*/React.createElement("h3", null, "Interactive Quizzes"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "green",
        href: "/math-quizzes?topic=doubles"
      }, "Doubles Sum"), /*#__PURE__*/React.createElement("a", {
        id: "decoding",
        href: "/math-quizzes?topic=doubles Missing"
      }, "Doubles Missing")), /*#__PURE__*/React.createElement("h3", null, "Workskeets"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "unscramble_w",
        href: "/math?topic=doubles"
      }, "Doubles Sum"), /*#__PURE__*/React.createElement("a", {
        id: "unscramble_s",
        href: "/math?topic=doubles Missing"
      }, "Doubles Missing")))));
    }
  }]);

  return MathQuizzes;
}(React.Component);

var Topic = function Topic(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topic"
  }, /*#__PURE__*/React.createElement("h2", null, props.topic), props.data.map(function (structure, i) {
    return /*#__PURE__*/React.createElement(Structure, {
      key: i,
      data: structure
    });
  }));
};

var Structure = /*#__PURE__*/function (_React$Component3) {
  _inherits(Structure, _React$Component3);

  var _super3 = _createSuper(Structure);

  function Structure(props) {
    var _this5;

    _classCallCheck(this, Structure);

    _this5 = _super3.call(this, props);
    _this5.state = {
      show: false
    };
    _this5.toggle = _this5.toggle.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(Structure, [{
    key: "toggle",
    value: function toggle() {
      this.setState(function (prev) {
        return {
          show: !prev.show
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "structure"
      }, /*#__PURE__*/React.createElement("div", {
        className: "title",
        onClick: function onClick() {
          return _this6.toggle();
        }
      }, this.props.data.prefix && /*#__PURE__*/React.createElement("h2", null, "(", /*#__PURE__*/React.createElement("span", {
        className: "blue"
      }, this.props.data.vocab), ")", " ...", this.props.data.structure), !this.props.data.prefix && /*#__PURE__*/React.createElement("h2", null, this.props.data.structure, "... ", "(", /*#__PURE__*/React.createElement("span", {
        className: "blue"
      }, this.props.data.vocab), ")")), this.state.show && /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, " ", /*#__PURE__*/React.createElement("h3", null, "Reference"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "gray",
        href: this.props.data.vocabulary
      }, "Vocabulary"), this.props.data.sentences && /*#__PURE__*/React.createElement("a", {
        id: "white",
        href: this.props.data.sentences
      }, "Sentences"), " ", this.props.data.video && /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        id: "video",
        href: this.props.data.video
      }, "Video")), /*#__PURE__*/React.createElement("h3", null, "Interactive Quizzes"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "green",
        href: this.props.data.readingQuiz
      }, "Reading Quiz"), this.props.data.listeningQuiz && /*#__PURE__*/React.createElement("a", {
        id: "yellow",
        href: this.props.data.listeningQuiz
      }, "Listening Quiz"), this.props.data.unscrambleWord && /*#__PURE__*/React.createElement("a", {
        id: "pink",
        href: this.props.data.unscrambleWord
      }, "Unscramble the word"), /*#__PURE__*/React.createElement("a", {
        id: "blue",
        href: this.props.data.unscrambleSentence
      }, "Unscramble the sentence"), this.props.data.decoding && /*#__PURE__*/React.createElement("a", {
        id: "decoding",
        href: this.props.data.decoding
      }, "Decoding"), /*#__PURE__*/React.createElement("a", {
        id: "typing",
        href: this.props.data.typing
      }, "Typing")), /*#__PURE__*/React.createElement("h3", null, "Worksheets"), /*#__PURE__*/React.createElement("div", {
        className: "resources"
      }, /*#__PURE__*/React.createElement("a", {
        id: "other",
        href: this.props.data.paper
      }, "Paper Quiz"), /*#__PURE__*/React.createElement("a", {
        id: "paper_reading",
        href: this.props.data.paperReading
      }, "Paper Reading"), this.props.data.unscrambled_paper_phrase && /*#__PURE__*/React.createElement("a", {
        id: "unscramble_s",
        href: this.props.data.unscrambled_paper_phrase
      }, "Paper Unscramble Words"), /*#__PURE__*/React.createElement("a", {
        id: "unscramble_w",
        href: this.props.data.unscrambled_paper
      }, "Paper Unscramble Sentences"))));
    }
  }]);

  return Structure;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Practice, null), document.getElementById("app"));
