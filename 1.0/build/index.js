/*
combined files : 

gallery/affix/1.0/index

*/
/**
 * @fileoverview 用于固定一个容器在某个位置，当容器不在视口时滚动该容器
 * @author 明河<minghe12@126.com>
 * @module affix
 **/
KISSY.add('gallery/affix/1.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 用于固定一个容器在某个位置，当容器不在视口时滚动该容器
     * @class Affix
     * @constructor
     * @extends Base
     */
    function Affix(target,comConfig) {
        var self = this;
        //调用父类构造函数
        Affix.superclass.constructor.call(self, comConfig);
        if(target) self.set('target',target);
        self._init();
    }
    S.extend(Affix, Base, /** @lends Affix.prototype*/{
        _init:function(){
            var self = this;
            var $target = self.get('target');
            if(!$target.length) return false;
            self.set('defaultPos',$target.offset());
            $(window).on('scroll',self._scrollHandler,self);
        },
        _scrollHandler:function(){
            var self = this;
            var $target = self.get('target');
            //如果不存在该元素，或该元素为隐藏，不需要处理滚动逻辑
            if(!$target.length || $target.css('display') == 'none') return false;

            var topCanMove = self.get('topCanMove');
            if(!topCanMove){
                self.reset();
                return false;
            }
            var scrollTop = $(window).scrollTop();
            //目标元素的位置
            var position = self.get('pos');
            self.move({top:scrollTop,left:position.left});
        },
        move:function(pos){
            var self = this;
            var $target = self.get('target');
            if(!$target.length) return false;

            $target.css({'position':'absolute','width':$target.width()}).css(pos).addClass(self.get('moveClass'));
            return self;
        },
        /**
         * 恢复到默认位置
         */
        reset:function(){
            var self = this;
            var $target = self.get('target');
            if(!$target.length) return false;

            if($target.css('position') == 'static') return true;

            $target.css({position:'static',top:0,left:0})
                .removeClass(self.get('moveClass'));
            return self;
        }
    }, {ATTRS : /** @lends Affix*/{
        /**
         * 目标元素
         */
         target:{
             value:EMPTY,
             getter:function(v){
                 return $(v);
             },
            setter:function(v){
                return $(v);
            }
         },
         defaultPos:{
             value:{left:0,top:0}
         },
        /**
         * 目标元素位置
         */
         pos:{
            value:{left:0,top:0},
            getter:function(v){
                var self = this;
                var $target = self.get('target');
                if(!$target.length) return {left:0,top:0};

                return $target.offset();
            },
            setter:function(v){
                var self = this;
                var $target = self.get('target');
                if(!$target.length) return v;

                return v;
            }
         },
        /**
         * 目标元素已经不在视口内，需要固定位置
         */
         topCanMove:{
             value:false,
             getter:function(v){
                 var self = this;
                 var scrollTop = $(window).scrollTop();
                 //目标元素的位置
                 var pos = self.get('defaultPos');

                 return scrollTop > pos.top;
             }
         },
        moveClass:{value:'affix-move'}
    }});
    return Affix;
}, {requires:['node', 'base']});




