import moment from 'moment';
moment.locale('zh-cn');
Page({
  data: {
    dateList: moment().format("YYYY年MM月"),//子组件显示日期，因为要显示第三个，所以默认初始值所以设置为月份
    beginDate: moment().add(0, 'months').format('YYYY-MM-') + "01" + " 00:00:00",//默认时间
    endDate: moment(moment().add(0, 'months')._d).endOf('month').format('YYYY-MM-DD 23:59:59'),//默认时间
    tabs: [
      {
        title: '日',
        subTitle: '描述',
      },
      {
        title: '周',
        subTitle: '描述',
      },
      {
        title: '月',
        subTitle: '描述',
      },
      {
        title: '年',
        subTitle: '描述',
      }
    ],
    activeTab: 2,//默认显示月
    type: [
      { name: 'normal', value: '普通', checked: true },
      { name: 'capsule', value: '胶囊' },
      { name: 'hasSubTitle', value: '带描述' },
    ],
    typeCapsule: false,
    typeHasSubTitle: false,
    plus: [
      { name: 'has', value: '是', checked: true },
      { name: 'hasnt', value: '否' },
    ],
    hasPlus: false,
    contentHeight: [
      { name: 'has', value: '是' },
      { name: 'hasnt', value: '否', checked: true },
    ],
    //sub
    subTabs: [
      {
        title: '1',
        subTitle: '全部',
      },
      {
        title: '2',
        subTitle: '待处理',
      },
      {
        title: '3',
        subTitle: '处理中',
      },
      {
        title: '4',
        subTitle: '待确认',
      },
      {
        title: '5',
        subTitle: '已完成',
      }
    ],
    subactiveTab: 0,//下方tab点击索引
    typeHasSubTitle: true,
     addnum: 0,
    addnum1: 0,
    addnum2: 0,
    addnum3: 0,
    currentDate: '',

  },

  typeChange(e) {
    if (e.detail.value === 'hasSubTitle') {
      this.setData({
        typeCapsule: true,
        typeHasSubTitle: true,
      });
    } else if (e.detail.value === 'capsule') {
      this.setData({
        typeCapsule: true,
        typeHasSubTitle: false,
      });
    } else {
      this.setData({
        typeCapsule: false,
        typeHasSubTitle: false,
      });
    }
  },
  plusChange(e) {
    if (e.detail.value === 'hasnt') {
      this.setData({
        hasPlus: false,
      });
    } else {
      this.setData({
        hasPlus: true,
      });
    }
  },

  //处理Tab点击事件--此时activeTab也会跟着进行了变化
  handleTabClick({ index, tabsName }) {
    console.log('点击顶部-----------------' + index);
    this.setData({
      [tabsName]: index,
    });
    this.dealDatechange()
  },
  dealDatechange(){
     switch (this.data.activeTab) {
      case 0:
        this.setData({
          dateList: moment().add(this.data.addnum, 'd').format('YYYY年MM月DD日'),
          beginDate: moment().add(this.data.addnum, 'd').format('YYYY-MM-DD') + " 00:00:00",
          endDate: moment().add(this.data.addnum, 'd').format('YYYY-MM-DD') + " 23:59:59"
        });
        break;
      case 1:
        let datatmep = this.getCurrWeekDays();
        let datatmepwithyear = this.getCurrWeekDaysWithYear();
        this.setData({
          dateList: datatmep[0] + "-" + datatmep[1],
          beginDate: datatmepwithyear[0] + " 00:00:00",
          endDate: datatmepwithyear[1] + " 23:59:59"
        });
        break;
      case 2:
        this.setData({
          dateList: moment().add(this.data.addnum2, 'months').format('YYYY年MM月'),
          beginDate: moment().add(this.data.addnum2, 'months').format('YYYY-MM-') + "01" + " 00:00:00",
          endDate: moment(moment().add(this.data.addnum2, 'months')._d).endOf('month').format('YYYY-MM-DD 23:59:59')

        });
        break
      case 3:
        this.setData({
          dateList: moment().add(this.data.addnum3, 'year').format('YYYY年'),
          beginDate: moment().add(this.data.addnum3, 'year').format('YYYY') + "-01-01" + " 00:00:00",
          endDate: moment().add(this.data.addnum3, 'year').format('YYYY') + "-12-31" + " 23:59:59",
        });
        break;
    };
  },
  handlesubTabChange({ index, tabsName }) {
    console.log('点击状态-----------------' + index);
    this.setData({
      [tabsName]: index,
    });
    //this.getData();
  },



  handlePlusClick() {
    my.alert({
      content: 'plus clicked',
    });
  },

  //接收子组件传值
  onSetdateList(data, be, ed) {
    this.setData({
      dateList: data,
      beginDate: be,
      endDate: ed,
      addnum:10
    }),
    // console.log(this.data.this.data.addnum)
    
    this.getData();
  },

  onReady() {
    this.getData();
  },
  getData() {
    console.log("请求时数据，显示" + this.data.dateList + '==========begin:' + this.data.beginDate +
      "==========end:" + this.data.endDate + "====状态：" + this.data.subactiveTab)
  },
   // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDays() {
      let date = []
      let start = moment().week(moment().week() + this.data.addnum1).startOf('week').format('MM月DD日')
      let end = moment().week(moment().week() + this.data.addnum1).endOf('week').format('MM月DD日')
      date.push(start)
      date.push(end)
      return date
    },
    // 获取下一周的开始结束时间，周日到周六
    getCurrWeekDaysWithYear() {
      let date = []
      let start = moment().week(moment().week() + this.data.addnum1).startOf('week').format('YYYY-MM-DD')
      let end = moment().week(moment().week() + this.data.addnum1).endOf('week').format('YYYY-MM-DD')
      date.push(start)
      date.push(end)
      return date
    }

});
