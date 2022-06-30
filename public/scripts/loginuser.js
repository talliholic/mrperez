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
    _this.showPassword = _this.showPassword.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "showPassword",
    value: function showPassword(e) {
      var password = e.target.parentNode.previousSibling.value;

      if (e.target.nextSibling.textContent === "") {
        e.target.nextSibling.textContent = password;
      } else {
        e.target.nextSibling.textContent = "";
      }
    }
  }, {
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
          alert("Tu registro fue exitoso. Ingresa con el correo y clave registrada.");

          _this3.setState({
            loggedIn: false,
            showSign: false,
            showLog: true
          });
        } else {
          alert("Completa todos los campos. Ingresa una clave de mínimo 5 caracteres. Haz clic en REVISA TU CLAVE para que la tengas presente. Asegurate de no haberte registrado antes con el correo que acabas de ingresar. Utiliza un correo electrónico activo.");
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
          alert("Revisa tu clave o correo ingresado.");
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
      }, /*#__PURE__*/React.createElement("h1", null, "Registro de Usuario"), /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Nombre",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Apellido",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "email",
        placeholder: "Correo Electr\xF3nico",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        placeholder: "Clave",
        autoComplete: "on",
        required: true,
        minLength: "5"
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        onClick: this.showPassword,
        className: "show_password_button"
      }, "Revisa tu clave"), /*#__PURE__*/React.createElement("div", {
        className: "show_password"
      })), /*#__PURE__*/React.createElement("input", {
        onClick: this.signup,
        type: "submit",
        value: "Reg\xEDstrate"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.showLogIn
      }, "\xBFYa est\xE1s registrado?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        id: "forgot",
        href: "/forgot-password"
      }, "\xBFOlvidaste tu clave?")), this.state.showLog && /*#__PURE__*/React.createElement("div", {
        className: "form"
      }, /*#__PURE__*/React.createElement("h1", null, "Ingreso"), /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        type: "email",
        placeholder: "Correo Electr\xF3nico",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        placeholder: "Clave",
        autoComplete: "on",
        required: true
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        onClick: this.showPassword,
        className: "show_password_button"
      }, "Revisa tu clave"), /*#__PURE__*/React.createElement("div", {
        className: "show_password"
      })), /*#__PURE__*/React.createElement("input", {
        onClick: this.login,
        type: "submit",
        value: "Ingresa"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.showSignUp
      }, "Reg\xEDstrate ac\xE1"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        id: "forgot",
        href: "/forgot-password"
      }, "\xBFOlvidaste tu clave?")), this.state.loggedIn && /*#__PURE__*/React.createElement("div", {
        className: "profile"
      }, /*#__PURE__*/React.createElement(User, null), /*#__PURE__*/React.createElement(Quizzes, {
        user: this.state.user,
        logout: this.logout
      }), /*#__PURE__*/React.createElement(Leaderboard, null)));
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
      user: {},
      changeName: false
    };
    _this5.changeName = _this5.changeName.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(User, [{
    key: "changeName",
    value: function changeName(e) {
      e.preventDefault();
      var name = e.target.name.value;
      var lastname = e.target.lastname.value;
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          changeName: false
        });
      });
      fetch("/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          lastname: lastname
        })
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        return location.reload();
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      fetch("/users/me").then(function (res) {
        return res.json();
      }).then(function (res) {
        return _this6.setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            user: res
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "perfil"
      }, /*#__PURE__*/React.createElement("h2", null, "My Profile"), /*#__PURE__*/React.createElement("p", null, "My username is ", this.state.user.name, " ", this.state.user.lastname, "."), /*#__PURE__*/React.createElement("p", null, "My email is ", this.state.user.email, "."), /*#__PURE__*/React.createElement("a", {
        onClick: function onClick() {
          return _this7.setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              changeName: !prev.changeName
            });
          });
        },
        href: "#"
      }, "Change my username"), this.state.changeName && /*#__PURE__*/React.createElement("form", {
        onSubmit: this.changeName
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "New Name",
        minLength: "2",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "lastname",
        placeholder: "New Lastname",
        minLength: "2",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "Change"
      })));
    }
  }]);

  return User;
}(React.Component);

var Quizzes = /*#__PURE__*/function (_React$Component3) {
  _inherits(Quizzes, _React$Component3);

  var _super3 = _createSuper(Quizzes);

  function Quizzes(props) {
    var _this8;

    _classCallCheck(this, Quizzes);

    _this8 = _super3.call(this, props);
    _this8.state = {
      quizzes: [],
      scores: []
    };
    _this8.getScore = _this8.getScore.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Quizzes, [{
    key: "getScore",
    value: function getScore(score) {
      this.setState(function (prev) {
        return {
          quizzes: prev.quizzes,
          scores: prev.scores.concat(score)
        };
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this9 = this;

      if (prevState.quizzes !== this.state.quizzes) {
        this.state.quizzes.forEach(function (quiz) {
          return _this9.getScore(quiz.grade);
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this10 = this;

      fetch("/quizzes").then(function (res) {
        return res.json();
      }).then(function (res) {
        _this10.setState({
          quizzes: res,
          scores: []
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "subcontainer"
      }, this.state.quizzes.length === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "No quiz results yet! Take a quiz!")), /*#__PURE__*/React.createElement("h2", null, "My Quizzes"), /*#__PURE__*/React.createElement("div", {
        id: "total_score"
      }, "I have scored", " ", /*#__PURE__*/React.createElement("b", null, this.state.scores.reduce(function (partialSum, a) {
        return partialSum + a;
      }, 0)), " ", "pts."), /*#__PURE__*/React.createElement("table", {
        id: "my-scores"
      }, this.state.quizzes.length > 0 && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
        id: "heading"
      }, /*#__PURE__*/React.createElement("th", null, "Description"), /*#__PURE__*/React.createElement("th", null, "Score"), /*#__PURE__*/React.createElement("th", null, "Link"))), /*#__PURE__*/React.createElement("tbody", null, this.state.quizzes.length > 0 && this.state.quizzes.map(function (quiz, i) {
        return /*#__PURE__*/React.createElement(Quiz, {
          key: i,
          data: quiz
        });
      }))), /*#__PURE__*/React.createElement("div", {
        className: "userlogout"
      }, /*#__PURE__*/React.createElement("form", {
        className: "user_form"
      }, /*#__PURE__*/React.createElement("input", {
        onClick: this.props.logout,
        id: "logoutbutton",
        type: "submit",
        value: "Log out"
      }))));
    }
  }]);

  return Quizzes;
}(React.Component);

var Quiz = /*#__PURE__*/function (_React$Component4) {
  _inherits(Quiz, _React$Component4);

  var _super4 = _createSuper(Quiz);

  function Quiz(props) {
    _classCallCheck(this, Quiz);

    return _super4.call(this, props);
  }

  _createClass(Quiz, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, this.props.data.context, "-", this.props.data.type, "-", this.props.data.structure), /*#__PURE__*/React.createElement("td", {
        className: "center"
      }, this.props.data.grade), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
        href: this.props.data.path
      }, "Retake")));
    }
  }]);

  return Quiz;
}(React.Component);

var Leaderboard = /*#__PURE__*/function (_React$Component5) {
  _inherits(Leaderboard, _React$Component5);

  var _super5 = _createSuper(Leaderboard);

  function Leaderboard(props) {
    var _this11;

    _classCallCheck(this, Leaderboard);

    _this11 = _super5.call(this, props);
    _this11.state = {
      leaders: []
    };
    return _this11;
  }

  _createClass(Leaderboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this12 = this;

      fetch("/leaderboard").then(function (res) {
        return res.json();
      }).then(function (res) {
        var leaders = [];

        for (var i = 0; i < 30; i++) {
          leaders.push(res[i]);
        }

        _this12.setState({
          leaders: leaders
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "leaders"
      }, /*#__PURE__*/React.createElement("h2", null, "Leaderboard"), /*#__PURE__*/React.createElement("h3", null, "Most Points - Top 30"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Points"))), /*#__PURE__*/React.createElement("tbody", null, this.state.leaders.map(function (leader, i) {
        return /*#__PURE__*/React.createElement("tr", {
          key: i
        }, /*#__PURE__*/React.createElement("td", null, i + 1), /*#__PURE__*/React.createElement("td", null, leader.user.split(" ")[0] + " " + leader.user.split(" ")[1].charAt(0)), /*#__PURE__*/React.createElement("td", {
          className: "total"
        }, leader.totalScore));
      }))));
    }
  }]);

  return Leaderboard;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
