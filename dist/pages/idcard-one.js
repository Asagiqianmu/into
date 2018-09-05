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

var Idcardone = function (_wepy$page) {
    _inherits(Idcardone, _wepy$page);

    function Idcardone() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Idcardone);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Idcardone.__proto__ || Object.getPrototypeOf(Idcardone)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            btncolor: '#05a473',
            tempFilePaths1: ['../images/sfz1.png'],
            tempFilePaths2: ['../images/sfz2.png'],
            temp: '',
            temp2: '',
            warning: '',
            uptelphone: '',
            upBareaInfo: '',
            updname: '',
            upaddress: '',
            imgurl1: '',
            imgurl2: ''
        }, _this2.components = {}, _this2.methods = {}, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Idcardone, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.temp = this.tempFilePaths1;
            this.temp2 = this.tempFilePaths2;
            this.uptelphone = options.telphone;
            this.upBareaInfo = options.BareaInfo;
            this.updname = options.dname;
            this.upaddress = options.address;
        }
    }, {
        key: 'next',
        value: function next() {
            var _this = this;
            if (this.temp == this.tempFilePaths1) {
                this.warning = "请选择正面照片!";
                return;
            } else if (this.temp2 == this.tempFilePaths2) {
                this.warning = "请选择反面照片!";
                return;
            } else {
                this.warning = "";
            }
            wx.navigateTo({
                url: "idcard-two?telphone=" + _this.uptelphone + "&BareaInfo=" + _this.upBareaInfo + "&dname=" + _this.updname + "&address=" + _this.upaddress + "&imgurl1=" + _this.imgurl1 + "&imgurl2=" + _this.imgurl2 + "",
                success: function success() {

                    console.log("成功");
                }
            });
        }
    }, {
        key: 'up1img',
        value: function up1img() {
            var self = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function success(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    self.tempFilePaths1 = res.tempFilePaths;
                    self.setData({
                        tempFilePaths1: res.tempFilePaths
                    });
                    var tempFilePaths = res.tempFilePaths[0]; //图片

                    wx.uploadFile({
                        url: 'https://api.yingtong-pm.cn/v1/fileupload', //接口地址
                        header: {
                            "Content-Type": "application/json"
                        },
                        filePath: tempFilePaths, //待上传的图片，由 chooseImage获得
                        name: 'image', //文件对应的参数名字(key)
                        /*formData: data,  //其它的表单信息*/
                        method: 'POST',
                        success: function success(res) {
                            var data = JSON.parse(res.data);
                            if (data.code == 200) {

                                self.imgurl1 = data.img;

                                wx.showToast({
                                    title: '上传成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                            } else {

                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 3000
                                });
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: 'previewImage1',
        value: function previewImage1(e) {
            var current = e.target.dataset.src;
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: this.tempFilePaths1 // 需要预览的图片http链接列表
            });
        }
    }, {
        key: 'up2img',
        value: function up2img() {
            var self = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function success(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    self.tempFilePaths2 = res.tempFilePaths;
                    self.setData({
                        tempFilePaths2: res.tempFilePaths
                    });
                    var tempFilePaths = res.tempFilePaths[0]; //图片

                    wx.uploadFile({
                        url: 'https://api.yingtong-pm.cn/v1/fileupload', //接口地址
                        header: {
                            "Content-Type": "application/json"
                        },
                        filePath: tempFilePaths, //待上传的图片，由 chooseImage获得
                        name: 'image', //文件对应的参数名字(key)
                        /*formData: data,  //其它的表单信息*/
                        method: 'POST',
                        success: function success(res) {
                            var data = JSON.parse(res.data);
                            if (data.code == 200) {
                                self.imgurl2 = data.img;

                                wx.showToast({
                                    title: '上传成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                            } else {

                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 3000
                                });
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: 'previewImage2',
        value: function previewImage2(e) {
            var current = e.target.dataset.src;
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: this.tempFilePaths2 // 需要预览的图片http链接列表
            });
        }
    }]);

    return Idcardone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Idcardone , 'pages/idcard-one'));
