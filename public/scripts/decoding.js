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

var Decoding = /*#__PURE__*/function (_React$Component) {
  _inherits(Decoding, _React$Component);

  var _super = _createSuper(Decoding);

  function Decoding(props) {
    var _this;

    _classCallCheck(this, Decoding);

    _this = _super.call(this, props);
    _this.state = {
      sentences: [],
      images: [],
      vocab: "",
      dataLoaded: false,
      answers: [],
      context: ""
    };
    _this.updateAnswers = _this.updateAnswers.bind(_assertThisInitialized(_this));
    _this.getState = _this.getState.bind(_assertThisInitialized(_this));
    _this.getVocab = _this.getVocab.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Decoding, [{
    key: "getVocab",
    value: function getVocab() {
      return this.state.vocab;
    }
  }, {
    key: "updateAnswers",
    value: function updateAnswers(i, result) {
      this.setState(function (prevState) {
        prevState.answers[i] = result;
        return {
          sentences: prevState.sentences,
          images: prevState.images,
          vocab: prevState.vocab,
          dataLoaded: prevState.dataLoaded,
          answers: prevState.answers,
          context: prevState.context
        };
      });
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
        json.sentences.forEach(function () {
          answers.push(0);
        });

        _this2.setState(function (prevState) {
          return {
            sentences: json.sentences,
            images: json.img,
            vocab: json.vocab,
            dataLoaded: true,
            answers: answers,
            context: json.context
          };
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if ("webkitSpeechRecognition" in window && this.state.dataLoaded) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "score"
        }, "Score:", " ", Math.round(this.state.answers.reduce(function (partialSum, a) {
          return partialSum + a;
        }, 0) / this.state.sentences.length * 100), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
          className: "play_again",
          onClick: function onClick() {
            return location.reload();
          }
        }, "Play Again")), /*#__PURE__*/React.createElement("h1", null, this.state.vocab), /*#__PURE__*/React.createElement("div", {
          id: "instruction"
        }, "Click on the microphone and read the sentence out loud. Don't stop while reading."), this.state.sentences.map(function (sentence, i) {
          return /*#__PURE__*/React.createElement(Block, {
            key: i,
            index: i,
            sentence: sentence,
            image: _this3.state.images[i],
            getScore: _this3.getState,
            updateScore: _this3.updateAnswers,
            vocab: _this3.getVocab
          });
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "This browser does not support Speech Recognition. Change your device or browser to access this section. Att: Mr. Perez"), /*#__PURE__*/React.createElement("p", null, "En este navegador no funciona el Reconocimiento de Voz. Cambia de dispositivo o navegador para acceder a esta secci\xF3n. Att: Mr. Perez"));
      }
    }
  }]);

  return Decoding;
}(React.Component);

var Block = /*#__PURE__*/function (_React$Component2) {
  _inherits(Block, _React$Component2);

  var _super2 = _createSuper(Block);

  function Block(props) {
    var _this4;

    _classCallCheck(this, Block);

    _this4 = _super2.call(this, props);
    _this4.state = {
      transcript: undefined,
      started: false,
      stopped: false,
      error: false,
      sentence: _this4.props.sentence,
      correct: false
    };
    _this4.quizzes = [];
    _this4.processResult = _this4.processResult.bind(_assertThisInitialized(_this4));
    _this4.speechRecognition = new webkitSpeechRecognition();
    _this4.speechRecognition.lang = "en-US";

    _this4.speechRecognition.onstart = function () {
      _this4.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          started: true,
          stopped: false,
          error: false
        });
      });
    };

    _this4.speechRecognition.onend = function () {
      _this4.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          started: false,
          stopped: true,
          error: false
        });
      });

      _this4.processResult();
    };

    _this4.speechRecognition.onError = function () {
      _this4.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          started: false,
          stopped: false,
          error: true
        });
      });
    };

    _this4.speechRecognition.onresult = function (event) {
      var _loop = function _loop(i) {
        if (event.results[i].isFinal) {
          _this4.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              transcript: cap((event.results[i][0].transcript + ".").toLowerCase())
            });
          }); //   final_transcript += event.results[i][0].transcript;

        } // else {
        //   interim_transcript += event.results[i][0].transcript;
        // }

      };

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        _loop(i);
      }
    }; // this.speechRecognition.continuous = true;
    // this.speechRecognition.interimResults = true;


    return _this4;
  }

  _createClass(Block, [{
    key: "processResult",
    value: function processResult() {
      var _this5 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this5.quizzes = json;
        var searchParams = new URLSearchParams(window.location.search);
        var type = "Decoding";
        var score = Math.round(_this5.props.getScore().reduce(function (partialSum, a) {
          return partialSum + a;
        }, 0) / _this5.props.getScore().length * 100);
        var taken = [];

        if (_this5.quizzes.length > 0) {
          taken = _this5.quizzes.filter(function (quiz) {
            return quiz.context === searchParams.get("context") && quiz.structure === _this5.props.vocab() && quiz.type === type;
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
              structure: _this5.props.vocab(),
              type: type,
              path: "decoding?context=" + searchParams.get("context") + "&index=" + searchParams.get("index"),
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.stopped !== this.state.stopped) {
        if (this.state.sentence == this.state.transcript && this.state.stopped) {
          this.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              correct: true
            });
          });
          this.props.updateScore(this.props.index, 1);
        } else if (this.state.sentence !== this.state.transcript && this.state.stopped) {
          this.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              correct: false
            });
          });
          this.props.updateScore(this.props.index, 0);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "question"
      }, /*#__PURE__*/React.createElement("img", {
        className: "image",
        src: this.props.image
      }), /*#__PURE__*/React.createElement("figcaption", {
        className: "sentence"
      }, this.props.sentence), /*#__PURE__*/React.createElement("div", {
        className: "transcript"
      }, this.state.transcript, this.state.stopped && this.state.correct && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), this.state.stopped && this.state.correct === false && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      })), !this.state.started && /*#__PURE__*/React.createElement("img", {
        src: "media/topics/microphone.jpg",
        className: "speak",
        onClick: function onClick() {
          return _this6.speechRecognition.start();
        }
      }), this.state.started && /*#__PURE__*/React.createElement("img", {
        className: "speaking",
        src: "media/topics/listening.gif"
      }));
    }
  }]);

  return Block;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Decoding, null), document.getElementById("app"));

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
