/**
 * Zerobox - Lightweight lightbox plugin for jQuery
 *
 * @link https://github.com/kolodny/zerobox
 */

/*
 * Copyright (C) 2012 Moshe Kolodny
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else {
		factory(jQuery);
	}
}(function ($) {

    /**
     * Renders the linked image in a lightbox.
     *
     * @param    {object}  options              Options
     * @param    {boolean} options.preLoad      If TRUE, preloads any linked images
     * @param    {string}  options.closeTooltip Tooltip text displayed when hovering over the background
     * @return   this
     * @class    zerobox
     * @memberOf jQuery.fn
     */

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
