var hashMove = {
  init:function(obj){
    // console.log($(obj.ele))
    // console.log(obj.a)
    this.create(obj);
    this.hashchange();
    this.toTop();
  },
  create:function(obj){
    obj.a.forEach(function(e,i){
      var id = $(obj.div).eq(i).attr('id');
      var innerA = $("<a href='#w-"+id+"'>"+e+"</a>");
      $(obj.ele).append(innerA);
    })
    var shang = $('<span class="toTop"></span>')
    $(obj.ele).append(shang);
  },
  hashchange:function(){
    var that = this;
    window.onhashchange = window.onload = function(){
      that.scrollToAnchor();
    };
  },
  scrollToAnchor:function(){
    var hash = this.getHash(), // 获取url的hash值
      anchor = this.getAnchor(hash), // 获取伪锚点的id
      anchorDom, // 伪锚点dom对象
      anchorScrollTop; // 伪锚点距离页面顶部的距离
      if(anchor.length > 0){
        anchorDom = $('#'+anchor);
        anchorScrollTop = anchorDom[0].offsetTop;
      }
      this.animateMove(document.body.scrollTop, anchorScrollTop);
      // console.log(anchorDom,anchorScrollTop,)
  },
  animateMove:function(scrollTop, eleTop, toTop){
    var that = this;
    if(toTop){
      var nowNum = scrollTop - 100;
      if(nowNum <= 0){
        nowNum = 0;
        console.log(12314214);
        console.log(window.location.href.split('#')[0])
      }
       window.requestAnimationFrame(function(){
         document.body.scollTop = nowNum;
         document.documentElement.scrollTop = nowNum;
         if(nowNum == eleTop){
           return
         }
         that.animateMove(nowNum, 0, true)
       })
    }else{
      var nowNum = scrollTop + 50;
      if(nowNum >= eleTop){
        nowNum = eleTop;

      }
       window.requestAnimationFrame(function(){
         document.body.scollTop = nowNum;
         document.documentElement.scrollTop = nowNum;
         if(nowNum == eleTop){
           return
         }
         that.animateMove(nowNum, eleTop)
       })
    }
  },
  toTop:function(){
    var that = this;
    $(window).on('scroll',function(){
      if(document.documentElement.scrollTop > 300){
        $('.toTop').show();
      }else{
        $('.toTop').hide();
      }
    })
    $('.toTop').on('click',function(){
      that.animateMove(document.documentElement.scrollTop, 0, true);
      // document.documentElement.scrollTop = 0;
      // console.log(document.documentElement.scrollTop)
      // window.requestAnimationFrame(function(){
      //
      // })
    })

  },
  getHash:function(){
    return window.location.hash.substring(1);
  },
  getAnchor:function(str){
    if(str.indexOf('w-') === 0){
      return str.split('-')[1]
    }
  }
}
