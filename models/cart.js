import { observable, action } from "mobx-miniprogram";

const isObjectEquals = (obj1, obj2) => {
    let flag = true;
    Object.keys(obj2).forEach((item)=>{
        if(isObject(obj2[item])) {
            flag = isObjectEquals(obj1[item], obj2[item])
        }
        if(obj2[item] !== obj1[item]) {
            flag = false
        }
    })
    return flag
}
const isObject = obj => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

// 创建 以 user 为名的仓库
export const cart = observable({
    list:[],
    selectedGoods:null,
    get totalPrice(){
        let totalPrice = 0
        this.list.forEach(item=>{
            totalPrice += (item.price * item.count)
            let specsPrice = 0
            item.specs.forEach(specs=>{
                specsPrice += (specs.price * item.count)
            })
            totalPrice += specsPrice
        })
        return totalPrice;
    },
    // action
   addCart:action(function(goods){
        // 首先判断list中有无同产品已在购物车
       let item = this.list.find(item=>item._id===goods._id);
       if(item=== undefined) {
           goods.specsList = goods.specs.map(item=>{
               return item['label']
           }).toString().replaceAll(',','/')
           goods.count = 1
           this.list = [...this.list, goods]
       } else {
           // 有同产品让其count+1  然后在重新赋值
           const list = this.list.map(item2=>{
               if(item2._id === goods._id) {
                   item2.count = item2.count + 1;
               }
               return item2
           })
           this.list = list
       }
       console.log(this.totalPrice)
   }),
    removeCart:action(function(goods){
        this.list = this.list.filter(item=> !isObjectEquals(item,goods))
    }),
    selectGoods:action(function(goods){
        this.selectedGoods = goods
    })
})