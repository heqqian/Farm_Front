// components/chart-bar/index.js
// import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import {cart} from '../../models/cart'

Component({
    /**
     * 组件的属性列表
     */
    // behaviors: [storeBindingsBehavior],
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        disabled: false,
        showList: false
    },
    storeBindings: {
        store:cart,
        fields: {
            list:'list',
            totalPrice: "totalPrice",
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onClickBag() {
            this.setData({
                showList: !this.data.showList
            })
        }
    }
})
