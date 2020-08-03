import momentd from 'moment';
import { relativeTimeThreshold } from 'moment';
momentd.locale('zh-cn');

Component({
  props: {
  },
  data: {
    addnum: 0,
    addnum1: 0,
    addnum2: 0,
    addnum3: 0,
    beginDate: '',//需要上传的开始时间
    endDate: '',//需要上传的结束时间
    currentDate: '',
    datetype: ''
  },
  //组件生命周期函数，组件创建完毕时触发
  didMount() {
    this.setData({
      currentDate: this.props.dateList,
      datetype: this.props.datetype
    })
  },
  //组件生命周期函数，组件更新完毕时触发
  didUpdate() {
    //①tab变动后拿取当前激活的tab索引
    this.setData({
      datetype: this.props.datetype,
    })
    //②然后根据不同datetype类型，结合addnum..的值，设置上不同日期显示
    switch (this.data.datetype) {
      case 0:
        this.setData({
          currentDate: momentd().add(this.data.addnum, 'd').format('YYYY年MM月DD日')
        });
        break;
      case 1:
        let datatmep = this.getCurrWeekDays();
        this.setData({
          currentDate: datatmep[0] + "-" + datatmep[1]
        });
        break;
      case 2:
        this.setData({
          currentDate: momentd().add(this.data.addnum2, 'months').format('YYYY年MM月')

        });
        console.log(this.data.currentDate);
        break
      case 3:
        this.setData({
          currentDate: momentd().add(this.data.addnum3, 'year').format('YYYY年')
        });
        break;
    }
    console.log("didUpdate更新值:" + this.data.currentDate);
  },
  //方法
  methods: {
    hanlePreview() { //向左点击处理
      switch (this.data.datetype) {
        case 0: //日点击
          this.setData({
            addnum: this.data.addnum - 1,
            currentDate: momentd().add(this.data.addnum - 1, 'd').format('YYYY年MM月DD日'),
            beginDate: momentd().add(this.data.addnum - 1, 'd').format('YYYY-MM-DD') + " 00:00:00",
            endDate: momentd().add(this.data.addnum - 1, 'd').format('YYYY-MM-DD') + " 23:59:59"
          });
          break;
        case 1:
          this.setData({
            addnum1: this.data.addnum1 - 1,
          });
          let datatmep = this.getCurrWeekDays();
          let datatmepwithyear = this.getCurrWeekDaysWithYear();
          this.setData({
            currentDate: datatmep[0] + "-" + datatmep[1],
            beginDate: datatmepwithyear[0] + " 00:00:00",
            endDate: datatmepwithyear[0] + " 23:59:59"
          });
          break;
        case 2:
          let tempnowmonth = momentd().add(this.data.addnum2 - 1, 'months').format('YYYY年MM月');
          this.setData({
            addnum2: this.data.addnum2 - 1,
            currentDate: tempnowmonth,
            beginDate: tempnowmonth+"01"+" 00:00:00",
            endDate:'' //待加。。。。。。。。。。。。。

          });
          console.log(this.data.beginDate+"=======222222======="+this.data.endDate);
          break
        case 3:
          this.setData({
            addnum3: this.data.addnum3 - 1,
            currentDate: momentd().add(this.data.addnum3 - 1, 'year').format('YYYY年')

          });
          break;
      }
      //调用父方法设置过去
      this.props.onSetdateList(this.data.currentDate, this.data.beginDate, this.data.endDate);
    },
    handleNext() { //向右点击处理
      switch (this.data.datetype) {
        case 0:
          this.setData({
            addnum: this.data.addnum + 1,
            currentDate: momentd().add(this.data.addnum + 1, 'd').format('YYYY年MM月DD日')

          });
          break;
        case 1:
          this.setData({
            addnum1: this.data.addnum1 + 1,
          });
          let datatmep = this.getCurrWeekDays();
          this.setData({
            currentDate: datatmep[0] + "-" + datatmep[1]
          });
          break;
        case 2:
          this.setData({
            addnum2: this.data.addnum2 + 1,
            currentDate: momentd().add(this.data.addnum2 + 1, 'months').format('YYYY年MM月')

          });
          break
        case 3:
          this.setData({
            addnum3: this.data.addnum3 + 1,
            currentDate: momentd().add(this.data.addnum3 + 1, 'year').format('YYYY年')

          });
          break;
      }
      //调用父方法设置过去
      this.props.onSetdateList(this.data.currentDate, this.data.beginDate, this.data.endDate);

    },

    // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDays() {
      let date = []
      let start = momentd().week(momentd().week() + this.data.addnum1).startOf('week').format('MM月DD日')
      let end = momentd().week(momentd().week() + this.data.addnum1).endOf('week').format('MM月DD日')
      date.push(start)
      date.push(end)
      return date
    },
    // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDaysWithYear() {
      let date = []
      let start = momentd().week(momentd().week() + this.data.addnum1).startOf('week').format('YYYY-MM-DD')
      let end = momentd().week(momentd().week() + this.data.addnum1).endOf('week').format('YYYY-MM-DD')
      date.push(start)
      date.push(end)
      return date
    }
  }
});
