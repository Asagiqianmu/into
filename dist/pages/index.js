'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../common/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monthCn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
var monthEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.data = {
            title: '' || '公告',
            subtitle: '' || 'Notice',
            tab: 1,
            years: '2018',
            monthCn: '十月',
            monthEn: 'Oct',
            day: '01',
            token: '',
            key_id: '',
            showDialog: false,
            dialogLoading: false,
            dialogFail: false,
            dialogSuccess: false,
            templist: [],
            tempindex: '',
            keyList: [],
            notice: '你们好!现本小区已进入装修阶段,进出苑区人员日益增多,管理处为加强小区人员进出管理,确保苑区的安全和谐,须对苑区住户办理业主卡,住户须凭业主卡进出苑区。请业主于近期内到管理处办理,谢谢合作!',
            inputname: '',
            inputtel: '',
            inputtime: '',
            btncolor: '',
            iconimgUrl: '',
            warning: ''
        }, _this2.components = {}, _this2.methods = {
            changeTab: function changeTab(index) {
                var self = this;
                self.tab = index;
                if (index == 2) {
                    wx.request({
                        url: 'https://api.yingtong-pm.cn/v1/client/takeOwnerUnlockingKey',
                        method: 'GET',
                        data: {
                            token: self.token
                        },
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function success(res) {
                            var data = res.data;
                            if (data.code == 200) {
                                self.keyList = data.data;
                                var a1 = self.keyList.length;
                                self.templist = new Array(a1);
                            }
                            self.$apply();
                        }
                    });
                }
            },
            hideDialog: function hideDialog() {
                if (!this.dialogLoading) {
                    this.showDialog = false;
                    this.dialogSuccess = false;
                    this.dialogFail = false;
                }
            },
            openDoor: function openDoor() {
                var self = this;
                self.showDialog = true;
                self.dialogLoading = true;
                wx.request({
                    url: 'https://api.yingtong-pm.cn/v1/client/opendoor',
                    method: 'POST',
                    data: {
                        token: self.token,
                        key_id: self.key_id
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
            opendoorvalidate: function opendoorvalidate(index) {

                if (this.tempindex != index) {
                    this.templist = new Array(this.keyList.length);
                }
                if (this.templist[index] == -1) {
                    this.templist = new Array(this.keyList.length);
                } else {
                    this.templist[index] = -1;
                }
                this.tempindex = index;
                // console.log(this.keyList[this.tempindex].key_id);
                this.key_id = this.keyList[this.tempindex].key_id;
            },
            inputname: function inputname(e) {
                this.inputname = e.detail.value.replace(/[^A-Za-z0-9\u4e00-\u9fa5]+$/, '');
                return this.inputname;
            },
            inputtel: function inputtel(e) {
                this.inputtel = e.detail.value.replace(/[^0-9]/, '');
                return this.inputtel;
            },
            inputtime: function inputtime(e) {
                this.inputtime = e.detail.value.replace(/[^0-9]/, '');
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
                var tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                var strtel = tel.test(this.inputtel);
                var _this = this;
                if (!_this.inputname) {
                    _this.warning = "姓名不能为空!";
                    return;
                } else if (!_this.inputtel) {
                    _this.warning = "手机号不能为空!";
                    return;
                } else if (!strtel) {
                    _this.warning = "手机号格式不正确!";
                    return;
                } else if (!_this.inputtime) {
                    _this.warning = "授权时长不能为空!";
                    return;
                } else if (_this.inputtime < 1) {
                    _this.warning = "授权时长不能小于1小时!";
                    return;
                } else {
                    _this.warning = "";
                };
                console.log(_this.token);
                console.log(_this.key_id);
                console.log(_this.inputname);
                console.log(_this.inputtel);
                console.log(_this.inputtime);
                wx.request({
                    url: 'https://api.yingtong-pm.cn/v1/client/sendAuthorization',
                    data: {
                        token: _this.token,
                        key_id: _this.key_id,
                        username: _this.inputname,
                        phone: _this.inputtel,
                        time: _this.inputtime
                    },
                    method: 'POST',
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function success(res) {
                        var data = res.data;

                        if (data.code == 200) {

                            _this.setData({
                                showModal: false
                            });
                            wx.showToast({
                                title: '成功失败',
                                icon: 'success',
                                duration: 3000
                            });
                        } else {
                            wx.showToast({
                                title: '授权失败',
                                icon: 'success',
                                duration: 3000
                            });
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Index, [{
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
                                    url: 'login?page=index'
                                });
                            } else {
                                wx.request({
                                    url: 'https://api.yingtong-pm.cn/v1/client/takeNotice',
                                    method: 'GET',
                                    data: {
                                        token: token
                                    },
                                    header: {
                                        "Content-Type": "application/json"
                                    },
                                    success: function success(res) {
                                        var data = res.data;
                                        var date = _util.formatDate.call(new Date(), 'yyyy-M-dd');
                                        var dateArray = date.split('-');
                                        var monthIndex = parseInt(dateArray[1]) - 1;
                                        if (data.code == 200) {
                                            self.title = data.data.title;
                                            self.subtitle = data.data.subtitle;
                                            self.notice = data.data.content;
                                        }
                                        self.years = dateArray[0];
                                        self.day = dateArray[2];
                                        self.monthCn = monthCn[monthIndex];
                                        self.monthEn = monthEn[monthIndex];
                                        self.$apply();
                                    }
                                });
                            }
                        }
                    });
                },
                fail: function fail() {
                    wx.redirectTo({
                        url: 'login?page=index'
                    });
                }
            });
            wx.getStorage({
                key: 'btncolor',
                success: function success(res) {
                    var btncolor = self.btncolor = res.data;
                }
            });
            wx.getStorage({
                key: 'iconimgUrl',
                success: function success(res) {
                    var iconimgUrl = self.iconimgUrl = res.data;
                }
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));
