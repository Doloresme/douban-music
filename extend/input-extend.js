(function($){
    //封装插件的功能
    var obj = {
        init (options) {
            this.opt = options || {};
            this.createDom();
            this.bindEvent();
        },
        createDom : function () {
            var htmlStr = `<div class="inp">
                <input type="text" placeholder="">
                <span class="search"></span>
            </div>` ;
            this.opt.father.html(htmlStr);
            $('.inp input').attr('placeholder', this.opt.text)
        },
        bindEvent : function(){
            var that = this;
        }
    }

    //插件扩展
    $.fn.extend({
        search : function(options){
            options.father = this || $('body');
            obj.init(options);
        }
    })
})(jQuery)