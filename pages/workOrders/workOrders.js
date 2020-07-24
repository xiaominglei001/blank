import moment from 'moment';
moment.locale('zh-cn');
Page({
  data: {
    dateList: moment().format("YYYY年MM月"),//子组件显示日期，因为要显示第三个，所以默认初始值所以设置为月份
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

  //处理Tab点击事件--此时activeTab也跟着进行了变化
  handleTabClick({ index, tabsName }) {
   this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });

  },
  handlePlusClick() {
    my.alert({
      content: 'plus clicked',
    });
  },

  //接收子组件传值
  onSetdateList(data) {
    this.setData({
      dateList: data
    })
    console.log("接收子组件设置值："+this.data.dateList)
  }


});
