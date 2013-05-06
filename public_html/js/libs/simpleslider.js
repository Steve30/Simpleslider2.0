(function($) {
    $.fn.extend({
        simpleslider: function(options) {
            var self = this;

            this.defaults = {
                sliderItemClass: '.slider-item',
                navigationItems: {
                    enableArrows: true,
                    enablePagination: true
                },
                animateSpeed: '1000',
                animateEasing: 'swing',
                paginationListContainer: 'slider-pagination',
                enableAllArrows: true,
                isAutoPlay: false, 
                isDiplayPaginationNumber: false,
                displayShowItemNumber: 1,
                enableItemClickEvent: false,
                onClickedItemEvent: function(el) {
                    console.info(el);
                }
            };

            this.options = $.extend(this.defaults, options);

            /**
             *  This is an init function, which set the variable
             */
            this.init = function() {
                self.navigationItems = self.defaults.navigationItems;

                self.sliderContainer = $(this);
                self.sliderContainerWidth = null;
                self.sliderHolder = $(this).find('.slider-holder');
                self.sliderItems = self.sliderHolder.find(self.defaults.sliderItemClass);

                self.listContainer = self.sliderHolder.find('ul').eq(0);
                self.listContainerWidth = 0;

                self.oneItemWidth = null;
                self.itemMarginVal = null;
                self.isSetItemEvent = self.defaults.enableItemClickEvent;
                
                for (var item in self.navigationItems) {

                    if (item === 'enableArrows' && self.navigationItems[item] === true) {

                        self.leftBtnId = 'left-btn';
                        self.rightBtnId = 'right-btn';
                        self.arrowWidth = null;
                        self.arrowHeight = null;
                        self.isSetArrow = self.navigationItems[item];

                    } else if (item === 'enablePagination' && self.navigationItems[item] === true) {

                        self.paginationListContainer = self.defaults.paginationListContainer;
                        self.paginationNumber = null;
                        self.allPaginationButton = null;
                        self.changePagination = false;
                        self.activeIndex = null;
                        self.activeClass = 'active';
                        self.slideIndex = null;
                        self.isSetPagination = self.navigationItems[item];

                    }
                }

            };

            /**
             *  This function build the slider
             */
            this.buildSlider = function() {

                self.sliderItems.each(function(index) {
                    var el = $(this);

                    el.css({
                        float: 'left'
                    });

                    if (self.oneItemWidth === null) {
                        self.oneItemWidth = el.outerWidth(true);
                        self.itemMarginVal = parseInt(el.css('margin-right'));
                    }

                    self.listContainerWidth += el.outerWidth(true);
                });

                self.sliderContainerWidth = self.defaults.displayShowItemNumber * self.oneItemWidth;

                self.sliderHolder.css({
                    width: self.sliderContainerWidth - self.itemMarginVal + 'px',
                    overflow: 'hidden'
                });

                self.listContainer.css({
                    width: self.listContainerWidth + 'px'
                });
                
                self.setContainerWidth = self.sliderContainerWidth - self.itemMarginVal;
                
                self.sliderContainer.css({
                    position: 'relative',
                    width: self.setContainerWidth + 'px',
                    margin: '0 auto'
                });
                
                if (self.isSetArrow === true) {
                    self.addSliderArrow();
                }

                if (self.isSetPagination === true) {
                    self.addSliderPagination();
                }
                       
            };

            /**
             *  This function add slider arrow(s)
             */
            this.addSliderArrow = function() {
                var containerHeight = self.sliderContainer.outerHeight(true);

                self.sliderContainer.prepend('<a href=# id="' + self.leftBtnId + '" class="arrows"><span>&nbsp;</span></a>');
                self.sliderContainer.append('<a href=# id="' + self.rightBtnId + '" class="arrows"><span>&nbsp;</span></a>');

                self.displayLeftBtn('none');

                self.sliderContainer.find('.arrows').each(function() {
                    if (self.arrowWidth === null) {
                        self.arrowWidth = $(this).outerWidth(true);
                        self.arrowHeight = $(this).outerHeight(true);
                    }
                    ;

                    $(this).css({
                        top: (containerHeight / 2 - self.arrowHeight / 2) + 'px'
                    });

                });

                self.sliderContainer.css({
                    paddingLeft: self.arrowWidth + 'px',
                    paddingRight: self.arrowWidth + 'px'
                });
    
            };

            /**
             *  This function display the left arrow, if enableAllArrows is true
             *  
             *  @param {string} type   If none, not display. If block, is display 
             */
            this.displayLeftBtn = function(type) {
                if (self.defaults.enableAllArrows !== true) {
                    $('#' + self.leftBtnId).css({
                        display: type
                    });
                }
            };

            /**
             *  This function add pagination
             */
            this.addSliderPagination = function() {
                var sumOfItems = self.defaults.displayShowItemNumber,
                        listHtml = '', text, paginationContainer;

                if (sumOfItems === 1) {
                    sumOfItems = self.sliderItems.length;
                }
                ;

                for (var i = 0; i <= sumOfItems - 1; i++) {

                    text = (self.defaults.isDiplayPaginationNumber === true) ? (i + 1) : '&nbsp;';

                    listHtml += '<li><a href="#" data-item-number=' + i + '>' + text + '</a></li>';
                }
                ;

                self.sliderContainer.append('<ol class="' + self.paginationListContainer + '">' + listHtml + '</ol>');
                
                paginationContainer = $('.' + self.paginationListContainer);
                
                self.allPaginationButton = paginationContainer.find('a');

                self.allPaginationButton.eq(0).addClass(self.activeClass);
            };

            /**
             *  This function replace item, when click arrow(s)
             *  
             *  @param {string} state  If begin, replace the begin items, which not see. If last, replace the last items, which not see
             */
            this.replaceItem = function(state) {

                if (state === 'begin') {

                    self.changeItemPosition(state);

                    self.listContainer.css({
                        marginLeft: -self.oneItemWidth + 'px'
                    });

                } else if (state === 'last') {

                    self.changeItemPosition(state);

                    self.listContainer.css({
                        marginLeft: 0
                    });

                }

                if (self.isSetPagination === true) {
                    self.changePaginationItemPosition(state);
                }

                self.sliderItems = self.sliderHolder.find(self.defaults.sliderItemClass);

                self.sliderItems.css({
                    float: 'left'
                });

                self.sliderItems.eq(self.sliderItems.length - 1).addClass('last');

                if (self.isSetItemEvent === true) {
                   self.removeSliderItemEvents();
                   self.addSliderItemEvents();
                }

            };
            /**
             *  This function change the pagination style
             *  
             *  @param {string} type  Begin or last
             */
            this.changePaginationItemPosition = function(type) {

                if (type === 'begin') {

                    self.setActiveIndex();

                    if (self.activeIndex === self.allPaginationButton.length - 1) {
                        self.activeIndex = self.allPaginationButton.length - 2;
                    } else {
                        self.activeIndex--;
                    }

                    self.allPaginationButton.eq(self.activeIndex).addClass(self.activeClass);

                } else {

                    self.setActiveIndex();

                    if (self.activeIndex === self.allPaginationButton.length - 1) {
                        self.activeIndex = 0;
                    } else {
                        self.activeIndex++;
                    }

                    self.allPaginationButton.eq(self.activeIndex).addClass(self.activeClass);

                }

            };

            /**
             * This function set the active index element and remove class
             */
            this.setActiveIndex = function() {
                self.allPaginationButton.each(function(index) {
                    if ($(this).hasClass(self.activeClass)) {
                        $(this).removeClass(self.activeClass);
                        self.activeIndex = index;
                    }
                });
            };

            /**
             * This function change the item position, when click on the arrow
             * 
             * @param {string} type  Begin or last
             */
            this.changeItemPosition = function(type) {

                var item, htmlObj;

                if (type === 'begin') {
                    item = self.sliderItems.eq(self.sliderItems.length - 1);
                } else {
                    item = self.sliderItems.eq(0);
                }

                htmlObj = item[0];

                self.sliderItems.eq(self.sliderItems.length - 1).removeClass('last');

                if (type === 'begin') {
                    self.listContainer.prepend(htmlObj);
                } else {
                    self.listContainer.append(htmlObj);
                }

            };

            /**
             *  This function add events for the arrow element(s)
             */
            this.addArrowsEvents = function() {
                $('.arrows').each(function() {

                    $(this).on({
                        click: function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            var id = $(this).attr('id'),
                                    marginLeftValue = parseInt(self.listContainer.css('margin-left'));

                            if (id === self.rightBtnId) {

                                if (self.isSetPagination === true) {
                                    self.changePagination = true;
                                }

                                if (marginLeftValue < 0) {
                                    var width = 0,
                                            htmlTexts = new Array();
                                    self.sliderItems.each(function() {

                                        width += self.oneItemWidth;
                                        htmlTexts.push($(this).eq(0)[0]);

                                        if (-marginLeftValue === width) {

                                            htmlTexts.reverse();

                                            for (var i = 0; i <= htmlTexts.length - 1; i++) {
                                                self.sliderItems.eq(self.sliderItems.length - 1).after(htmlTexts[i]);
                                            }

                                            self.sliderItems = self.sliderHolder.find(self.defaults.sliderItemClass);

                                            self.sliderItems.filter('.last').removeClass('last');

                                            self.sliderItems.eq(self.sliderItems.length - 1).addClass('last');

                                            self.listContainer.css({
                                                marginLeft: 0
                                            });
                                        }
                                    });
                                }

                                self.listContainer.animate({
                                    marginLeft: '-=' + self.oneItemWidth + 'px'
                                }, 'normal', function() {
                                    self.replaceItem('last');
                                    self.displayLeftBtn('block');
                                });

                            } else if (id === self.leftBtnId) {

                                if (marginLeftValue === 0) {
                                    self.replaceItem('begin');
                                } else if (self.isSetPagination === true) {
                                    self.changePaginationItemPosition('begin');
                                }

                                self.listContainer.animate({
                                    marginLeft: '+=' + self.oneItemWidth + 'px'
                                }, 'normal');
                            }

                        }
                    });
                });
            };

            /**
             *  This function add events for the slider items
             */
            this.addSliderItemEvents = function() {
                self.sliderItems.on({
                    'click.slideItemEvent': function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $(this).trigger('onItemClicked', $(this));
                    },
                    'onItemClicked.slideItemEvent': function(el) {
                        try {
                            self.defaults.onClickedItemEvent($(el.currentTarget));
                        }
                        catch (error) {
                            console.info(error);
                        }

                    }
                });

            };

            /**
             *  This function add events for the pagination
             */
            this.addPaginationEvents = function() {

                self.allPaginationButton.on({
                    click: function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        self.changePagination = false;

                        var activeEl = $(this),
                                activeNumber;

                        if ($(this).hasClass(self.activeClass)) {
                            return false;
                        } else {
                            $('.' + self.activeClass).removeClass(self.activeClass);
                            $(this).addClass(self.activeClass);
                        }

                        self.allPaginationButton.each(function(index) {
                            if ($(this).data('item-number') === activeEl.data('item-number')) {
                                activeNumber = index + 1;
                            }
                        });

                        self.sliderItems.each(function(index) {
                            if ($(this).data('slider-number') === activeEl.data('item-number')) {
                                self.slideIndex = index + 1;
                            }
                        });

                        if (activeNumber !== self.slideIndex) {
                            activeNumber = self.slideIndex;
                        }

                        var marginLeftValue = parseInt(self.listContainer.css('margin-left'));

                        if (marginLeftValue === 0) {

                            self.paginationNumber = (self.paginationNumber === null) ? activeNumber : activeNumber;

                            var num = self.paginationNumber - 1;

                            self.animateMarginLeft('left', num);

                        } else if (marginLeftValue < 0) {
                            var num;

                            if (self.paginationNumber > activeNumber) {
                                num = self.paginationNumber - activeNumber;

                                self.animateMarginLeft('right', num);

                            } else if (self.paginationNumber < activeNumber) {
                                num = activeNumber - self.paginationNumber;

                                self.animateMarginLeft('left', num);

                            }

                            self.paginationNumber = activeNumber;
                        }
                    }
                });
            };

            /**
             *  This function is animate the item margin left
             *  
             *  @param {string} type    Animate margin direction, left or right
             *  @param {number} num     Number of displayed item number
             */
            this.animateMarginLeft = function(type, num) {
                var animObj;

                if (type === 'left') {
                    animObj = {
                        marginLeft: '-=' + (num * self.oneItemWidth) + 'px'
                    };
                } else if (type === 'right') {
                    animObj = {
                        marginLeft: '+=' + (num * self.oneItemWidth) + 'px'
                    };
                }
                self.listContainer.animate(
                        animObj,
                        self.options.animateSpeed,
                        self.options.animateEasing,
                        function() {
                            self.displayLeftBtn('block');
                        }
                );
            };

            /**
             *  This function add events for the slider plugin
             */
            this.addSliderEvents = function() {
                
                if (self.isSetItemEvent === true) {
                   self.addSliderItemEvents(); 
                }
                
                if (self.isSetArrow === true) {
                    self.addArrowsEvents();
                }
                if (self.isSetPagination === true) {
                    self.addPaginationEvents();
                }
            };

            /**
             *  This function remove slider item event
             */
            this.removeSliderItemEvents = function() {
                self.sliderItems.off('.slideItemEvent');
            };

            /**
             *  This is a constuctor function, which run automatically, when the plugin is set the webpage
             */
            constructor = function() {
                self.init();
                self.buildSlider();
                self.addSliderEvents();
            }();
        }
    });
})(jQuery);

