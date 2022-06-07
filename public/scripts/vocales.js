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
var título = searchParams.get("título");

var Vocales = /*#__PURE__*/function (_React$Component) {
  _inherits(Vocales, _React$Component);

  var _super = _createSuper(Vocales);

  function Vocales(props) {
    var _this;

    _classCallCheck(this, Vocales);

    _this = _super.call(this, props);
    _this.state = {
      vocales: [],
      loaded: false
    };
    return _this;
  }

  _createClass(Vocales, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/cargar-vocales/" + título).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          vocales: json,
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
          className: "juego"
        }, /*#__PURE__*/React.createElement("h1", null, this.state.vocales.título), /*#__PURE__*/React.createElement("div", {
          className: "instrucci\xF3n"
        }, "Mira la imagen y completa las vocales."), this.state.vocales.palabras.map(function (pregunta, i) {
          return /*#__PURE__*/React.createElement(Pregunta, {
            className: "pregunta",
            key: i,
            palabra: pregunta.palabra,
            imágen: _this3.state.vocales.imágenes[i],
            números: pregunta.vocales
          });
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", null, "Cargando contenido...");
      }
    }
  }]);

  return Vocales;
}(React.Component);

var Pregunta = /*#__PURE__*/function (_React$Component2) {
  _inherits(Pregunta, _React$Component2);

  var _super2 = _createSuper(Pregunta);

  function Pregunta(props) {
    var _this4;

    _classCallCheck(this, Pregunta);

    _this4 = _super2.call(this, props);
    _this4.state = {
      respuesta: [],
      tries: 0,
      correct: false,
      finished: false
    };
    _this4.changeInput = _this4.changeInput.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Pregunta, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.tries !== this.state.tries) {
        if (this.props.números.length === this.state.tries) {
          if (this.state.respuesta.join("") === this.props.palabra) {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: true,
                finished: true
              });
            });
          } else {
            this.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                correct: false,
                finished: true
              });
            });
          }
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.números.length === 2) {
        var palabra = _toConsumableArray(this.props.palabra);

        palabra[this.props.números[0] - 1] = "_";
        palabra[this.props.números[1] - 1] = "_";
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            respuesta: palabra
          });
        });
      } else {
        var _palabra = _toConsumableArray(this.props.palabra);

        _palabra[this.props.números[0] - 1] = "_";
        _palabra[this.props.números[1] - 1] = "_";
        _palabra[this.props.números[2] - 1] = "_";
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            respuesta: _palabra
          });
        });
      }
    }
  }, {
    key: "changeInput",
    value: function changeInput(letter) {
      if (this.props.números.length === 2) {
        var respuesta = _toConsumableArray(this.state.respuesta);

        if (this.state.tries === 0) {
          respuesta[this.props.números[0] - 1] = letter;
        } else if (this.state.tries === 1) {
          respuesta[this.props.números[1] - 1] = letter;
        }

        this.setState(function (prev) {
          return {
            respuesta: respuesta,
            tries: prev.tries + 1
          };
        });
      } else {
        var _respuesta = _toConsumableArray(this.state.respuesta);

        if (this.state.tries === 0) {
          _respuesta[this.props.números[0] - 1] = letter;
        } else if (this.state.tries === 1) {
          _respuesta[this.props.números[1] - 1] = letter;
        } else if (this.state.tries === 2) {
          _respuesta[this.props.números[2] - 1] = letter;
        }

        this.setState(function (prev) {
          return {
            respuesta: _respuesta,
            tries: prev.tries + 1
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "pregunta"
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.imágen
      }), /*#__PURE__*/React.createElement("div", {
        className: "palabra"
      }, this.state.respuesta.map(function (letra, i) {
        return /*#__PURE__*/React.createElement("span", {
          key: i,
          className: "letra"
        }, letra);
      })), /*#__PURE__*/React.createElement("div", {
        className: "retroalimentaci\xF3n"
      }, this.state.finished && this.state.correct && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        className: "check",
        src: "media/topics/check.jpg"
      }), /*#__PURE__*/React.createElement("audio", {
        autoPlay: true
      }, /*#__PURE__*/React.createElement("source", {
        src: "media/feedback/felicitaciones.ogg",
        type: "audio/ogg"
      }))), this.state.finished && !this.state.correct && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        className: "cross",
        src: "media/topics/cross.png"
      }), /*#__PURE__*/React.createElement("audio", {
        autoPlay: true
      }, /*#__PURE__*/React.createElement("source", {
        src: "media/feedback/sigue_practicando.ogg",
        type: "audio/ogg"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "keyboard"
      }, ["a", "e", "i", "o", "u"].map(function (key, i) {
        return /*#__PURE__*/React.createElement(Key, {
          className: "key",
          changeInput: _this5.changeInput,
          key: i,
          vocal: key
        });
      })));
    }
  }]);

  return Pregunta;
}(React.Component);

var Key = /*#__PURE__*/function (_React$Component3) {
  _inherits(Key, _React$Component3);

  var _super3 = _createSuper(Key);

  function Key(props) {
    var _this6;

    _classCallCheck(this, Key);

    _this6 = _super3.call(this, props);
    _this6.input = _this6.input.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(Key, [{
    key: "input",
    value: function input(e) {
      this.props.changeInput(e.target.textContent);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("span", {
        className: "vocal",
        onClick: this.input
      }, this.props.vocal);
    }
  }]);

  return Key;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Vocales, null), document.getElementById("app"));

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
