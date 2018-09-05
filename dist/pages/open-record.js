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

var choose_year = null,
    choose_month = null;

var OpenRecord = function (_wepy$page) {
    _inherits(OpenRecord, _wepy$page);

    function OpenRecord() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OpenRecord);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OpenRecord.__proto__ || Object.getPrototypeOf(OpenRecord)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            list: [],
            datetime: _util.formatDate.call(new Date(), 'yyyy-MM-dd'),
            showPicker: false,
            showCalendar: false,
            picker_value: [],
            picker_year: [],
            picker_month: [],
            cur_year: '',
            cur_month: '',
            cur_day: '',
            weeks_ch: [],
            days: [],
            hasEmptyGrid: false,
            empytGrids: true,
            btncolor: ''
        }, _this.components = {}, _this.methods = {
            handleCalendar: function handleCalendar(e) {
                var handle = e.currentTarget.dataset.handle;
                var cur_year = this.cur_year;
                var cur_month = this.cur_month;
                var cur_day = this.cur_day;
                var newMonth = void 0;
                var newYear = void 0;
                var newDay = void 0;
                if (handle === 'prev') {
                    newDay = cur_day - 1;
                    newMonth = cur_month;
                    newYear = cur_year;
                    if (newDay < 1) {
                        newMonth = cur_month - 1;
                        this.calculateDays(newYear, newMonth);
                        newDay = this.days[this.days.length - 1].day;
                        if (newMonth < 1) {
                            newYear = cur_year - 1;
                            newMonth = 12;
                        }
                    }
                } else {
                    newDay = cur_day + 1;
                    newMonth = cur_month;
                    newYear = cur_year;
                    if (newDay > this.days.length) {
                        newMonth = cur_month + 1;
                        newDay = 1;
                        if (newMonth > 12) {
                            newYear = cur_year + 1;
                            newMonth = 1;
                        }
                    }
                }
                this.calculateDays(newYear, newMonth);
                this.calculateEmptyGrids(newYear, newMonth);
                this.cur_year = newYear;
                this.cur_month = newMonth;
                this.cur_day = newDay;
                this.getOpenRecord();
            },
            tapDayItem: function tapDayItem(e) {
                var idx = e.currentTarget.dataset.idx;
                var days = this.days;
                for (var i = 0; i < days.length; i++) {
                    days[i].choosed = false;
                }
                days[idx].choosed = !days[idx].choosed;
                this.days = days;
                this.cur_day = days[idx].day;
                this.showCalendar = false;
                this.getOpenRecord();
            },
            chooseYearAndMonth: function chooseYearAndMonth() {
                var cur_year = this.cur_year;
                var cur_month = this.cur_month;
                var picker_year = [],
                    picker_month = [];
                for (var i = 1970; i <= 2100; i++) {
                    picker_year.push(i);
                }
                for (var _i = 1; _i <= 12; _i++) {
                    picker_month.push(_i);
                }
                var idx_year = picker_year.indexOf(cur_year);
                var idx_month = picker_month.indexOf(cur_month);
                this.picker_value = [idx_year, idx_month];
                this.picker_year = picker_year;
                this.picker_month = picker_month;
                this.showPicker = true;
            },
            pickerChange: function pickerChange(e) {
                var val = e.detail.value;
                choose_year = this.picker_year[val[0]];
                choose_month = this.picker_month[val[1]];
            },
            tapPickerBtn: function tapPickerBtn(e) {
                var type = e.currentTarget.dataset.type;
                this.showPicker = false;
                if (type === 'confirm') {
                    this.cur_year = choose_year;
                    this.cur_month = choose_month;
                    this.calculateEmptyGrids(choose_year, choose_month);
                    this.calculateDays(choose_year, choose_month);
                }
                this.showCalendar = true;
                this.$apply();
            },
            tapPickerBtnc: function tapPickerBtnc() {
                this.showCalendar = false;
                this.showPicker = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OpenRecord, [{
        key: 'getThisMonthDays',
        value: function getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        }
    }, {
        key: 'getFirstDayOfWeek',
        value: function getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        }
    }, {
        key: 'calculateEmptyGrids',
        value: function calculateEmptyGrids(year, month) {
            var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
            var empytGrids = [];
            if (firstDayOfWeek > 0) {
                for (var i = 0; i < firstDayOfWeek; i++) {
                    empytGrids.push(i);
                }
                this.hasEmptyGrid = true;
                this.empytGrids = empytGrids;
            } else {
                this.hasEmptyGrid = false;
                this.empytGrids = [];
            }
        }
    }, {
        key: 'calculateDays',
        value: function calculateDays(year, month) {
            var days = [];
            var thisMonthDays = this.getThisMonthDays(year, month);
            for (var i = 1; i <= thisMonthDays; i++) {
                days.push({
                    day: i,
                    choosed: false
                });
            }
            this.days = days;
        }
    }, {
        key: 'initCalendar',
        value: function initCalendar() {
            var date = new Date();
            var cur_year = date.getFullYear();
            var cur_month = date.getMonth() + 1;
            var cur_day = date.getDate();
            var weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
            this.calculateEmptyGrids(cur_year, cur_month);
            this.calculateDays(cur_year, cur_month);
            this.cur_year = cur_year;
            this.cur_month = cur_month;
            this.cur_day = cur_day;
            this.weeks_ch = weeks_ch;
        }
    }, {
        key: 'getOpenRecord',
        value: function getOpenRecord() {
            var self = this;

            wx.getStorage({
                key: 'token',
                success: function success(res) {
                    var token = res.data;
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
                                    url: 'login?page=open-record'
                                });
                            } else {
                                wx.request({
                                    url: 'https://api.yingtong-pm.cn/v1/client/takeOpenDoorRecord',
                                    method: 'GET',
                                    data: {
                                        token: token,
                                        datetime: self.cur_year + '-' + self.cur_month + '-' + self.cur_day
                                    },
                                    header: {
                                        "Content-Type": "application/json"
                                    },
                                    success: function success(res) {
                                        var data = res.data;
                                        self.list = [];
                                        if (data.code == 200) {
                                            self.flag = 0;
                                            for (var i = 0; i < data.data.length; i++) {
                                                var obj = {};
                                                obj.time = _util.formatDate.call(new Date(data.data[i].createtime.time), 'hh:mm');
                                                obj.keyname = data.data[i].keyname;
                                                obj.isopen = data.data[i].isopen;
                                                obj.style = data.data[i].style;
                                                obj.iswho = data.data[i].iswho;
                                                self.list.push(obj);
                                                self.$apply();
                                            }
                                        } else {
                                            self.$apply();
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                fail: function fail() {
                    wx.redirectTo({
                        url: 'login?page=open-record'
                    });
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.initCalendar();
            this.getOpenRecord();

            var self = this;
            wx.getStorage({
                key: 'btncolor',
                success: function success(res) {
                    var btncolor = self.btncolor = res.data;
                }
            });
        }
    }]);

    return OpenRecord;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OpenRecord , 'pages/open-record'));
