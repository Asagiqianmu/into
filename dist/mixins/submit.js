'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by evanzhou on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SubmitMixin = function (_wepy$mixin) {
  _inherits(SubmitMixin, _wepy$mixin);

  function SubmitMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SubmitMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitMixin.__proto__ || Object.getPrototypeOf(SubmitMixin)).call.apply(_ref, [this].concat(args))), _this), _this.methods = {
      submit: function submit(type, value) {
        //todo 根据type处理点击事件
        switch (type) {
          case 'information':
          case 'petDetail':
          case 'post':
          case 'chat':
            this.$emit(type, 'submit');
            break;
          case 'detail':
            this.$emit(type, value);
            break;
          case 'petManage':
            this.$emit(type, 'add');
            break;
          case 'category':
            this.$emit(type, 'cancel');
            break;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return SubmitMixin;
}(_wepy2.default.mixin);

exports.default = SubmitMixin;