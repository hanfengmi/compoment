var calendar = {
  data:{
    month_olympic : [31,29,31,30,31,30,31,31,30,31,30,31],
    month_normal : [31,28,31,30,31,30,31,31,30,31,30,31],
  },
  ele:null,
  singleMonth:'',
  init:function(obj){//
    this.ele = obj.ele;
    this.more(obj)
    if(obj.single){
      this.singleMonth = obj.time[0]
    }
  },
  dayStart:function(year,month){//月份加1，获取某月第一天是几号
    var tempDate = new Date(year,month,1)
    return (tempDate.getDay());
  },
  daysMonth:function(year,month){//月份加1,获取某年某月有几天
    var tmp = year % 4;
    if(tmp == 0){
      return (this.data.month_olympic[month])
    }else{
      return (this.data.month_normal[month])
    }
  },
  adNum:function(num){
    if(num >9){
      return num;
    }else {
      return '0'+num;
    }
  },
  refreshDate:function(date, single){
    var start = parseInt(date.split('-')[1]);
    // console.log(start)
    if(single){
      $('.dateInit').html('');
    }
    var body = $('<DIV class="caBody">')

    var title = $('<DIV class="ca-title">')
    var dateB = $('<DIV class="ca-date">')
    title.html('<h1 id="ca-month-'+start+'">随机月</h1><h2 id="ca-year-'+start+'">随机年</h2>'+(single?'<i class="preve"><</i><i class="next">></i>':''))
    dateB.html('<div class="lightgrey body-list"><ul class="clearfix"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li></ul></div><div class="darkgrey body-list"><ul id="ca-days-'+start+'" class="clearfix"></ul></div>')

    body.append(title)
    body.append(dateB)
    //
    //js生成日历
    var my_date;
    if(date){
      my_date = new Date(date);
    }else {
      my_date = new Date();
    }
    var today_date = new Date();
    var my_year = my_date.getFullYear();
    var my_month = my_date.getMonth();
    var my_day = my_date.getDate();
    // console.log(my_year,my_month,my_day)
    var str = "";
    var myclass;
    var totalDay = this.daysMonth(my_year,my_month);
    var firstDay = this.dayStart(my_year,my_month);
    firstDay = (firstDay == 0)?7:firstDay;
    for(var i = 1; i<firstDay; i++){
  		str += "<li></li>"; //为起始日之前的日期创建空白节点
  	}
    for (var i = 1; i<= totalDay;i++){
      // console.log(i,totalDay,my_day)
      if(i == today_date.getDate() && my_year==today_date.getFullYear() && my_month==today_date.getMonth()){//当前日期
        // console.log('今天');
        myclass = " class='greenDay calendar-day'";
      }else if(i < today_date.getDate() && my_year==today_date.getFullYear() && my_month==today_date.getMonth() || my_year < today_date.getFullYear() || (my_year == today_date.getFullYear() && my_month < today_date.getMonth())){
        // console.log('以前的')
        myclass = " class='lightgrey calendar-day'";
      }else{
        // console.log('以后的')
        myclass = " class='darkgrey calendar-day'";
      }
      str += "<li"+myclass+" data-date='"+my_date.getFullYear()+"-"+this.adNum(my_date.getMonth()+1)+"-"+this.adNum(i)+"'>"+i+"</li>";
    }
    // console.log(body)
    body.find('#ca-days-'+start).html(str);
    body.find('#ca-month-'+start).html(this.adNum(my_month+1)+'月')
    body.find('#ca-year-'+start).html(my_year)

    this.ele.append(body)
  },
  more:function(obj){
    var that = this;
    if(obj.single){
      that.refreshDate(obj.time[0], obj.single);
    }else{
      obj.time.forEach(function(e,i){
        that.refreshDate(e);
      })
    }
    this.moseover();
    this.click();
    this.changeDate();
  },
  moseover:function(){
    $('.dateInit').on('mouseenter','.calendar-day',function(){
      $(this).addClass('mouse-day')
    })
    $('.dateInit').on('mouseleave','.calendar-day',function(){
      $(this).removeClass('mouse-day')
    })
  },
  click:function(){
    $('.dateInit').on('click','.calendar-day',function(){
      if($(this).hasClass('select-day')){
        $(this).removeClass('select-day')
      }else{
        $('.calendar-day').removeClass('select-day')
        $(this).addClass('select-day')
      }
    })
  },
  changeDate:function(){
    var that = this;
    $('.dateInit').on('click','.ca-title .next',function(){
      var time = that.singleMonth;
      //
      that.singleMonth = that.someFunction.takeMonth(time, true)
      that.refreshDate(that.singleMonth, true)
      console.log('xxxxxxxxxxxxxxxx',that.singleMonth);
    })
    $('.dateInit').on('click','.ca-title .preve',function(){
      var time = that.singleMonth;
      // that.refreshDate('2017-11', true)
      that.singleMonth = that.someFunction.takeMonth(time)
      that.refreshDate(that.singleMonth, true)
      console.log('ssssssssssssss', that.singleMonth)
    })
  },
  someFunction:{//need function
    takeMonth:function(str,next){
      var now = new Date(str);
      var newDate = null;
      if(next) {
        if(now.getMonth()+2 > 12){
          newDate = (now.getFullYear()+1) + '-01'
        }else {
          newDate = now.getFullYear() +'-'+ (now.getMonth()+2)
        }
      }else {
        if(now.getMonth()-1 <= 0){
          newDate = (now.getFullYear()-1) + '-12'
        }else {
          newDate = now.getFullYear() +"-"+ (now.getMonth())
        }
      }
      return newDate;
    }
  }
}
