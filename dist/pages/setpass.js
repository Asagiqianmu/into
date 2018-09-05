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

var Setpass = function (_wepy$page) {
    _inherits(Setpass, _wepy$page);

    function Setpass() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Setpass);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Setpass.__proto__ || Object.getPrototypeOf(Setpass)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            token: '',
            setnewpass: '',
            surenewpass: '',
            warning: '',
            btncolor: '',
            hidden: true,
            nocancel: true
        }, _this2.components = {}, _this2.methods = {
            setnewpass: function setnewpass(e) {
                this.setnewpass = e.detail.value.replace(/[\W]/g, '');
                return this.setnewpass;
            },
            surenewpass: function surenewpass(e) {
                this.surenewpass = e.detail.value.replace(/[\W]/g, '');
                return this.surenewpass;
            },
            setpass: function setpass() {
                var self = this;
                if (!self.setnewpass) {
                    this.warning = '请输入密码';
                    return;
                } else {
                    if (self.setnewpass.length < 6) {
                        this.warning = '密码长度必须大于6位';
                        return;
                    }
                }
                if (!self.surenewpass) {
                    this.warning = '请再次输入密码';
                    return;
                } else {
                    if (self.surenewpass.length < 6) {
                        this.warning = '密码长度必须大于6位';
                        return;
                    }
                }
                if (self.setnewpass != self.surenewpass) {
                    this.warning = '两次密码不一致，请重新输入';
                    return;
                } else {
                    this.warning = '';
                }
                wx.request({
                    url: 'https://api.yingtong-pm.cn/v1/client/updatePwd',
                    data: {
                        token: self.token,
                        passWord1: self.setnewpass,
                        passWord2: self.surenewpass
                    },
                    method: 'POST',
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function success(res) {
                        var data = res.data;
                        if (data.code == 200) {
                            self.setData({
                                hidden: false
                            });
                        } else {
                            wx.showToast({
                                title: '修改失败',
                                icon: 'success',
                                duration: 3000
                            });
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Setpass, [{
        key: 'confirm',
        value: function confirm() {
            var _this = this;
            _this.setData({
                hidden: true
            });
            wx.reLaunch({
                url: 'login?page=login'
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(e) {
            var self = this;
            wx.getStorage({
                key: 'token',

                success: function success(res) {
                    var token = self.token = res.data;
                    wx.request({
                        url: 'https://api.yingtong-pm.cn/v1/client/checklogin',
                        method: 'GET',
                        data: {
                            token: token
                        },

                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function success(res) {
                            var data = res.data;

                            if (data.code != 200) {
                                wx.redirectTo({
                                    url: 'login?page=index'
                                });
                            } else {}
                        }
                    });
                }
            });

            wx.getStorage({
                key: 'btncolor',
                success: function success(res) {
                    var btncolor = self.btncolor = res.data;
                }
            });
        }
    }]);

    return Setpass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Setpass , 'pages/setpass'));
