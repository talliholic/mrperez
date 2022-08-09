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

var Results = /*#__PURE__*/function (_React$Component) {
  _inherits(Results, _React$Component);

  var _super = _createSuper(Results);

  function Results(props) {
    var _this;

    _classCallCheck(this, Results);

    _this = _super.call(this, props);
    _this.state = {
      results: []
    };
    return _this;
  }

  _createClass(Results, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/leaderboard").then(function (res) {
        return res.json();
      }).then(function (res) {
        if (!res.error) {
          _this2.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              results: res
            });
          });
        } else {
          window.location.replace("/loginuser");
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "container"
      }, /*#__PURE__*/React.createElement("h2", null, "Students' Results"), this.state.results.length > 0 && this.state.results.map(function (student, i) {
        return /*#__PURE__*/React.createElement(Student, {
          key: i,
          name: student.user,
          quizzes: student.quizzes,
          totalScore: student.totalScore,
          i: i
        });
      }));
    }
  }]);

  return Results;
}(React.Component);

var Student = /*#__PURE__*/function (_React$Component2) {
  _inherits(Student, _React$Component2);

  var _super2 = _createSuper(Student);

  function Student(props) {
    var _this3;

    _classCallCheck(this, Student);

    _this3 = _super2.call(this, props);
    _this3.state = {
      opened: false
    };
    return _this3;
  }

  _createClass(Student, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        className: "rank"
      }, this.props.i + 1), /*#__PURE__*/React.createElement("a", {
        id: this.props.i,
        className: "student",
        onClick: function onClick() {
          return _this4.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              opened: !prev.opened
            });
          });
        },
        href: "#" + this.props.i
      }, this.props.name), /*#__PURE__*/React.createElement("span", {
        className: "score"
      }, this.props.totalScore), this.state.opened && /*#__PURE__*/React.createElement(Quizzes, {
        quizzes: this.props.quizzes
      }));
    }
  }]);

  return Student;
}(React.Component);

var Quizzes = function Quizzes(_ref) {
  var quizzes = _ref.quizzes;
  return /*#__PURE__*/React.createElement("table", {
    className: "quizzes"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Created On"), /*#__PURE__*/React.createElement("th", null, "Updated On"), /*#__PURE__*/React.createElement("th", null, "Topic"), /*#__PURE__*/React.createElement("th", null, "Vocabulary"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Score"))), /*#__PURE__*/React.createElement("tbody", null, quizzes.map(function (quiz, i) {
    return /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", null, quiz.createdAt ? new Date(quiz.createdAt).toLocaleString("es-CO") : ""), /*#__PURE__*/React.createElement("td", null, quiz.updatedAt ? new Date(quiz.updatedAt).toLocaleString("es-CO") : ""), /*#__PURE__*/React.createElement("td", null, quiz.context), /*#__PURE__*/React.createElement("td", null, quiz.structure), /*#__PURE__*/React.createElement("td", null, quiz.type), /*#__PURE__*/React.createElement("td", {
      className: "score-td"
    }, quiz.score), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
      href: quiz.path
    }, "See Quiz")));
  })));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Results, null), document.getElementById("app"));
