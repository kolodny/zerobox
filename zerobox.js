// more info @ https://github.com/kolodny/zerobox/

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function($) {
    $.fn.zerobox = function(options) {
        options = $.extend({
            preLoad: true,
            closeTooltip: 'Click to close'
        }, options);

        return this.each(function() {
            var $this = $(this),
                preloadedImage;

            $this.click(function(e) {
                e.preventDefault();

                var $img = $this.find('img'),
                    imgSrc = this.href,
                    offset = $img.offset(),
                    thumbWidth,
                    thumbHeight,
                    fullWidth,
                    fullHeight,
                    $animatedDiv,
                    $zerobox,
                    css = {
                        position: 'fixed',
                        top: offset.top - $(window).scrollTop(),
                        left: offset.left - $(window).scrollLeft(),
                        height: $img.height(),
                        width: $img.width(),
                        zIndex: 1099,
                        background: 'rgba(0, 0, 0, .75) url("' + imgSrc + '")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                        textAlign: 'center'
                    };

                if (preloadedImage) {
                    thumbWidth = $img.width(),
                        thumbHeight = $img.height(),
                        fullWidth = preloadedImage.width,
                        fullHeight = preloadedImage.height;

                    css.backgroundSize = thumbWidth + 'px ' + thumbHeight + 'px';
                }

                $zerobox = $('<div id="zerobox">')
                    .attr('title', options.closeTooltip)
                    .css(css)
                    .click(function() { $zerobox.remove(); })
                    .appendTo(document.body).animate({
                        left: 0, top: 0, width: '100%', height: '100%'
                    });

                if (preloadedImage) {
                    $animatedDiv = $('<div>').css({width: thumbWidth, height: thumbHeight});

                    $animatedDiv.animate({width : fullWidth, height: fullHeight }, {step: function() {
                        $zerobox.css('backgroundSize', $animatedDiv.width() + 'px ' + $animatedDiv.height() + 'px');
                    }});
                }
            });

            if (options.preLoad) {
                $this.one('mouseover', function() {
                    // preload image
                    var image = new Image();

                    image.onload = function() { preloadedImage = image; };
                    image.src = this.href;
                });
            }
        });
    };
}));
