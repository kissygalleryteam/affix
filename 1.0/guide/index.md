## 综述

## 快速使用

### 创建个容器层

    <div id="J_AffixTarget" class="affix-bar">
        这里的内容必须跟随显示
    </div>


### 初始化组件

    S.use('gallery/affix/1.0/index', function (S, Affix) {
         var affix = new Affix('#J_AffixTarget');
    })

## 参数说明

参数 | 默认值|读/写|用途
------------ | -------------| -------------
target | '' | 只读 | 目标元素，配置了组件第一个参数，无需设置该值
defaultPos | {left: 0, top: 0} | 只读 | 目标元素默认位置
pos | {left: 0, top: 0} | 读/写 | 目标元素位置
topCanMove | false | 只读 | 目标元素是否已经不在视口内，需要固定位置
moveClass | 'affix-move' | 读/写 | 处于移动状态下的样式


