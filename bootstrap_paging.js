(function ($) {
    var methods = {
        init: function (options) {
            var $this = $(this);
            $this.empty();
            var settings = $.extend({
                availablePages: 2,
                currentPage: 0,
                maxPages: 5,
                onClick: {
                    action: function (page, $element) {
                        $element.submit();
                    },
                    target: $this.closest('form')
                }
            }, options);
            if(settings.availablePages % 1 > 0)
                settings.availablePages = parseInt(++settings.availablePages);
            var maxPageDifference = settings.maxPages - 1;
            var middlePage = Math.floor(settings.maxPages / 2);
            // Initially set start page number to half the maximum range of pages below current page or 1 (whichever is higher)
            var firstPageNumber = (settings.currentPage - middlePage + 1) <= 0 ? 1 : (settings.currentPage - middlePage + 1);
            // Set the last page number to the start page number plus the maximum range of pages or the final page number (whichever is lower) 
            var lastPageNumber = firstPageNumber + maxPageDifference >= settings.availablePages ? settings.availablePages : firstPageNumber + maxPageDifference;
            // If the last page number is equal to the final page number reset the start page to the last page number minus the maximum range of pages or 1 (whichever is higher)
            if (lastPageNumber == settings.availablePages)
                firstPageNumber = lastPageNumber - maxPageDifference < 1 ? 1 : lastPageNumber - maxPageDifference;
            // If there are more than one pages to display render the paging widget
            if (firstPageNumber != lastPageNumber && lastPageNumber != 0) {
                // Back to first page
                var $ul = $('<ul>').addClass('pagination');
                var $firstLink = $('<a>').attr('href', '#').attr('aria-label', 'Previous').append($('<span>').attr('aria-hidden', true).addClass('glyphicon glyphicon-step-backward'));
                $firstLink.data('pageNo', 0);
                $ul.append($('<li>').addClass('back').append($firstLink));
                // Back one page
                var $prevLink = $('<a>').attr('href', '#').attr('aria-label', 'Previous').append($('<span>').attr('aria-hidden', true).addClass('glyphicon glyphicon-triangle-left'));
                $prevLink.data('pageNo', settings.currentPage == 0 ? 0 : settings.currentPage - 1);
                $ul.append($('<li>').addClass('back').append($prevLink));
                // Disable back buttons if we're on the first page
                if (settings.currentPage == 0)
                    $ul.find('.back').addClass('disabled');
                // Add a paging button for each page between "firstPageNumber" and "lastPageNumber" (inclusive)
                for (var page = firstPageNumber; page <= lastPageNumber; page++) {
                    var $link = $('<a>').attr('href', '#').append($('<span>').text(page));
                    $link.data('page-no', page - 1);
                    if (settings.currentPage == page - 1)
                        $ul.append($('<li>').addClass('active').append($link));
                    else
                        $ul.append($('<li>').append($link));
                }
                // Foward one page
                var $nextLink = $('<a>').attr('href', '#').attr('aria-label', 'Previous').append($('<span>').attr('aria-hidden', true).addClass('glyphicon glyphicon-triangle-right'));
                $nextLink.data('page-no', settings.currentPage == settings.availablePages - 1 ? settings.currentPage : settings.currentPage + 1);
                $ul.append($('<li>').addClass('foward').append($nextLink));
                // Foward to last page
                var $lastLink = $('<a>').attr('href', '#').attr('aria-label', 'Previous').append($('<span>').attr('aria-hidden', true).addClass('glyphicon glyphicon-step-forward'));
                $lastLink.data('pageNo', settings.availablePages - 1);
                $ul.append($('<li>').addClass('foward').append($lastLink));
                // Disable foward buttons if we're on the last page
                if (settings.currentPage == settings.availablePages - 1)
                    $ul.find('.foward').addClass('disabled');
                $ul.appendTo($this);
                // Add click handlers
                $this.find('a').click(function () {
                    settings.onClick.action.call($this, $(this).data('page-no'), settings.onClick.target);
                });
            }
            return this;
        }
    };
    $.fn.bootstrapPaging = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error("Method " + method + " does not exist on jQuery.bootstrapPaging");
        }
    };
})(jQuery);
