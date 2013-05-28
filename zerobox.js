$.fn.zerobox = function(options) {
    options = $.extend({
        preLoad: true
    }, options);
    
    return this.each(function() {
        var $this = $(this);
        
        $this.click(function(e) {
            e.preventDefault();

            var $img = $this.find('img'),
                imgSrc = this.href,
                offset = $img.offset(),
                clonedImg = $img[0].cloneNode(),
                imgWidth = $img.width(),
                imgHeight = $img.height(),
                imgFullWidth = clonedImg.width,
                imgFullHeight = clonedImg.height;

            var $zerobox = $('<div id="zerobox" title="click to close">')
                .css({
                    position: 'fixed',
                    top: offset.top - $(window).scrollTop(),
                    left: offset.left - $(window).scrollLeft(),
                    height: $img.height(),
                    width: $img.width(),
                    zIndex: 1099,
                    background: 'rgba(0, 0, 0, .75) url("' + imgSrc + '")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: imgWidth + 'px ' + imgHeight + 'px',
                    cursor: 'pointer',
                    textAlign: 'center'
                })
                .click(function() { $zerobox.remove(); })
                .appendTo(document.body).animate({
                    left: 0, top: 0, width: '100%', height: '100%'
                });
                
            var $animatedDiv = $('<div>').css({width: imgWidth, height: imgHeight});
            $animatedDiv.animate({width : imgFullWidth, height: imgFullHeight }, {step: function() {
                $zerobox.css('backgroundSize', $animatedDiv.width() + 'px ' + $animatedDiv.height() + 'px');
            }});
        });
        if (options.preLoad) {
            $this.one('mouseover', function() {
                // preload image
                var image = new Image();

                image.src = this.href; 
            });
        }
    });
};
