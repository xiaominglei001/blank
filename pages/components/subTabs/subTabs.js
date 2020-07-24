Component({
  mixins: [],
   data: {
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
      { title: '4',
        subTitle: '待确认',
      },
      { title: '5',
        subTitle: '已完成',
      }
    ],
    subactiveTab: 0,
    type: [
      { name: 'normal', value: '普通', checked: true },
      { name: 'capsule', value: '胶囊' },
      { name: 'hasSubTitle', value: '带描述' },
    ],
    typeCapsule: true,
    typeHasSubTitle: true,
    plus: [
      { name: 'has', value: '是', checked: true },
      { name: 'hasnt', value: '否' },
    ],
    hasPlus: true,
    contentHeight: [
      { name: 'has', value: '是' },
      { name: 'hasnt', value: '否', checked: true },
    ],
 
  },
   onTabItemTap(item) {
    console.log(item)
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTabChange({ index, tabsName }) {
      console.log(index)
    this.setData({
      [tabsName]: index,
    });
  },
     handleTabClick({ index, tabsName }) {
       console.log(tabsName)
        console.log(2222)
    this.setData({
      [tabsName]: index,
    });
    setTimeout(()=>{
       console.log(this.data.subactiveTab)
    },2000)
   
  },
  },
});
