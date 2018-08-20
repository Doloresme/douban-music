$('#sliderBox').sliderImg({
    image: ['./img/banner-2700.jpg', './img/banner-2711.jpg', './img/banner-2712.jpg', './img/banner-2713.jpg', './img/banner-2714.jpg', './img/banner-2715.jpg']
});


var arr1 = [
    { song: 'Get money', singer: 'Soil terrapin', img: 'img/135 (1).jpg' },
    { song: '风子吟', singer: '鞭子情人', img: 'img/135 (2).jpg' },
    { song: 'Get Ascensio', singer: 'Music Group', img: 'img/135 (3).jpg' },
    { song: '你懂就好', singer: '包小静', img: 'img/135 (4).jpg' },
    { song: 'Get money', singer: 'Soil terrapin', img: 'img/135 (1).jpg' },
    { song: '风子吟', singer: '鞭子情人', img: 'img/135 (2).jpg' },
    { song: 'Get Ascensio', singer: 'Music Group', img: 'img/135 (3).jpg' },
    { song: '你懂就好', singer: '包小静', img: 'img/135 (4).jpg' },
],
    arr2 = [
        { song: '给他的歌', singer: '宽宽', img: 'img/135 (5).jpg' },
        { song: '呢喃', singer: '小河', img: 'img/135 (6).jpg' },
        { song: '情人', singer: 'Late Troubles', img: 'img/135 (7).jpg' },
        { song: 'Music Group', singer: '杨众国', img: 'img/135 (1).jpg' },
    ];


function addDom(arr, strHtml) {
    for(var i = 0; i < arr.length; i++){
        strHtml += '<div class="imgBox">\
        <img src="'+ arr[i].img +'" alt="">\
        <a class="singer" href="#">'+ arr[i].singer +'</a><br>\
        <p class="song">'+ arr[i].song +'</p>\
    </div>'
    }
    return strHtml;
}
var tabArr = [];
var div1 = addDom(arr1, '');
var div2 = addDom(arr2, '');
// console.log(div1);
tabArr.push(div1);
tabArr.push(div2);
// console.log(tabArr);
$('.tabBox').tab({
    title: ['本周流行音乐人', '上升最快音乐人'],
    content: tabArr,
    spanStr: '近期音乐歌单'
})


//input插件
$('.inp-search').search({
    text : '唱片名、表演者、条码、ISRC'
})
