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
      item: [],
      dataLoaded: false
    };
    return _this;
  }

  _createClass(Practice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/vocabulary/").then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          item: json,
          dataLoaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          dataLoaded = _this$state.dataLoaded,
          item = _this$state.item;

      if (dataLoaded) {
        return /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("h1", null, "Transition Skills"), item.topics.map(function (topic, i) {
          return /*#__PURE__*/React.createElement(Topic, {
            key: i,
            data: item.vocab.filter(function (voc) {
              return voc.context === topic;
            }),
            topic: topic
          });
        }));
      }

      return /*#__PURE__*/React.createElement("p", null, "Data did not load");
    }
  }]);

  return Practice;
}(React.Component);

var Topic = function Topic(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topic"
  }, /*#__PURE__*/React.createElement("h2", null, props.topic), props.data.map(function (structure, i) {
    return /*#__PURE__*/React.createElement(Structure, {
      key: i,
      data: structure
    });
  }));
};

var Structure = function Structure(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "structure"
  }, props.data.prefix && /*#__PURE__*/React.createElement("h2", null, "...", props.data.structure), !props.data.prefix && /*#__PURE__*/React.createElement("h2", null, props.data.structure, "..."), /*#__PURE__*/React.createElement("div", {
    className: "resources"
  }, /*#__PURE__*/React.createElement("a", {
    id: "gray",
    href: props.data.vocabulary
  }, "Vocabulary"), /*#__PURE__*/React.createElement("a", {
    id: "white",
    href: props.data.sentences
  }, "Sentences"), /*#__PURE__*/React.createElement("a", {
    id: "green",
    href: props.data.readingQuiz
  }, "Reading Quiz"), props.data.listeningQuiz && /*#__PURE__*/React.createElement("a", {
    id: "yellow",
    href: props.data.listeningQuiz
  }, "Listening Quiz"), props.data.unscrambleWord && /*#__PURE__*/React.createElement("a", {
    id: "pink",
    href: props.data.unscrambleWord
  }, "Unscramble the word"), /*#__PURE__*/React.createElement("a", {
    id: "blue",
    href: props.data.unscrambleSentence
  }, "Unscramble the sentence"), /*#__PURE__*/React.createElement("a", {
    id: "other",
    href: props.data.paper
  }, "Paper Quiz")));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Practice, null), document.getElementById("app"));
