# compoment
### calendar 日历表
>js生成，依赖jquery

    calendar.init({
      ele: $('.dateInit'),//父级
      single:true//是否显示单月，是的话还可以显示箭头左右切换月份
      time: ['2017-09-30','2017-10-31','2017-11-30','2017-12-31']//需要渲染的月份
      data: getData//需要处理的数据
    })

> 完善中。。。




### hashMove 锚点滚动切换
> 依赖Jquery

```
hashMove.init({
  ele: '#hash-move',//父级
  a: ['第一个','第二个','第三个','第四个','第五个'],//a标签内容
  div: '.content',//需要跳转的div
})
```
![](https://raw.githubusercontent.com/hanfengmi/compoment/master/calendar/date.png)
