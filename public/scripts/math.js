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

var searchParams = new URLSearchParams(window.location.search);
var topic = searchParams.get("topic");

var Quiz = /*#__PURE__*/function (_React$Component) {
  _inherits(Quiz, _React$Component);

  var _super = _createSuper(Quiz);

  function Quiz(props) {
    _classCallCheck(this, Quiz);

    return _super.call(this, props);
  }

  _createClass(Quiz, [{
    key: "render",
    value: function render() {
      switch (topic) {
        case "doubles":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Doubles, null), /*#__PURE__*/React.createElement(Doubles, null));

        case "doubles Missing":
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DoublesM, null), /*#__PURE__*/React.createElement(DoublesM, null));

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
    var _this;

    _classCallCheck(this, Doubles);

    _this = _super2.call(this, props);
    _this.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return _this;
  }

  _createClass(Doubles, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", null, "Name: "), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Doubles"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to solve the addition sentences."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(Double, {
          key: i,
          addend: addend
        });
      })));
    }
  }]);

  return Doubles;
}(React.Component);

var Double = /*#__PURE__*/function (_React$Component3) {
  _inherits(Double, _React$Component3);

  var _super3 = _createSuper(Double);

  function Double(props) {
    _classCallCheck(this, Double);

    return _super3.call(this, props);
  }

  _createClass(Double, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend, "", " +", "", " ", this.props.addend, " =", " "), /*#__PURE__*/React.createElement("input", {
        type: "number",
        disabled: true
      }));
    }
  }]);

  return Double;
}(React.Component);

var DoublesM = /*#__PURE__*/function (_React$Component4) {
  _inherits(DoublesM, _React$Component4);

  var _super4 = _createSuper(DoublesM);

  function DoublesM(props) {
    var _this2;

    _classCallCheck(this, DoublesM);

    _this2 = _super4.call(this, props);
    _this2.addends = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    return _this2;
  }

  _createClass(DoublesM, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", null, "Name: "), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
        className: "quiz"
      }, /*#__PURE__*/React.createElement("h1", null, "Doubles"), /*#__PURE__*/React.createElement("div", {
        id: "instruction"
      }, "Use any strategy to find the missing part that makes the double."), this.addends.map(function (addend, i) {
        return /*#__PURE__*/React.createElement(DoubleM, {
          key: i,
          addend: addend
        });
      })));
    }
  }]);

  return DoublesM;
}(React.Component);

var DoubleM = /*#__PURE__*/function (_React$Component5) {
  _inherits(DoubleM, _React$Component5);

  var _super5 = _createSuper(DoubleM);

  function DoubleM(props) {
    _classCallCheck(this, DoubleM);

    return _super5.call(this, props);
  }

  _createClass(DoubleM, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
        className: "sentence"
      }, this.props.addend + " ", " +", " ", /*#__PURE__*/React.createElement("input", {
        onChange: this.check,
        type: "number",
        disabled: true
      }), " =", " ", this.props.addend * 2));
    }
  }]);

  return DoubleM;
}(React.Component);

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
