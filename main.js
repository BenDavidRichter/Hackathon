// All our code goes here

var hel = Array('h','e','l','v','e','t','c','a');
$('#gameArea').ready(function (e) {
    //Add random divs as sample....
    //Change numberOfDivs if you want
    var numberOfDivs = 4;
    // add x number of divs to page.
    for (var i = 0; i < numberOfDivs; i++) {
        var g = Math.floor(Math.random() * 5);
        var c = Math.floor(Math.random() * 4);
        //Create div with class c0/c3 (color) and g0/g4 (size)
        var p = $('<div/>').addClass('c' + c).addClass('g' + g).addClass('parti');
        //Add object to body
        $('#gameArea').append(p);
    }
    //Add fish just for fun..... Try to click it!!!!
    /* $('body').append('<img src="visje.gif" class="parti" />');
    $('img').click(function () {
        $('div.parti').each(function (index, e) {
            var r = Math.floor(Math.random() * 8);
            $(e).html(hel[r]);
        });
    }); */
    //This is where the magic happends!!!
    //Add css set to none because I added display:block;position:absolute; to the css.
    $('.parti').movingBubble({ addCss: false });
});


(function ($) {
    var opts;
    var methods =
    {
        init: function (options) {
            opts = $.extend({ addCss: true, //if set to false you have to add 'display:block;position:absolute;' to the css of the moving object
                maxHeight: (500), //height bound for moving
                maxWidth: (350), //width bound for moving
                minDuration: 4000, //minimun length of animation
                deltaDuration: 5000 //maximum random number to be added to the minDuration
            }, options);

            return this.each(function () {
                var o = $(this).attr('data-move', true);
                //Add display:block;position:absolute; to attribute style. if addCss = true (default)
                if (opts.addCss)
                    o.attr('style', 'display:block;position:absolute;');

                moveObject(o);
            });
        },
        stop: function () {
            return this.each(function () {
                $(this).stop().removeAttr('data-move');

            });
        },
        toggle: function () {
            return this.each(function () {
                var o = $(this);
                if (o.attr('data-move'))
                    o.movingBubble('stop');
                else
                    o.movingBubble({ addCss: false });
            });
        }
    };

    function moveObject(i) {

        //Random new x,y inside bounds
        var x = Math.floor(Math.random() * opts.maxWidth);
        var y = Math.floor(Math.random() * opts.maxHeight);

        //Compute animation time
        var s = opts.minDuration + (Math.random() * opts.deltaDuration);

        //When animation finishes, start the function again.
        $(i).animate({ "left": x + "px", "top": y + "px" }, s, function () { moveObject(i, opts) });
    }

    $.fn.movingBubble = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.movingBubble');
        }
    }
})(jQuery);