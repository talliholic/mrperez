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
var pageNum = searchParams.get("page");

var Projectable = /*#__PURE__*/function (_React$Component) {
  _inherits(Projectable, _React$Component);

  var _super = _createSuper(Projectable);

  function Projectable(props) {
    var _this;

    _classCallCheck(this, Projectable);

    _this = _super.call(this, props);
    _this.state = {
      items: [],
      dataLoaded: false,
      showMenu: false,
      showPic: false
    };
    return _this;
  }

  _createClass(Projectable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!pageNum) {
        this.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            showMenu: true,
            showPic: true
          });
        });
      }

      fetch("/projectable_data").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            items: json,
            dataLoaded: true
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          items = _this$state.items;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("div", {
          onClick: function onClick() {
            return _this3.setState(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                showMenu: !prev.showMenu
              });
            });
          },
          id: "show-menu"
        }, "Menu"), this.state.showPic && /*#__PURE__*/React.createElement("img", {
          id: "bg-read",
          src: "media/topics/read_write.jpg"
        }), this.state.showMenu && /*#__PURE__*/React.createElement("div", {
          id: "textbookNav"
        }, /*#__PURE__*/React.createElement(Textbook, {
          textbook: "Language Notebook",
          data: this.state.items
        }), /*#__PURE__*/React.createElement(Textbook, {
          textbook: "Language Book",
          data: this.state.items
        }), /*#__PURE__*/React.createElement(Textbook, {
          textbook: "Math Notebook",
          data: this.state.items
        }), /*#__PURE__*/React.createElement(Textbook, {
          textbook: "Math Book",
          data: this.state.items
        })), pageNum && items.filter(function (item) {
          return item.textbook === pageNum;
        }).map(function (item, i) {
          return /*#__PURE__*/React.createElement(Lesson, {
            key: i,
            data: item
          });
        }));
      }

      return /*#__PURE__*/React.createElement("p", null, "Loading...");
    }
  }]);

  return Projectable;
}(React.Component);

var Textbook = /*#__PURE__*/function (_React$Component2) {
  _inherits(Textbook, _React$Component2);

  var _super2 = _createSuper(Textbook);

  function Textbook(props) {
    var _this4;

    _classCallCheck(this, Textbook);

    _this4 = _super2.call(this, props);
    _this4.state = {
      activities: _this4.props.data.filter(function (activity) {
        return activity.textbook.includes(_this4.props.textbook);
      })
    };
    return _this4;
  }

  _createClass(Textbook, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "textbookContent"
      }, /*#__PURE__*/React.createElement("div", {
        className: "textbook"
      }, this.props.textbook), /*#__PURE__*/React.createElement("div", {
        className: "page-links"
      }, this.state.activities.map(function (activity, i) {
        return /*#__PURE__*/React.createElement("a", {
          className: "page",
          key: i,
          href: "?page=" + activity.textbook
        }, activity.textbook.replace(_this5.props.textbook, "Page"));
      })));
    }
  }]);

  return Textbook;
}(React.Component);

var Lesson = /*#__PURE__*/function (_React$Component3) {
  _inherits(Lesson, _React$Component3);

  var _super3 = _createSuper(Lesson);

  function Lesson(props) {
    _classCallCheck(this, Lesson);

    return _super3.call(this, props);
  }

  _createClass(Lesson, [{
    key: "render",
    value: function render() {
      if (this.props.data.objective !== "e") {
        return /*#__PURE__*/React.createElement("div", {
          className: "lesson",
          id: this.props.data.textbook
        }, /*#__PURE__*/React.createElement("div", {
          className: "text"
        }, /*#__PURE__*/React.createElement("h1", null, this.props.data.textbook), /*#__PURE__*/React.createElement("h4", null, this.props.data.question), /*#__PURE__*/React.createElement("h2", null, "Instructions"), /*#__PURE__*/React.createElement("div", {
          className: "lines"
        }), this.props.data.instructions.map(function (instruction, i) {
          return /*#__PURE__*/React.createElement(Instruction, {
            className: "instruction",
            key: i,
            data: instruction
          });
        })), /*#__PURE__*/React.createElement("div", {
          className: "bg"
        }, /*#__PURE__*/React.createElement("img", {
          src: this.props.data.img
        })));
      } else {
        return /*#__PURE__*/React.createElement("div", null);
      }
    }
  }]);

  return Lesson;
}(React.Component);

var Instruction = /*#__PURE__*/function (_React$Component4) {
  _inherits(Instruction, _React$Component4);

  var _super4 = _createSuper(Instruction);

  function Instruction(props) {
    _classCallCheck(this, Instruction);

    return _super4.call(this, props);
  }

  _createClass(Instruction, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
        className: "list"
      }, this.props.data.command, " ", /*#__PURE__*/React.createElement("div", {
        className: "links"
      }, this.props.data.resources && this.props.data.resources.map(function (resource, i) {
        return /*#__PURE__*/React.createElement("a", {
          target: "_blank",
          key: i,
          href: resource.link
        }, resource.type);
      }), this.props.data.embed && /*#__PURE__*/React.createElement("iframe", {
        className: "embed",
        width: "600",
        height: "338",
        frameBorder: "0",
        src: this.props.data.embed,
        webkitallowfullscreen: "true",
        mozallowfullscreen: "true",
        allowFullScreen: true,
        allow: "microphone; camera; display-capture"
      }), this.props.data.embed2 && /*#__PURE__*/React.createElement("iframe", {
        className: "embed2",
        width: "625",
        height: "525",
        src: this.props.data.embed2
      }), this.props.data.youtube && /*#__PURE__*/React.createElement("iframe", {
        className: "embed2",
        width: "560",
        height: "315",
        src: this.props.data.youtube,
        title: "YouTube video player",
        frameBorder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }))));
    }
  }]);

  return Instruction;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Projectable, null), document.getElementById("app"));
