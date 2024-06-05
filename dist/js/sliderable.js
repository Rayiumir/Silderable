/**!
 * Sliderable v1.0.0
 *
 * Simple and Lightweight Multi Item Carousel Bootstrap
 *
 * @copyright Copyright 2024 Rayiumir Limited.
 * @author    Raymond Baghumian.
 * @link      https://github.com/Rayiumir/Silderable
 * @forked    https://bootsnipp.com/snippets/9kBZp
 *
 */

$(document).ready(function () {
    var itemsMainDiv = ('.Sliderable');
    var itemsDiv = ('.Sliderable-inner');
    var itemWidth = "";
    var startX = 0;
    var endX = 0;

    $('.btn-left, .btn-right').click(function () {
        var condition = $(this).hasClass("btn-left");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();

    $(window).resize(function () {
        ResCarouselSize();
    });

    // Adding touch event listeners
    $(itemsDiv).on('touchstart', function(event) {
        startX = event.originalEvent.touches[0].clientX;
    });

    $(itemsDiv).on('touchmove', function(event) {
        endX = event.originalEvent.touches[0].clientX;
    });

    $(itemsDiv).on('touchend', function(event) {
        var threshold = 50; // minimum swipe distance
        if (startX - endX > threshold) {
            // Swipe left
            click(1, $(this).closest(itemsMainDiv).find('.btn-right')[0]);
        } else if (endX - startX > threshold) {
            // Swipe right
            click(0, $(this).closest(itemsMainDiv).find('.btn-left')[0]);
        }
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "Sliderable" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }

    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.btn-left');
        var rightBtn = ('.btn-right');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});