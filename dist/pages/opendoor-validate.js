'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpendoorValidate = function (_wepy$page) {
    _inherits(OpendoorValidate, _wepy$page);

    function OpendoorValidate() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OpendoorValidate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OpendoorValidate.__proto__ || Object.getPrototypeOf(OpendoorValidate)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            showDialog: false,
            dialogLoading: false,
            dialogFail: false,
            dialogSuccess: false,
            //showModal: false,
            inputname: '',
            inputpas: '',
            inputtime: ''
        }, _this.components = {}, _this.methods = {
            hideDialog: function hideDialog() {
                if (!this.dialogLoading) {
                    this.showDialog = false;
                    this.dialogSuccess = false;
                    this.dialogFail = false;
                }
            },
            openDoor: function openDoor(key_id) {
                var self = this;
                self.showDialog = true;
                self.dialogLoading = true;
                wx.request({
                    url: 'https://api.yingtong-pm.cn/v1/client/opendoor',
                    method: 'POST',
                    data: {
                        token: self.token,
                        key_id: key_id
                    },
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function success(res) {
                        var data = res.data;
                        if (data.code == 200) {
                            self.dialogLoading = false;
                            self.dialogSuccess = true;
                            self.dialogFail = false;
                        } else {
                            self.dialogLoading = false;
                            self.dialogFail = true;
                            self.dialogSuccess = false;
                        }
                        self.$apply();
                    }
                });
            },

            //     opendoorvalidate() {
            //         wx.navigateTo({
            //             url: '../pages/opendoor-validate'
            //         })
            //     }
            // };
            inputname: function inputname(e) {
                this.inputname = e.detail.value.replace(/\D/g, '');
                return this.inputname;
            },
            inputpas: function inputpas(e) {
                this.inputtel = e.detail.value.replace(/[\W]/g, '');
                return this.inputtel;
            },
            inputtime: function inputtime(e) {
                this.inputtime = e.detail.value.replace(/\D/g, '');
                return this.inputtime;
            },

            newopendoor: function newopendoor() {
                this.setData({
                    showModal: true
                });
            },
            /**
             * 弹出框蒙层截断touchmove事件
             */
            preventTouchMove: function preventTouchMove() {},
            /**
             * 隐藏模态对话框
             */
            hideModal: function hideModal() {
                this.setData({
                    showModal: false
                });
            },
            /**
             * 对话框取消按钮点击事件
             */
            onCancel: function onCancel() {
                this.setData({
                    showModal: false
                });
            },
            /**
             * 对话框确认按钮点击事件
             */
            onConfirm: function onConfirm() {
                this.setData({
                    showModal: false
                });
            },

            onload: function onload() {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return OpendoorValidate;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OpendoorValidate , 'pages/opendoor-validate'));

;