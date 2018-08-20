(function($){
    function Tab (options) {
        this.opts = options || {};
        this.init();
    }
    Tab.prototype.init = function () {
        this.createDom();
        this.bindEvent();
        
    }
    Tab.prototype.createDom = function () {
        // console.log(111);
        var tabHeader = $('<div class="tabHeader"></div>'),
            // TabContent = $('<div class="TabContent"></div>'),
            len = this.opts.title.length,
            titStr = $('<span>'+ this.opts.spanStr +'</span>'),
            ulStr = $('<ul class="tabTitle"></ul>'),
            liStr = '',
            contStr = '';
        // console.log(len);
        for(var i = 0; i < len; i ++){
            liStr += '<li no="'+ i +'"><a href="#">' + this.opts.title[i] +'</a>|</li>';
            contStr += '<div class="tabContent" no="'+ i +'"> ' + this.opts.content[i] +'</div>';
        }
        // console.log(liStr);
        ulStr.html(liStr);
        tabHeader.append(titStr).append(ulStr);
        // this.opts.father  这个是获取到要添加tab插件的元素(.tabBox)
        this.opts.father.html(tabHeader).append(contStr);
        $('.tabTitle li').eq(0).addClass('active');
        $('div.tabContent').eq(0).addClass('active');
        this.opts.father.addClass('tabBox');
    }
    Tab.prototype.bindEvent = function () {
        var that = this;
        $('.tabTitle').on('click', 'a', function(e){
            e.preventDefault();
            // console.log($(this).parent().attr('no'));
            $('.tabTitle li.active').removeClass('active');
            $('div.tabContent.active').removeClass('active');
            var i = $(this).parent().attr('no');
            $(this).parent().addClass('active');
            $('div.tabContent').eq(i).addClass('active');
        })
    }

    $.fn.extend({
        tab:function(options) {
            options.father = this || $('body');
            new Tab(options);
        }
    })
}(jQuery))