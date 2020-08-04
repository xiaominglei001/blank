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
      endDate: ed
    }),
  
    
    this.getData();
  },

  onReady() {
    this.getData();
  },
  getData() {
    console.log("请求时数据，显示" + this.data.dateList + '==========begin:' + this.data.beginDate +
      "==========end:" + this.data.endDate + "====状态：" + this.data.subactiveTab)
  }

});
