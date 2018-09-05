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

var Payment = function (_wepy$page) {
  _inherits(Payment, _wepy$page);

  function Payment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Payment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Payment.__proto__ || Object.getPrototypeOf(Payment)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      token: '',
      list: [],
      btncolor: ''
    }, _this.components = {}, _this.methods = {
      payment: function payment(id, goodsName, amount) {
        var self = this;
        wx.login({
          success: function success(res) {
            if (res.code) {
              wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/prepay',
                method: 'POST',
                data: {
                  token: self.token,
                  code: res.code,
                  id: id,
                  goodsName: goodsName,
                  price: amount
                },
                header: {
                  "Content-Type": "application/json"
                },
                success: function success(res) {
                  var data = res.data;
                  wx.requestPayment({
                    'timeStamp': data.timeStamp.toString(),
                    'nonceStr': data.nonceStr,
                    'package': 'prepay_id=' + data.package,
                    'signType': data.signType,
                    'paySign': data.paySign,
                    'success': function success(res) {
                      console.log('支付成功', res);
                    },
                    'fail': function fail(res) {
                      console.log('支付失败', res);
                    }
                  });
                }
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Payment, [{
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
                  url: 'login?page=payment'
                });
              } else {
                wx.request({
                  url: 'https://api.yingtong-pm.cn/v1/client/takePayCost',
                  method: 'GET',
                  data: {
                    token: token
                  },
                  header: {
                    "Content-Type": "application/json"
                  },
                  success: function success(res) {
                    var data = res.data;
                    console.log(res);
                    if (data.code == 200) {
                      self.list = data.data;
                    }
                    self.$apply();
                  }
                });
              }
            }
          });
        },
        fail: function fail() {
          wx.redirectTo({
            url: 'login?page=payment'
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

  return Payment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Payment , 'pages/payment'));
