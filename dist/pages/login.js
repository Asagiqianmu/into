'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
    _inherits(Login, _wepy$page);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            page: '',
            username: '',
            password: '',
            warning: '',
            btncolor: '#05a473',
            inputtext: '',
            inputpass: '',
            pass: "password",
            replace_icon: "icon icon-2"
        }, _this.components = {}, _this.methods = {
            icon_clear: function icon_clear() {
                this.setData({
                    inputtext: ''
                });
            },
            usernameInput: function usernameInput(e) {
                this.username = e.detail.value.replace(/\D/g, '');
                return this.username;
            },
            passwordInput: function passwordInput(e) {
                this.password = e.detail.value;
                return this.password;
            },
            hidepassword: function hidepassword() {
                if (this.pass == "password") {
                    this.pass = "text";
                    this.replace_icon = "icon icon-22";
                } else {
                    this.pass = "password";
                    this.replace_icon = "icon icon-2";
                }
            },

            /*            register(){
                            wx.navigateTo({
                                url: 'userregister'
                            });
                        },*/
            login: function login() {
                var self = this;
                var appId = 'wxf56fd8fb6499bccb';
                var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                var strtel = tel.test(this.username);
                if (!this.username) {
                    this.warning = "手机号不能为空!";
                    return;
                } else if (!strtel) {
                    this.warning = "手机号格式不正确!";
                    return;
                } else if (!this.password) {
                    this.warning = '密码不能为空';
                } else {
                    this.warning = '';
                    wx.request({
                        url: 'https://api.yingtong-pm.cn/v1/client/dologin',
                        data: {
                            appid: appId,
                            userName: this.username,
                            passWord: this.password
                        },
                        method: 'POST',
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function success(res) {
                            var page = self.page;
                            var data = res.data;
                            if (data.code == 200) {
                                wx.showToast({
                                    title: '登陆成功',
                                    icon: 'success',
                                    duration: 2000,
                                    complete: function complete() {
                                        wx.setStorage({
                                            key: "token",
                                            data: data.msg
                                        });
                                        wx.setStorage({
                                            key: "btncolor",
                                            data: self.btncolor

                                        });
                                        wx.setStorage({
                                            key: "iconimgUrl",
                                            data: self.iconimgUrl
                                        });

                                        wx.redirectTo({
                                            url: page || 'index'
                                        });
                                    }
                                });
                            } else {
                                self.setData({
                                    warning: '用户名或者密码不正确! 请重新输入'
                                    /*inputpass:''*/
                                });
                                /*wx.showToast({
                                    title: data.msg,
                                    icon: 'success',
                                    duration: 3000
                                });*/
                            }
                        }
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'onLoad',
        value: function onLoad(e) {
            this.page = e.page;
            this.$apply();
            var appId = 'wxf56fd8fb6499bccb';
            var seft = this;
            wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/getImg',
                data: {
                    appid: appId
                },
                method: 'GET',
                header: {
                    "Content-Type": "application/json"
                },

                success: function success(res) {
                    var data = res.data;

                    // var bgColor = seft.data.btncolor == '#38b1fa' ? '#5cb85c' : '#38b1fa';

                    if (data.code == 200) {
                        seft.setData({
                            imgUrl: 'https://api.yingtong-pm.cn' + data.logo,
                            bg_imgUrl: 'https://api.yingtong-pm.cn' + data.bg,
                            iconimgUrl: 'https://api.yingtong-pm.cn' + data.icon
                        });
                    }
                }
            });
        }
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));
