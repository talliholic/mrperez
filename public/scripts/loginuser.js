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

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _this.state = {
      loggedIn: false,
      showSign: false,
      showLog: true
    };
    _this.signup = _this.signup.bind(_assertThisInitialized(_this));
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    _this.logout = _this.logout.bind(_assertThisInitialized(_this));
    _this.logoutAll = _this.logoutAll.bind(_assertThisInitialized(_this));
    _this.showSignUp = _this.showSignUp.bind(_assertThisInitialized(_this));
    _this.showLogIn = _this.showLogIn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "showSignUp",
    value: function showSignUp() {
      this.setState({
        loggedIn: false,
        showSign: true,
        showLog: false
      });
    }
  }, {
    key: "showLogIn",
    value: function showLogIn() {
      this.setState({
        loggedIn: false,
        showSign: false,
        showLog: true
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/loggedin").then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.loggedIn) {
          _this2.setState(function (prevState) {
            return {
              loggedIn: true,
              showSign: false,
              showLog: false
            };
          });
        }
      });
    }
  }, {
    key: "signup",
    value: function signup(e) {
      var _this3 = this;

      e.preventDefault();
      var userForm = e.target.parentNode.children;
      var user = {
        name: userForm[0].value,
        lastname: userForm[1].value,
        email: userForm[2].value,
        password: userForm[3].value
      };
      fetch("/users", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        if (!res.error) {
          _this3.setState({
            loggedIn: false,
            showSign: false,
            showLog: true
          });
        } else {
          alert("There was en error!");
        }
      });
    }
  }, {
    key: "login",
    value: function login(e) {
      var _this4 = this;

      e.preventDefault();
      var userForm = e.target.parentNode.children;
      var user = {
        email: userForm[0].value,
        password: userForm[1].value
      };
      fetch("/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        if (!res.error) {
          _this4.setState({
            loggedIn: true,
            showSign: false,
            showLog: false
          });
        } else {
          alert("There was an error!");
        }
      });
    }
  }, {
    key: "logout",
    value: function logout(e) {
      e.preventDefault();
      this.setState({
        loggedIn: false,
        showSign: false,
        showLog: true
      });
      fetch("/users/logout", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        return console.log(res);
      });
    }
  }, {
    key: "logoutAll",
    value: function logoutAll(e) {
      e.preventDefault();
      this.setState({
        loggedIn: false,
        showSign: false,
        showLog: true,
        user: {}
      });
      fetch("/users/logoutAll", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        return console.log(res);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "container"
      }, this.state.showSign && /*#__PURE__*/React.createElement("div", {
        className: "form"
      }, /*#__PURE__*/React.createElement("h1", null, "User Signup"), /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Last Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "email",
        placeholder: "Email"
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        placeholder: "Password",
        autoComplete: "on"
      }), /*#__PURE__*/React.createElement("input", {
        onClick: this.signup,
        type: "submit",
        value: "Sign up"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.showLogIn
      }, "Are you a member? Log in here")), this.state.showLog && /*#__PURE__*/React.createElement("div", {
        className: "form"
      }, /*#__PURE__*/React.createElement("h1", null, "User Login"), /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        type: "email",
        placeholder: "Email"
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        placeholder: "Password",
        autoComplete: "on"
      }), /*#__PURE__*/React.createElement("input", {
        onClick: this.login,
        type: "submit",
        value: "Log in"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.showSignUp
      }, "Not a member? Sign up here")), this.state.loggedIn && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(User, {
        user: this.state.user
      }), /*#__PURE__*/React.createElement("div", {
        className: "userlogout"
      }, /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        onClick: this.logout,
        id: "logoutbutton",
        type: "submit",
        value: "Log out"
      })))));
    }
  }]);

  return App;
}(React.Component);

var User = /*#__PURE__*/function (_React$Component2) {
  _inherits(User, _React$Component2);

  var _super2 = _createSuper(User);

  function User(props) {
    var _this5;

    _classCallCheck(this, User);

    _this5 = _super2.call(this, props);
    _this5.state = {
      quizzes: []
    };
    return _this5;
  }

  _createClass(User, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (res) {
        _this6.setState({
          quizzes: res
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "subcontainer"
      }, this.state.quizzes.length === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "No quiz results yet!")), /*#__PURE__*/React.createElement("table", null, this.state.quizzes.length > 0 && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
        id: "heading"
      }, /*#__PURE__*/React.createElement("th", null, "Topic"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Structure"), /*#__PURE__*/React.createElement("th", null, "Score"))), /*#__PURE__*/React.createElement("tbody", null, this.state.quizzes.length > 0 && this.state.quizzes.map(function (quiz, i) {
        return /*#__PURE__*/React.createElement(Quiz, {
          key: i,
          data: quiz
        });
      }))));
    }
  }]);

  return User;
}(React.Component);

var Quiz = /*#__PURE__*/function (_React$Component3) {
  _inherits(Quiz, _React$Component3);

  var _super3 = _createSuper(Quiz);

  function Quiz(props) {
    _classCallCheck(this, Quiz);

    return _super3.call(this, props);
  }

  _createClass(Quiz, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, this.props.data.context), /*#__PURE__*/React.createElement("td", null, this.props.data.type), /*#__PURE__*/React.createElement("td", null, this.props.data.structure), /*#__PURE__*/React.createElement("td", {
        className: "center"
      }, this.props.data.grade));
    }
  }]);

  return Quiz;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
