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
var audio = searchParams.get("audio");

var Odd = /*#__PURE__*/function (_React$Component) {
  _inherits(Odd, _React$Component);

  var _super = _createSuper(Odd);

  function Odd(props) {
    var _this;

    _classCallCheck(this, Odd);

    _this = _super.call(this, props);
    _this.state = {
      data: [],
      loaded: false
    };
    return _this;
  }

  _createClass(Odd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/load-odd/" + title).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          data: json,
          loaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.loaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "sounds"
        }, /*#__PURE__*/React.createElement("h1", null, this.state.data.title), /*#__PURE__*/React.createElement("div", {
          className: "instruction"
        }, "Click on the images that begin with the sound above."), this.state.data.sounds.map(function (sound, i) {
          return /*#__PURE__*/React.createElement(Sound, {
            key: i,
            sound: sound,
            img: _this3.state.data.sounds[i].img,
            tries: _this3.state.data.sounds[i].tries,
            audio: _this3.state.data.sounds[i].audio
          });
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", null, "Loading...");
      }
    }
  }]);

  return Odd;
}(React.Component);

var Sound = /*#__PURE__*/function (_React$Component2) {
  _inherits(Sound, _React$Component2);

  var _super2 = _createSuper(Sound);

  function Sound(props) {
    var _this4;

    _classCallCheck(this, Sound);

    _this4 = _super2.call(this, props);
    _this4.img = shuffle(_this4.props.img);
    _this4.state = {
      tries: 0,
      finished: false,
      correct: 0,
      success: false
    };
    _this4.updateTries = _this4.updateTries.bind(_assertThisInitialized(_this4));
    _this4.updateCorrect = _this4.updateCorrect.bind(_assertThisInitialized(_this4));
    _this4.finished = _this4.finished.bind(_assertThisInitialized(_this4));
    _this4.play = _this4.play.bind(_assertThisInitialized(_this4));
    _this4.positive = shuffle(["awesome", "great_job", "outstanding"]);
    _this4.negative = shuffle(["oops", "next_time"]);
    return _this4;
  }

  _createClass(Sound, [{
    key: "play",
    value: function play(e) {
      var audio = e.target.previousSibling;
      audio.play();
    }
  }, {
    key: "finished",
    value: function finished() {
      return this.state.finished;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.tries !== this.state.tries) {
        if (this.state.tries === this.props.tries) {
          this.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              finished: true
            });
          });
        }
      }

      if (state.correct !== this.state.correct) {
        if (this.state.correct === this.props.tries) {
          this.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              success: true
            });
          });
        }
      }
    }
  }, {
    key: "updateCorrect",
    value: function updateCorrect(add) {
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          correct: prev.correct + add
        });
      });
    }
  }, {
    key: "updateTries",
    value: function updateTries(add) {
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          tries: prev.tries + add
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "sound"
      }, audio === "true" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("audio", null, /*#__PURE__*/React.createElement("source", {
        src: this.props.audio,
        type: "audio/mpeg"
      })), /*#__PURE__*/React.createElement("img", {
        onClick: this.play,
        className: "listen",
        src: "media/topics/play.png"
      })) : "/" + this.props.sound.sound + "/", /*#__PURE__*/React.createElement("div", {
        className: "options"
      }, this.img.map(function (img, i) {
        return /*#__PURE__*/React.createElement(Img, {
          key: i,
          img: img,
          sound: _this5.props.sound.sound,
          updateTries: _this5.updateTries,
          updateCorrect: _this5.updateCorrect,
          finished: _this5.finished
        });
      })), /*#__PURE__*/React.createElement("div", {
        className: "feedback"
      }, this.state.finished && this.state.success && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), /*#__PURE__*/React.createElement("audio", {
        autoPlay: true
      }, /*#__PURE__*/React.createElement("source", {
        src: "media/feedback/" + this.positive[0] + ".ogg",
        type: "audio/ogg"
      }))), this.state.finished && !this.state.success && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }), /*#__PURE__*/React.createElement("audio", {
        autoPlay: true
      }, /*#__PURE__*/React.createElement("source", {
        src: "media/feedback/" + this.negative[0] + ".ogg",
        type: "audio/ogg"
      })))));
    }
  }]);

  return Sound;
}(React.Component);

var Img = /*#__PURE__*/function (_React$Component3) {
  _inherits(Img, _React$Component3);

  var _super3 = _createSuper(Img);

  function Img(props) {
    var _this6;

    _classCallCheck(this, Img);

    _this6 = _super3.call(this, props);
    _this6.state = {
      selected: false
    };
    _this6.word = _this6.props.img.slice(18, parseInt(_this6.props.img.length) - 4);
    _this6.clicked = _this6.clicked.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(Img, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.selected !== this.state.selected) {
        if (this.state.selected) {
          this.props.updateTries(1);

          if (this.word.startsWith(this.props.sound)) {
            this.props.updateCorrect(1);
          }
        } else {
          if (this.word.startsWith(this.props.sound)) {
            this.props.updateCorrect(-1);
          }

          this.props.updateTries(-1);
        }
      }
    }
  }, {
    key: "clicked",
    value: function clicked() {
      if (!this.state.selected && !this.props.finished()) {
        this.setState(function (prev) {
          return {
            selected: true
          };
        });
      } else if (this.state.selected && !this.props.finished()) {
        this.setState(function (prev) {
          return {
            selected: false
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("img", {
        onClick: this.clicked,
        className: this.state.selected ? "green" : "white",
        src: this.props.img
      });
    }
  }]);

  return Img;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Odd, null), document.getElementById("app"));

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
