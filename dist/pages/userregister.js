'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _city = require('./../common/city.js');

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// var address = require('./../common/city.js');


var animation;

var Userregister = function (_wepy$page) {
    _inherits(Userregister, _wepy$page);

    function Userregister() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Userregister);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Userregister.__proto__ || Object.getPrototypeOf(Userregister)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            btncolor: '#05a473',
            menuType: 0,
            begin: null,
            status: 1,
            end: null,
            isVisible: false,
            animationData: {},
            animationAddressMenu: {},
            addressMenuIsShow: false,
            value: [0, 0, 0],
            provinces: [],
            citys: [],
            areas: [],
            province: '',
            city: '',
            area: '',
            imgwidth: 0,
            imgheight: 0,
            telphone: '',
            vercode: '',
            dname: '',
            dong: '',
            zuo: '',
            fang: '',
            warning: '',
            clear: '',
            BareaInfo: '',
            ctime: '',
            buttonDisable: false,
            verifyCode1: '获取密码'
        }, _this2.components = {}, _this2.methods = {
            /* username(e){
                 this.username = e.detail.value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]+$/, '');
                 return this.username;
             },*/
            telphone: function telphone(e) {
                this.telphone = e.detail.value.replace(/[^0-9]/, '');
                return this.telphone;
            },
            vercode: function vercode(e) {
                this.vercode = e.detail.value.replace(/[^0-9]/, '');
                return this.vercode;
            },
            dname: function dname(e) {
                this.dname = e.detail.value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]+$/, '');
                return this.dname;
            },
            dong: function dong(e) {
                this.dong = e.detail.value.replace(/[\W]/g, '');;
                return this.dong;
            },
            zuo: function zuo(e) {
                this.zuo = e.detail.value.replace(/[\W]/g, '');;
                return this.zuo;
            },
            fang: function fang(e) {
                this.fang = e.detail.value.replace(/[\W]/g, '');;
                return this.fang;
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Userregister, [{
        key: 'onLoad',
        value: function onLoad(options) {
            // 初始化动画变量
            var _this = this;
            var animation = wx.createAnimation({
                duration: 500,
                transformOrigin: "50% 50%",
                timingFunction: 'ease'
            });
            this.animation = animation;
            // 默认联动显示北京
            var id = _city2.default.provinces[0].id;
            this.provinces = _city2.default.provinces;
            this.citys = _city2.default.citys[id];
            this.areas = _city2.default.areas[_city2.default.citys[id][0].id];

            this.setData({
                verifyCode: '获取验证'
            });

            //  console.log(this.data);
        }
    }, {
        key: 'getcode',
        value: function getcode() {
            var self = this;
            var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var strtel = tel.test(this.telphone);
            if (!this.telphone) {
                this.warning = "手机号不能为空!";
                return;
            }if (!strtel) {
                this.warning = "手机号格式不正确!";
                return;
            } else {
                this.warning = "";
            }
            wx.request({
                url: 'https://api.yingtong-pm.cn/v1/client/getnewcode',
                data: {
                    telphone: self.telphone
                },
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function success(res) {
                    var data = res.data;
                    console.log(data);
                    if (data.code == 200) {
                        if (self.data.buttonDisable) return false;
                        var c = 60;
                        var intervalId = setInterval(function () {
                            c = c - 1;
                            self.setData({
                                verifyCode: c + 's后重发',
                                buttonDisable: true
                            });
                            if (c <= 0) {
                                clearInterval(intervalId);

                                self.setData({
                                    verifyCode: '获取验证',
                                    buttonDisable: false
                                });
                            }
                        }, 1000);
                        self.setData({
                            ctime: data.ctime
                        });
                        wx.showToast({
                            title: data.msg,
                            icon: 'success',
                            duration: 2000
                        });
                    } else {
                        wx.showToast({
                            title: data.msg,
                            icon: 'success',
                            duration: 2000
                        });
                    }
                }
            });
        }
        /*        imageLoad(e){
                    var _this=this;
                    var $width=e.detail.width,  //获取图片真实宽度
                        $height=e.detail.height,
                        ratio=$width/$height;  //图片的真实宽高比例
                    var viewWidth=500,      //设置图片显示宽度，
                        viewHeight=500/ratio;  //计算的高度值
                    _this.setData({
                        imgwidth:viewWidth,
                        imgheight:viewHeight
                    })
                }*/

    }, {
        key: 'submit',
        value: function submit() {
            var _this = this;
            var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var strtel = tel.test(this.telphone);
            if (!this.telphone) {
                this.warning = "手机号不能为空!";
                return;
            }if (!strtel) {
                this.warning = "手机号格式不正确!";
                return;
            } else if (!this.vercode) {
                this.warning = "验证码不能为空!";
                return;
            } else if (!this.BareaInfo) {
                this.warning = "请选择你所在的城市!";
                return;
            } else if (!this.dname) {
                this.warning = "小区名称不能为空!";
                return;
            } else if (!this.dong || !this.zuo || !this.fang) {
                this.warning = "住址不能为空!";
                return;
            } else {
                this.warning = "";
            }
            wx.request({

                url: 'https://api.yingtong-pm.cn/v1/client/forgetpwd',
                data: {
                    telphone: _this.telphone,
                    code: _this.vercode,
                    ctime: _this.ctime
                },
                method: 'POST',
                header: {
                    "Content-Type": "application/json"
                },
                success: function success(res) {
                    var data = res.data;
                    var address = _this.dong + ',' + _this.zuo + ',' + _this.fang;
                    console.log(address);
                    wx.navigateTo({
                        url: "idcard-one?telphone=" + _this.telphone + "&BareaInfo=" + _this.BareaInfo + "&dname=" + _this.dname + "&address=" + address + ""
                    });
                    /*        if(data.coda==200){//验证码正确
                                console.log('111');
                                wx.navigateTo({
                                    url:"idcard-one?telphone="+_this.telphone+"&BareaInfo="+_this.BareaInfo+"&dname="+_this.dname+"&address="+address+"",
                                })
                              }else {
                                _this.setData({
                                    warning:"验证码错误"
                                });
                              }*/
                }
            });
        }
    }, {
        key: 'showMenuTap',

        /*三级联动-省-市-区*/
        value: function showMenuTap(e) {
            //获取点击菜单的类型 1点击状态 2点击时间
            var menuType = e.currentTarget.dataset.type;
            // 如果当前已经显示，再次点击时隐藏
            if (this.data.isVisible == true) {
                this.startAnimation(false, -200);
                return;
            }
            this.setData({
                menuType: menuType
            });
            this.startAnimation(true, 0);
        }
    }, {
        key: 'hideMenuTap',
        value: function hideMenuTap(e) {
            this.startAnimation(false, -200);
        }
    }, {
        key: 'startAnimation',

        // 执行动画
        value: function startAnimation(isShow, offset) {
            var that = this;
            var offsetTem;
            if (offset == 0) {
                offsetTem = offset;
            } else {
                offsetTem = offset + 'rpx';
            }
            this.animation.translateY(offset).step();
            this.setData({
                animationData: this.animation.export(),
                isVisible: isShow
            });
            console.log(that.data);
        }
    }, {
        key: 'selectState',

        // 选择状态按钮
        value: function selectState(e) {
            this.startAnimation(false, -200);
            var status = e.currentTarget.dataset.status;
            this.setData({
                status: status
            });
            console.log(this.data);
        }
    }, {
        key: 'bindDateChange',

        // 日志选择
        value: function bindDateChange(e) {
            console.log(e);
            if (e.currentTarget.dataset.type == 1) {
                this.setData({
                    begin: e.detail.value
                });
            } else if (e.currentTarget.dataset.type == 2) {
                this.setData({
                    end: e.detail.value
                });
            }
        }
    }, {
        key: 'sureDateTap',
        value: function sureDateTap() {
            this.data.pageNo = 1;
            this.startAnimation(false, -200);
        }
    }, {
        key: 'onReady',

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        value: function onReady() {}
    }, {
        key: 'onShow',


        /**
         * 生命周期函数--监听页面显示
         */
        value: function onShow() {}
    }, {
        key: 'onHide',


        /**
         * 生命周期函数--监听页面隐藏
         */
        value: function onHide() {}
    }, {
        key: 'onUnload',


        /**
         * 生命周期函数--监听页面卸载
         */
        value: function onUnload() {}
    }, {
        key: 'onPullDownRefresh',


        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        value: function onPullDownRefresh() {}
    }, {
        key: 'onReachBottom',


        /**
         * 页面上拉触底事件的处理函数
         */
        value: function onReachBottom() {}
    }, {
        key: 'onShareAppMessage',


        /**
         * 用户点击右上角分享
         */
        value: function onShareAppMessage() {}
    }, {
        key: 'selectDistrict',

        // 点击所在地区弹出选择框
        value: function selectDistrict(e) {
            var that = this;
            console.log('弹出选择框');
            if (that.data.addressMenuIsShow) {
                return;
            }
            that.startAddressAnimation(true);
        }
    }, {
        key: 'startAddressAnimation',

        // 执行动画
        value: function startAddressAnimation(isShow) {
            var that = this;
            if (isShow) {
                that.animation.translateY(0 + 'vh').step();
            } else {
                that.animation.translateY(40 + 'vh').step();
            }
            that.setData({
                animationAddressMenu: that.animation.export(),
                addressMenuIsShow: isShow
            });
        }
    }, {
        key: 'cityCancel',

        // 点击地区选择取消按钮
        value: function cityCancel(e) {
            this.startAddressAnimation(false);
        }
    }, {
        key: 'citySure',

        // 点击地区选择确定按钮
        value: function citySure(e) {
            var that = this;
            var city = that.data.city;
            var value = that.data.value;
            that.startAddressAnimation(false);
            // 将选择的城市信息显示到输入框
            var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name;
            this.BareaInfo = areaInfo;
            that.setData({
                areaInfo: areaInfo
            });
        }
    }, {
        key: 'hideCitySelected',
        value: function hideCitySelected(e) {
            this.startAddressAnimation(false);
        }
    }, {
        key: 'cityChange',

        // 处理省市县联动逻辑
        value: function cityChange(e) {
            var value = e.detail.value;
            var provinces = this.data.provinces;
            var citys = this.data.citys;
            var areas = this.data.areas;
            var provinceNum = value[0];
            var cityNum = value[1];
            var countyNum = value[2];
            if (this.data.value[0] != provinceNum) {
                var id = provinces[provinceNum].id;

                this.value = [provinceNum, 0, 0];
                this.citys = _city2.default.citys[id];
                this.areas = _city2.default.areas[_city2.default.citys[id][0].id];
            } else if (this.data.value[1] != cityNum) {
                var id = citys[cityNum].id;

                this.value = [provinceNum, cityNum, 0];
                this.areas = _city2.default.areas[citys[cityNum].id];
            } else {

                this.value = [provinceNum, cityNum, countyNum];
            }
            console.log(this.data);
        }
    }]);

    return Userregister;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Userregister , 'pages/userregister'));
