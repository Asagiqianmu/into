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

var Feedback = function (_wepy$page) {
  _inherits(Feedback, _wepy$page);

  function Feedback() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Feedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      token: '',
      content: '',
      telphone: '',
      btncolor: '',
      warning: ''
    }, _this.components = {}, _this.methods = {
      changeContent: function changeContent(e) {
        this.content = e.detail.value;
        return this.content;
      },
      telphone: function telphone(e) {
        this.telphone = e.detail.value.replace(/\D/g, '');
        return this.telphone;
      },
      feedback: function feedback() {
        var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var strtel = tel.test(this.telphone);
        var self = this;
        if (!self.content) {
          self.warning = "请输入申诉内容!";
          return;
        } else if (!self.telphone) {
          self.warning = "请输入手机号!";
          return;
        } else if (!strtel) {
          self.warning = "手机号格式不正确!";
          return;
        } else {
          wx.request({
            url: 'https://api.yingtong-pm.cn/v1/client/feedback',
            method: 'POST',
            data: {
              token: self.token,
              content: self.content,
              telphone: self.telphone
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function success(res) {
              var data = res.data;
              if (data.code == 200) {
                wx.showToast({
                  title: data.msg,
                  icon: 'success',
                  duration: 2000,
                  complete: function complete() {
                    setTimeout(function () {
                      wx.redirectTo({
                        url: 'index'
                      });
                    }, 2000);
                  }
                });
              }
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Feedback, [{
    key: 'onLoad',
    value: function onLoad() {
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
                  url: 'login?page=feedback'
                });
              }
            }
          });
        },
        fail: function fail() {
          wx.redirectTo({
            url: 'login?page=feedback'
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

  return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));
