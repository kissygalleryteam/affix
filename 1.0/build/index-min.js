/*! affix - v1.0 - 2013-06-08 7:10:06 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/affix/1.0/index",function(a,b,c){function d(a,b){var c=this;d.superclass.constructor.call(c,b),a&&c.set("target",a),c._init()}var e="",f=b.all;return a.extend(d,c,{_init:function(){var a=this,b=a.get("target");return b.length?(a.set("defaultPos",b.offset()),f(window).on("scroll",a._scrollHandler,a),void 0):!1},_scrollHandler:function(){var a=this,b=a.get("target");if(!b.length||"none"==b.css("display"))return!1;var c=a.get("topCanMove");if(!c)return a.reset(),!1;var d=f(window).scrollTop(),e=a.get("pos");a.move({top:d,left:e.left})},move:function(a){var b=this,c=b.get("target");return c.length?(c.css({position:"absolute",width:c.width()}).css(a).addClass(b.get("moveClass")),b):!1},reset:function(){var a=this,b=a.get("target");return b.length?"static"==b.css("position")?!0:(b.css({position:"static",top:0,left:0}).removeClass(a.get("moveClass")),a):!1}},{ATTRS:{target:{value:e,getter:function(a){return f(a)},setter:function(a){return f(a)}},defaultPos:{value:{left:0,top:0}},pos:{value:{left:0,top:0},getter:function(){var a=this,b=a.get("target");return b.length?b.offset():{left:0,top:0}},setter:function(a){var b=this,c=b.get("target");return c.length?a:a}},topCanMove:{value:!1,getter:function(){var a=this,b=f(window).scrollTop(),c=a.get("defaultPos");return b>c.top}},moveClass:{value:"affix-move"}}}),d},{requires:["node","base"]});