// $.fn.extend({
//     sliderImg : function () {
//          this --> wrapper + this.width/this.height
//          image : ['./img/1.jpg', './img/2.jpg',...], //arr.length --> index
//     }
// })  ==> $('.wrapper').sliderImg(); 调用sliderImg方法，传入一个对象，包含以下几个元素：
// $('#sliderBox').hmtl("<div>...</div>"); 生成的轮播图结构  
// 图片路径不同，图片数量不同（索引）
// 尺寸不同（width/heigth)
// wrapper（father）调用的父级不同


(function ($) {
    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body'); //父级是否存在  不存在就插入到body中
            //options 是个对象 为什么会有father？ 
            new Slider(options); //实例化一个对象
        }
    })

    function Slider(options) {
        //实现轮播图功能
        this.opts = options || {};
        this.fat = this.opts.father;
        this.init();//入口函数
        this.len = this.opts.image.length;
        this.w = this.fat.width();
        this.h = this.fat.height();
        // console.log(this.w);
        this.key = true;
        this.indexNum = 0;

    }//使用一个构造函数
    Slider.prototype.init = function () {
        this.createDom();
        this.autoMove();
        this.bindEvent();
        // this.changeStyle();
    }
    Slider.prototype.createDom = function () {
        var len = this.opts.image.length, 
            w = this.fat.width(),
            h = this.fat.height(),
            sliderBox = $('#sliderBox'),
            sliderPage = $('<ul class="sliderPage"></ul>'),
            sliderBtn = $('<div class="sliderBtn left">&lt;</div><div class="sliderBtn right">&gt;</div>'),
            sliderIndex = $('<div class="sliderIndex"></div>'),
            listStr = "",
            spanStr = "";
        // console.log(len);
        for (var i = 0; i < len; i++) {
            listStr += '<li><a href="#"><img src="' + this.opts.image[i] + '" /></a></li>';
            spanStr += '<span></span>';
            // console.log(spanStr,listStr);
        }
        listStr += '<li><a href="#"><img src="' + this.opts.image[0] + '" /></a></li>';
        sliderPage.html(listStr);
        sliderIndex.html(spanStr);
        sliderBox.append(sliderPage).append(sliderBtn).append(sliderIndex);
        // console.log($('.sliderIndex span').eq(0));
        // console.log(that.w, that.h);
        $('.sliderIndex span:first').addClass('active');
        $('.sliderPage li').css({ 
            'width': w + 'px', 
            'height': h + 'px' 
        });
        $('.sliderPage').css('width', w * (len + 1) + 'px').css('height', h + 'px');
        console.log($('.sliderPage li').css('width'));
    }
    Slider.prototype.bindEvent = function () {
        var that = this;
        $('.sliderBtn').add($('.sliderIndex span')).on('click', function (e) {
            // console.log(e.target);
            if ($(this).hasClass('left')) {
                that.startMove('left');
            } else if ($(this).hasClass('right')) {
                that.startMove('right');
            } else {
                // console.log($(this).index());
                that.startMove($(this).index());
            }
        })
        $('#sliderBox').on('mouseenter', function () {
            clearTimeout(that.timer);
        }).on('mouseleave', function () {
            that.autoMove();
        })
    }
    Slider.prototype.autoMove = function () {
        var that = this;
        clearTimeout(that.timer);
        that.timer = setTimeout(function () {
            that.startMove();
        }, 2500)
    }
    Slider.prototype.startMove = function (dir) {
        var len = this.opts.image.length;
        var that = this;
        if (that.key) {
            that.key = false;
            if (dir == undefined || dir == 'right') {
                if (that.indexNum == len - 1) {
                    $('.sliderPage').animate({ 'left': - len * that.w }, function () {
                        $('.sliderPage').css('left', 0);
                        that.key = true;
                    })
                    that.indexNum = 0;
                } else {
                    that.indexNum++;
                }
            } else if (dir == 'left') {
                if (that.indexNum == 0) {
                    $('.sliderPage').css('left', -that.w * len);
                    that.indexNum = len - 1;
                } else {
                    that.indexNum--;
                }
            } else {
                that.indexNum = dir;
            }
            // console.log(that.indexNum);
            $('.sliderPage').animate({ 'left': - that.indexNum * that.w }, function () {
                that.autoMove();
                that.key = true;
            })
            that.changeStyle();
        }
    }
    Slider.prototype.changeStyle = function () {
        // console.log(this.indexNum);
        $('.sliderIndex span.active').removeClass('active');
        $('.sliderIndex span').eq(this.indexNum).addClass('active');
    }
}(jQuery))






// var timer = null,
//     indexNum = 0,
//     len = $('.sliderPage img').length - 1,
//     w = $('.sliderPage img').width(),
//     key = true;
// function init() {
//     autoMove();
//     bindEvent();
// }
// init();

// function startMove(dir) {
//     if (key) {
//         key = false;
//         if (dir == undefined || dir == 'right') {
//             if (indexNum == len - 1) {
//                 $('.sliderPage').animate({ 'left': -w * len }, function () {
//                     $(this).css('left', 0);
//                     key = true;
//                 })
//                 indexNum = 0;
//             } else {
//                 indexNum++;
//             }
//         } else if (dir == 'left') {
//             if (indexNum == 0) {
//                 $('.sliderPage').css('left', -w * len + 'px');
//                 indexNum = len - 1;
//             } else {
//                 indexNum--;
//             }
//         } else {
//             indexNum = dir;
//         }
//     }
//     $('.sliderPage').animate({ 'left': - (indexNum * w) + 'px' }, function () {
//         autoMove();
//         key = true;
//     });
//     changeStyle();

// }
// function bindEvent() {
//     $('.sliderBtn').add($('.sliderIndex span')).on('click', function (e) {
//         // console.log(e.target);
//         if ($(this).hasClass('left')) {
//             startMove('left');
//         } else if ($(this).hasClass('right')) {
//             startMove('right');
//         } else {
//             console.log($(this).index());
//             startMove($(this).index());
//         }
//     })
//     $('.wrapper').on('mouseenter', function () {
//         clearTimeout(timer);
//     }).on('mouseleave', function () {
//         autoMove();
//     })
// }
// function changeStyle() {
//     $('.sliderIndex span.active').removeClass('active');
//     $('.sliderIndex span').eq(indexNum).addClass('active');
// }
// function autoMove() {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//         startMove();
//         changeStyle();
//     }, 2500);
// }