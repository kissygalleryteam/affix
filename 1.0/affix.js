!function ($) {

    "use strict"; // jshint ;_;


    /* AFFIX CLASS DEFINITION
     * ====================== */

    var Affix = function (element, options) {
        this.options = $.extend({}, $.fn.affix.defaults, options)
        this.$window = $(window)//ֻҪ�ǰ��¼�
            .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.affix.data-api',  $.proxy(function () {
                setTimeout($.proxy(this.checkPosition, this), 1)
            }, this))//�������ƶ�����ʱ�Զ���������
        this.$element = $(element)
        this.checkPosition()
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return

        var scrollHeight = $(document).height()
            , scrollTop = this.$window.scrollTop()
            , position = this.$element.offset()
            , offset = this.options.offset
            , offsetBottom = offset.bottom
            , offsetTop = offset.top
            , reset = 'affix affix-top affix-bottom'
            , affix

        if (typeof offset != 'object') offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function') offsetTop = offset.top()
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()
        //�Ƚϵ�ǰԪ�ص������ľ�����window.pageYOffset�Ĳ�
        //ͨ��affix-top affix-bottom�����������Ƴ��̶�Ч��
        affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
            false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
            'bottom' : offsetTop != null && scrollTop <= offsetTop ?
            'top'    : false

        if (this.affixed === affix) return

        this.affixed = affix
        this.unpin = affix == 'bottom' ? position.top - scrollTop : null

        this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
    }


    /* AFFIX PLUGIN DEFINITION
     * ======================= */

    var old = $.fn.affix

    $.fn.affix = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('affix')
                , options = typeof option == 'object' && option
            if (!data) $this.data('affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()//��������Ч��,��Ϊ��ֻ��һ��checkPosition����,���ⷽ�����Զ�����
        })
    }

    $.fn.affix.Constructor = Affix

    $.fn.affix.defaults = {
        offset: 0
    }


    /* AFFIX NO CONFLICT
     * ================= */

    $.fn.affix.noConflict = function () {
        $.fn.affix = old
        return this
    }


    /* AFFIX DATA-API
     * ============== */

    $(window).on('load', function () {
        //ȡ��ҳ�������д�[data-spy="affix"]��Ԫ��,�����⻹�и���data-offset-top=50 data-offset-bottom=10������
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this)
                , data = $spy.data()

            data.offset = data.offset || {}//���仺������Ͽ���һ���ռ�
            //�����ֵ
            data.offsetBottom && (data.offset.bottom = data.offsetBottom)
            data.offsetTop && (data.offset.top = data.offsetTop)

            $spy.affix(data)
        })
    })


}(window.jQuery);