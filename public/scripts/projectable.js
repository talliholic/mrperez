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

var Projectable = /*#__PURE__*/function (_React$Component) {
  _inherits(Projectable, _React$Component);

  var _super = _createSuper(Projectable);

  function Projectable(props) {
    var _this;

    _classCallCheck(this, Projectable);

    _this = _super.call(this, props);
    _this.state = {
      items: [],
      dataLoaded: false
    };
    return _this;
  }

  _createClass(Projectable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/projectable_data").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          items: json,
          dataLoaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          items = _this$state.items;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, items.map(function (item, i) {
          return /*#__PURE__*/React.createElement(Lesson, {
            key: i,
            data: item
          });
        }));
      }

      return /*#__PURE__*/React.createElement("p", null, "Data did not load");
    }
  }]);

  return Projectable;
}(React.Component);

var Lesson = /*#__PURE__*/function (_React$Component2) {
  _inherits(Lesson, _React$Component2);

  var _super2 = _createSuper(Lesson);

  function Lesson(props) {
    _classCallCheck(this, Lesson);

    return _super2.call(this, props);
  }

  _createClass(Lesson, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "lesson"
      }, /*#__PURE__*/React.createElement("h1", null, this.props.data.question), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", null, this.props.data.textbook)), /*#__PURE__*/React.createElement("h4", null, this.props.data.objective), /*#__PURE__*/React.createElement("h2", null, "Instructions"), this.props.data.instructions.map(function (instruction, i) {
        return /*#__PURE__*/React.createElement(Instruction, {
          className: "instruction",
          key: i,
          data: instruction
        });
      }));
    }
  }]);

  return Lesson;
}(React.Component);

var Instruction = /*#__PURE__*/function (_React$Component3) {
  _inherits(Instruction, _React$Component3);

  var _super3 = _createSuper(Instruction);

  function Instruction(props) {
    _classCallCheck(this, Instruction);

    return _super3.call(this, props);
  }

  _createClass(Instruction, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, this.props.data.command), this.props.data.resource && /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        href: this.props.data.resource
      }, "Resource"));
    }
  }]);

  return Instruction;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Projectable, null), document.getElementById("app"));
