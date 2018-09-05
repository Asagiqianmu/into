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

var Idcardtwo = function (_wepy$page) {
    _inherits(Idcardtwo, _wepy$page);

    function Idcardtwo() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Idcardtwo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Idcardtwo.__proto__ || Object.getPrototypeOf(Idcardtwo)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            btncolor: '#05a473',
            tempFilePaths3: ['../images/sfz3.png'],
            temp: '',
            warning: '',
            username: '',
            idcard: '',
            email: '',
            uptelphone: '',
            upBareaInfo: '',
            updname: '',
            upaddress: '',
            hidden: true,
            nocancel: true,
            upimgurl3: '',
            upimgurl1: '',
            upimgurl2: ''
        }, _this2.components = {}, _this2.methods = {
            username: function username(e) {
                this.username = e.detail.value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]+$/, '');
                return this.username;
            },
            idcard: function idcard(e) {
                this.idcard = e.detail.value.replace(/[^0-9\X\x]/, '');
                return this.idcard;
            },
            email: function email(e) {
                this.email = e.detail.value.replace(/[\u4e00-\u9fa5]/, '');
                return this.email;
            },
            upimg3: function upimg3() {
                var self = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                        console.log(res);
                        self.tempFilePaths3 = res.tempFilePaths;
                        self.setData({
                            tempFilePaths3: res.tempFilePaths
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
                                console.log(tempFilePaths);
                                var data = JSON.parse(res.data);
                                if (data.code == 200) {
                                    self.imgurl3 = data.img;

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
                                console.log(self.imgurl3);
                            }
                        });
                    }
                });
                console.log(self.data);
            },

            previewImage: function previewImage(e) {
                var current = e.target.dataset.src;
                wx.previewImage({
                    current: current, // 当前显示图片的http链接
                    urls: this.tempFilePaths3 // 需要预览的图片http链接列表
                });
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Idcardtwo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.temp3 = this.tempFilePaths3;
            /*this.setData({
                telphone:options.telphone,
                BareaInfo:options.BareaInfo,
                dname:options.dname,
                address:options.address,
                imgurl1: options.imgurl1,
                imgurl2 : options.imgurl2,
                imgurl3 : options.imgurl3,
            });*/
            this.uptelphone = options.telphone;
            this.upBareaInfo = options.BareaInfo;
            this.updname = options.dname;
            this.upaddress = options.address;
            this.upimgurl1 = options.imgurl1;
            this.upimgurl2 = options.imgurl2;
            this.upimgurl3 = options.imgurl3;
            console.log(options.imgurl1);
            console.log(options.imgurl2);
        }
    }, {
        key: 'submit',
        value: function submit() {
            var patidcard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
            var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            var strEmail = pattern.test(this.email);
            var stridcard = patidcard.test(this.idcard);
            var _this = this;
            var appId = 'wxf56fd8fb6499bccb';
            if (!this.username) {
                this.warning = "姓名不能为空!";
                return;
            }if (!this.idcard) {
                this.warning = "身份证号码不能为空!";
                return;
            }if (!stridcard) {
                this.warning = "身份证号码格式不正确!";
                return;
            }if (!this.email) {
                this.warning = "E-mail邮箱不能为空!";
                return;
            }if (!strEmail) {
                this.warning = "E-mail邮箱格式不正确!";
                return;
            }if (this.temp3 == this.tempFilePaths3) {
                this.warning = "请选择手持身份证照片!";
                return;
            } else {
                this.warning = "";
            }

            wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/userregister',
                data: {
                    appid: appId,
                    telphone: _this.uptelphone,
                    pca: _this.upBareaInfo,
                    village: _this.updname,
                    address: _this.upaddress,
                    name: _this.username,
                    idnum: _this.idcard,
                    email: _this.email,
                    idcard1: _this.imgurl1,
                    idcard2: _this.imgurl2,
                    idcard3: _this.imgurl3
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
                    } else {
                        wx.showToast({
                            title: '失败',
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
                hidden: false
            });
            wx.reLaunch({
                url: 'login?page=login'
            });
        }
    }]);

    return Idcardtwo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Idcardtwo , 'pages/idcard-two'));
