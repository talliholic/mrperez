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
      items: [],
      dataLoaded: false
    };
    return _this;
  }

  _createClass(Practice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var searchParams = new URLSearchParams(window.location.search);
      fetch("/vocab_quiz/" + searchParams.get("context") + "/" + searchParams.get("index")).then(function (res) {
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
        console.log(items);
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, items.prefix && /*#__PURE__*/React.createElement("h1", null, "...", items.structure), !items.prefix && /*#__PURE__*/React.createElement("h1", null, items.structure, "..."), /*#__PURE__*/React.createElement("div", {
          className: "sentences"
        }, /*#__PURE__*/React.createElement(VocabItem, {
          data: items
        })));
      }

      return /*#__PURE__*/React.createElement("p", null, "Loading...");
    }
  }]);

  return Practice;
}(React.Component);

var VocabItem = /*#__PURE__*/function (_React$Component2) {
  _inherits(VocabItem, _React$Component2);

  var _super2 = _createSuper(VocabItem);

  function VocabItem(props) {
    _classCallCheck(this, VocabItem);

    return _super2.call(this, props);
  }

  _createClass(VocabItem, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.props.data.sentences.map(function (item, i) {
        return /*#__PURE__*/React.createElement("div", {
          className: "section",
          key: i
        }, /*#__PURE__*/React.createElement("figure", {
          className: "vocab",
          key: i
        }, /*#__PURE__*/React.createElement("img", {
          className: "vocab_pic",
          src: _this3.props.data.img[i]
        }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("h3", null, item)), _this3.props.data.audio[i] && /*#__PURE__*/React.createElement("audio", {
          controls: true
        }, /*#__PURE__*/React.createElement("source", {
          src: _this3.props.data.audio[i],
          type: "audio/mpeg"
        }))));
      });
    }
  }]);

  return VocabItem;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Practice, null), document.getElementById("app"));
