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

var Vocabulary = /*#__PURE__*/function (_React$Component) {
  _inherits(Vocabulary, _React$Component);

  var _super = _createSuper(Vocabulary);

  function Vocabulary(props) {
    var _this;

    _classCallCheck(this, Vocabulary);

    _this = _super.call(this, props);
    _this.state = {
      items: [],
      unique: []
    };
    return _this;
  }

  _createClass(Vocabulary, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (this.state.items !== state.items) {
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            unique: prev.items.complement ? prev.items.complement.filter(onlyUnique) : []
          });
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var searchParams = new URLSearchParams(window.location.search);
      fetch("/vocab_quiz/" + searchParams.get("context") + "/" + searchParams.get("index")).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            items: json
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React.createElement("div", null, this.state.items.words && /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, this.state.items.prefix && this.state.items.context !== "Assessment" && /*#__PURE__*/React.createElement("h1", null, "...", this.state.items.structure), !this.state.items.prefix && this.state.items.context !== "Assessment" && /*#__PURE__*/React.createElement("h1", null, this.state.items.structure, "..."), this.state.items.context === "Assessment" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, this.state.items.vocab), /*#__PURE__*/React.createElement("div", {
        className: "stru"
      }, this.state.unique.map(function (structure, i) {
        return /*#__PURE__*/React.createElement("span", {
          className: "struc",
          key: i
        }, cap(structure));
      }))), /*#__PURE__*/React.createElement("div", {
        className: "words"
      }, this.state.items.words.map(function (word, i) {
        return /*#__PURE__*/React.createElement(Word, {
          key: i,
          word: word,
          img: _this3.state.items.img[i]
        });
      }))));
    }
  }]);

  return Vocabulary;
}(React.Component);

var Word = function Word(props) {
  return /*#__PURE__*/React.createElement("figure", {
    className: "word"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.img
  }), /*#__PURE__*/React.createElement("figcaption", null, " ", props.word));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Vocabulary, null), document.getElementById("app"));

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
