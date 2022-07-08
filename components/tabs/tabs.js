// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    },

    innerData: {
      type: Number,
      value: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    mine: 0,
    linePositionX: 0,
    linePositionWidth: 0
  },
  
  lifetimes: {
    attached() {
      this.calculateLinePositionX()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTab(e) {
      const { index } = e.currentTarget.dataset
      console.log("index是：" + index)
      this.triggerEvent("change", index, {})
       this.setData({
        mine: index
      })
      this.calculateLinePositionX(index)
    },
    toMine() {
      wx.navigateTo({
        url: '/pages/farm-m/farm-m',
      })
    },
    calculateLinePositionX(index = 0) {
      this.createSelectorQuery().selectAll('.tab').boundingClientRect(results=>{
        // console.log(results)
        const rect = results[index]
        // console.log(rect.left)
        const currentCenterX = rect.left + rect.width / 2
        // console.log(currentCenterX)
        const linePositionWidth = rect.width * 0.6
        const linePositionX = (currentCenterX - linePositionWidth / 2) - results[0].left
        // console.log(linePositionX)
        this.setData({
          linePositionWidth,
          linePositionX
        })
      }).exec() 
    }
  }
})