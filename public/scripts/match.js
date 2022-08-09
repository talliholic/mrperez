"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
var context = searchParams.get("context");
var index = searchParams.get("index");

var Match = /*#__PURE__*/function (_React$Component) {
  _inherits(Match, _React$Component);

  var _super = _createSuper(Match);

  function Match(props) {
    var _this;

    _classCallCheck(this, Match);

    _this = _super.call(this, props);
    _this.quizzes = [];
    _this.state = {
      answers: [],
      vocab: "",
      structure: "",
      prefix: undefined,
      items: [],
      loaded: false,
      selected: [],
      container: [],
      sorter: [],
      tries: [],
      dropped: [],
      iSel: undefined,
      filled: [],
      origin: [],
      score: 0
    };
    _this.select = _this.select.bind(_assertThisInitialized(_this));
    _this.drop = _this.drop.bind(_assertThisInitialized(_this));
    _this.score = _this.score.bind(_assertThisInitialized(_this));
    _this.processResult = _this.processResult.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Match, [{
    key: "processResult",
    value: function processResult() {
      var _this2 = this;

      fetch("/quizzes/").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.quizzes = json;

        var score = _this2.score();

        var taken = [];

        if (_this2.quizzes.length > 0) {
          taken = _this2.quizzes.filter(function (quiz) {
            return quiz.context === context && quiz.structure === _this2.state.vocab && quiz.type === "Matching";
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
              context: context,
              structure: _this2.state.vocab,
              type: "Matching",
              path: "match?context=" + context + "&index=" + index,
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
    key: "score",
    value: function score() {
      return Math.round(this.state.answers.reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0) / this.state.answers.length * 100);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      var _this3 = this;

      if (state.answers !== this.state.answers) {
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            score: _this3.score()
          });
        });
      }

      if (state.score !== this.state.score) {
        this.processResult();
      }
    }
  }, {
    key: "drop",
    value: function drop(e, i) {
      if (!this.state.filled[i] && this.state.selected[this.state.iSel] && !this.state.dropped[this.state.iSel]) {
        var dropped = _toConsumableArray(this.state.dropped);

        dropped[this.state.iSel] = true;

        var container = _toConsumableArray(this.state.container);

        container[i] = this.state.items[this.state.sorter[this.state.iSel]].img;

        var selected = _toConsumableArray(this.state.selected);

        selected[this.state.iSel] = false;

        var filled = _toConsumableArray(this.state.filled);

        filled[i] = true;

        var origin = _toConsumableArray(this.state.origin);

        origin[i] = this.state.iSel;

        var answers = _toConsumableArray(this.state.answers);

        var tries = _toConsumableArray(this.state.tries);

        if (this.state.items[i].word === this.state.items[this.state.sorter[this.state.iSel]].word && tries[i] === 2) {
          answers[i] = 1;
        } else if (this.state.items[i].word === this.state.items[this.state.sorter[this.state.iSel]].word && tries[i] === 1) {
          answers[i] = 0.5;
        } else {
          tries[i] = tries[i] - 1;
        }

        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            dropped: dropped,
            container: container,
            selected: selected,
            filled: filled,
            origin: origin,
            answers: answers,
            tries: tries
          });
        });
      } else if (this.state.filled[i] && !this.state.selected.includes(true) && this.state.answers[i] === 0 && this.state.tries[i] > 0) {
        var _dropped = _toConsumableArray(this.state.dropped);

        _dropped[this.state.origin[i]] = false;

        var _filled = _toConsumableArray(this.state.filled);

        _filled[i] = false;

        var _container = _toConsumableArray(this.state.container);

        _container[i] = "media/topics/question.jpg";

        var _tries = _toConsumableArray(this.state.tries);

        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            dropped: _dropped,
            container: _container,
            filled: _filled
          });
        });
      }
    }
  }, {
    key: "select",
    value: function select(e, i) {
      if (!this.state.selected[i] && !this.state.dropped[i]) {
        var selected = this.state.selected.map(function (elem) {
          return elem = false;
        });
        selected[i] = true;
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            iSel: i,
            selected: selected
          });
        });
      } else if (this.state.selected[i]) {
        var _selected = this.state.selected.map(function (elem) {
          return elem = false;
        });

        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            iSel: undefined,
            selected: _selected
          });
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      fetch("/vocab_quiz/" + context + "/" + index).then(function (res) {
        return res.json();
      }).then(function (json) {
        var answers = [];
        var selected = [];
        var items = [];
        var container = [];
        var sorter = [];
        var tries = [];
        var dropped = [];
        var filled = [];
        var origin = [];
        json.words.forEach(function (word, i) {
          answers.push(0);
          selected.push(false);
          items.push({
            word: word,
            img: json.img[i]
          });
          container.push("media/topics/question.jpg");
          sorter.push(i);
          tries.push(2);
          dropped.push(false);
          filled.push(false);
          origin.push(null);
        });

        _this4.setState({
          selected: selected,
          answers: answers,
          vocab: json.vocab,
          structure: json.structure,
          prefix: json.prefix,
          items: shuffle(items),
          loaded: true,
          container: container,
          sorter: shuffle(sorter),
          tries: tries,
          dropped: dropped,
          iSel: undefined,
          filled: filled,
          origin: origin,
          score: 0
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "match"
      }, /*#__PURE__*/React.createElement("h2", null, this.state.vocab + " ", "-Matching Game"), /*#__PURE__*/React.createElement("div", {
        className: "instruction"
      }, "Click to select an image on the left. Then click on an empty space on the right to place it. Click on the placed image to change it. You have 2 tries."), this.state.loaded && this.state.items.map(function (item, i) {
        return /*#__PURE__*/React.createElement(Item, {
          key: i,
          i: i,
          img: _this5.state.dropped[i] ? "media/topics/question.jpg" : _this5.state.items[_this5.state.sorter[i]].img,
          empty: _this5.state.container[i],
          word: item.word,
          select: _this5.select,
          selected: _this5.state.selected[i],
          drop: _this5.drop,
          correct: _this5.state.answers[i],
          tries: _this5.state.tries[i]
        });
      }), /*#__PURE__*/React.createElement("div", {
        className: "score"
      }, "Score: ", this.score().toString(), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "play_again",
        onClick: function onClick() {
          return location.reload();
        }
      }, "Play Again")));
    }
  }]);

  return Match;
}(React.Component);

var Item = /*#__PURE__*/function (_React$Component2) {
  _inherits(Item, _React$Component2);

  var _super2 = _createSuper(Item);

  function Item(props) {
    _classCallCheck(this, Item);

    return _super2.call(this, props);
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "left"
      }, /*#__PURE__*/React.createElement("img", {
        className: this.props.selected ? "red" : "white",
        onClick: function onClick(e) {
          return _this6.props.select(e, _this6.props.i);
        },
        src: this.props.img
      }), /*#__PURE__*/React.createElement("figcaption", null, "")), /*#__PURE__*/React.createElement("figure", {
        className: "right"
      }, /*#__PURE__*/React.createElement("img", {
        onClick: function onClick(e) {
          return _this6.props.drop(e, _this6.props.i);
        },
        className: "empty",
        src: this.props.empty
      }), /*#__PURE__*/React.createElement("figcaption", null, this.props.word), /*#__PURE__*/React.createElement("div", {
        className: "feedback"
      }, this.props.correct > 0 && /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), !this.props.correct && this.props.tries < 2 && /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }), !this.props.correct && /*#__PURE__*/React.createElement("div", {
        className: "tries"
      }, this.props.tries !== 1 ? this.props.tries + " tries left" : this.props.tries + " try left"), this.props.tries === 1 && this.props.correct > 0 && /*#__PURE__*/React.createElement("div", {
        className: "tries"
      }, "2nd try!"), this.props.correct === 1 && /*#__PURE__*/React.createElement("div", {
        className: "tries"
      }, "1st try!"))));
    }
  }]);

  return Item;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Match, null), document.getElementById("app"));

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
