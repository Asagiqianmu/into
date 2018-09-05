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

var ForgetPass = function (_wepy$page) {
    _inherits(ForgetPass, _wepy$page);

    function ForgetPass() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, ForgetPass);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = ForgetPass.__proto__ || Object.getPrototypeOf(ForgetPass)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            btncolor: '#05a473',
            telphone: '',
            vercode: '',
            warning: '',
            hidden: true,
            nocancel: true,
            buttonDisable: false
        }, _this2.components = {}, _this2.methods = {
            telphone: function telphone(e) {
                this.telphone = e.detail.value.replace(/[^0-9]/, '');
                return this.telphone;
                console.log(this.telphone);
            },
            vercode: function vercode(e) {
                this.vercode = e.detail.value.replace(/[^0-9]/, '');
                return this.vercode;
                console.log(this.vercode);
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(ForgetPass, [{
        key: 'onLoad',
        value: function onLoad() {
            this.setData({
                verifyCode: '获取验证'
            });
        }
    }, {
        key: 'getcode',
        value: function getcode() {
            var _this = this;
            var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var strtel = tel.test(this.telphone);
            if (!this.telphone) {
                this.warning = "手机号不能为空!";
                return;
            } else if (!strtel) {
                this.warning = "手机号格式不正确!";
                return;
            } else {
                this.warning = "";
            }

            wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/getcode',
                data: {
                    telphone: _this.telphone
                },
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function success(res) {
                    var data = res.data;
                    console.log(data);
                    if (data.code == 200) {
                        _this.setData({
                            ctime: data.ctime
                        });
                        wx.showToast({
                            title: data.msg,
                            icon: 'success',
                            duration: 3000
                        });
                        if (_this.data.buttonDisable) return false;
                        var c = 60;
                        var intervalId = setInterval(function () {
                            c = c - 1;
                            _this.setData({
                                verifyCode: c + 's后重发',
                                buttonDisable: true
                            });
                            if (c == 0) {
                                clearInterval(intervalId);
                                _this.setData({
                                    verifyCode: '获取验证',
                                    buttonDisable: false
                                });
                            }
                        }, 1000);
                    } else {
                        wx.showToast({
                            title: data.msg,
                            icon: 'success',
                            duration: 3000
                        });
                    }
                }
            });
        }
    }, {
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
        key: 'submit',
        value: function submit() {
            var _this = this;
            var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var strtel = tel.test(this.telphone);
            var appId = 'wxf56fd8fb6499bccb';
            if (!this.telphone) {
                this.warning = "手机号不能为空!";
                return;
            } else if (!strtel) {
                this.warning = "手机号格式不正确!";
                return;
            } else if (!this.vercode) {
                this.warning = "验证码不能为空!";
                return;
            } else {
                this.warning = "";
            }
            wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/forgetpwd',
                data: {
                    appid: appId,
                    telphone: _this.telphone,
                    code: _this.vercode,
                    ctime: _this.ctime
                },
                methods: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function success(res) {
                    var data = res.data;
                    if (data.code == 200) {
                        _this.setData({
                            hidden: false
                        });
                        /*wx.showToast({
                            title: '成功',
                            icon:'success',
                            duration:2000
                        })*/
                    } else {
                        _this.setData({
                            warning: '验证码不正确! 请重新输入'
                        });
                        /*wx.showToast({
                            title: '修改失败',
                            icon:'success',
                            duration:3000
                        })*/
                    }
                }
            });
        }
    }]);

    return ForgetPass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ForgetPass , 'pages/forget-pass'));
