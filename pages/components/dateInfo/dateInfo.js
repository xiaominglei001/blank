import momentd from "moment";
import { relativeTimeThreshold } from "moment";
momentd.locale("zh-cn");

Component({
  props: {
    //可给外部传入的属性添加默认值
  },
  data: {
    addnum: 0,
    addnum1: 0,
    addnum2: 0,
    addnum3: 0,
    beginDate: "", //需要上传的开始时间
    endDate: "", //需要上传的结束时间
    currentDate: "",
    datetype: ""
  },
  //组件生命周期函数，组件创建完毕时触发
  didMount() {
    console.log(1111);
    this.setData({
      currentDate: this.props.dateList,
      datetype: this.props.datetype,
      beginDate: this.props.beginDate,
      endDate: this.props.endDate
    });
  },
  //组件生命周期函数，组件更新完毕时触发
  didUpdate() {
    this.setData({
      currentDate: this.props.dateList,
      datetype: this.props.datetype,
      beginDate: this.props.beginDate,
      endDate: this.props.endDate
    });
  },
  //方法
  methods: {
    hanlePreview() {
      //向左点击处理
      let step;
      switch (this.data.datetype) {
        case 0: //日点击
          this.setData({
            addnum: this.data.addnum - 1,
            currentDate: momentd()
              .add(this.data.addnum - 1, "d")
              .format("YYYY年MM月DD日"),
            beginDate:
              momentd()
                .add(this.data.addnum - 1, "d")
                .format("YYYY-MM-DD") + " 00:00:00",
            endDate:
              momentd()
                .add(this.data.addnum - 1, "d")
                .format("YYYY-MM-DD") + " 23:59:59"
          });
          step = this.data.addnum;
          break;
        case 1:
          this.setData({
            addnum1: this.data.addnum1 - 1
          });
          let datatmep = this.getCurrWeekDays();
          let datatmepwithyear = this.getCurrWeekDaysWithYear();
          this.setData({
            currentDate: datatmep[0] + "-" + datatmep[1],
            beginDate: datatmepwithyear[0] + " 00:00:00",
            endDate: datatmepwithyear[1] + " 23:59:59"
          });
          step = this.data.addnum1;
          break;
        case 2:
          this.setData({
            addnum2: this.data.addnum2 - 1,
            currentDate: momentd()
              .add(this.data.addnum2 - 1, "months")
              .format("YYYY年MM月"),
            beginDate:
              momentd()
                .add(this.data.addnum2 - 1, "months")
                .format("YYYY-MM-") +
              "01" +
              " 00:00:00",
            endDate: momentd(momentd().add(this.data.addnum2 - 1, "months")._d)
              .endOf("month")
              .format("YYYY-MM-DD 23:59:59")
          });
          step = this.data.addnum2;
          break;
        case 3:
          this.setData({
            addnum3: this.data.addnum3 - 1,
            currentDate: momentd()
              .add(this.data.addnum3 - 1, "year")
              .format("YYYY年"),
            beginDate:
              momentd()
                .add(this.data.addnum3 - 1, "year")
                .format("YYYY") +
              "-01-01" +
              " 00:00:00",
            endDate:
              momentd()
                .add(this.data.addnum3 - 1, "year")
                .format("YYYY") +
              "-12-31" +
              " 23:59:59"
          });
          step = this.data.addnum3;
          break;
      }
      //调用父方法设置过去
      // this.data.datetype
      let params = {
        currentDate: this.data.currentDate, //当前时间
        beginDate: this.data.beginDate, //开始时间
        type: this.data.datetype, //类型
        endDate: this.data.endDate, //结束时间
        step: step //增量
      };
      this.props.onSetdateList(params);
    },
    handleNext() {
      //向右点击处理
      let step;
      switch (this.data.datetype) {
        case 0:
          this.setData({
            addnum: this.data.addnum + 1,
            currentDate: momentd()
              .add(this.data.addnum + 1, "d")
              .format("YYYY年MM月DD日"),
            beginDate:
              momentd()
                .add(this.data.addnum + 1, "d")
                .format("YYYY-MM-DD") + " 00:00:00",
            endDate:
              momentd()
                .add(this.data.addnum + 1, "d")
                .format("YYYY-MM-DD") + " 23:59:59"
          });
          step = this.data.addnum;
          break;
        case 1:
          this.setData({
            addnum1: this.data.addnum1 + 1
          });
          let datatmep = this.getCurrWeekDays();
          let datatmepwithyear = this.getCurrWeekDaysWithYear();
          this.setData({
            currentDate: datatmep[0] + "-" + datatmep[1],
            beginDate: datatmepwithyear[0] + " 00:00:00",
            endDate: datatmepwithyear[1] + " 23:59:59"
          });
          step = this.data.addnum1;
          break;
        case 2:
          this.setData({
            addnum2: this.data.addnum2 + 1,
            currentDate: momentd()
              .add(this.data.addnum2 + 1, "months")
              .format("YYYY年MM月"),
            beginDate:
              momentd()
                .add(this.data.addnum2 + 1, "months")
                .format("YYYY-MM-") +
              "01" +
              " 00:00:00",
            endDate: momentd(momentd().add(this.data.addnum2 + 1, "months")._d)
              .endOf("month")
              .format("YYYY-MM-DD 23:59:59")
          });
          step = this.data.addnum2;
          break;
        case 3:
          this.setData({
            addnum3: this.data.addnum3 + 1,
            currentDate: momentd()
              .add(this.data.addnum3 + 1, "year")
              .format("YYYY年"),
            beginDate:
              momentd()
                .add(this.data.addnum3 + 1, "year")
                .format("YYYY") +
              "-01-01" +
              " 00:00:00",
            endDate:
              momentd()
                .add(this.data.addnum3 + 1, "year")
                .format("YYYY") +
              "-12-31" +
              " 23:59:59"
          });
          step = this.data.addnum3;
          break;
      }
      //调用父方法设置过去
      let params = {
        currentDate: this.data.currentDate, //当前时间
        beginDate: this.data.beginDate, //开始时间
        type: this.data.datetype, //类型
        endDate: this.data.endDate, //结束时间
        step: step //增量
      };
      this.props.onSetdateList(params);
      //调用父方法设置过去
      // this.props.onSetdateList(this.data.currentDate, this.data.beginDate, this.data.endDate,this.data.addnum);
    },

    // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDays() {
      let date = [];
      let start = momentd()
        .week(momentd().week() + this.data.addnum1)
        .startOf("week")
        .format("MM月DD日");
      let end = momentd()
        .week(momentd().week() + this.data.addnum1)
        .endOf("week")
        .format("MM月DD日");
      date.push(start);
      date.push(end);
      return date;
    },
    // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDaysWithYear() {
      let date = [];
      let start = momentd()
        .week(momentd().week() + this.data.addnum1)
        .startOf("week")
        .format("YYYY-MM-DD");
      let end = momentd()
        .week(momentd().week() + this.data.addnum1)
        .endOf("week")
        .format("YYYY-MM-DD");
      date.push(start);
      date.push(end);
      return date;
    }
  }
});
