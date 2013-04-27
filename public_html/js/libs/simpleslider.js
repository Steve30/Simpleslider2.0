(function($) {
    $.fn.extend({
        simpleslider: function(options) {
            var self = this;

            this.defaults = {
                sliderItemClass: '.slider-item',
                isDisplayAllArrows: true,
                isAutoPlay: false,
                isDisplayPagination: true,
                isDiplayPaginationNumber: false,
                displayShowItemNumber: 1,
                onClickedItemEvent: function(el) {
                    console.info(el);
                }
            };

            this.options = $.extend(this.defaults, options);

            this.init = function() {
                self.sliderContainer = $(this);
                self.sliderHolder = $(this).find('.slider-holder');
                self.sliderItems = self.sliderHolder.find(self.defaults.sliderItemClass);
                self.listContainerWidth = 0;
                self.leftBtnId = 'left-btn';
                self.rightBtnId = 'right-btn';
                self.arrowWidth = null;
                self.arrowHeight = null;
                self.oneItemWidth = null;
                self.listContainer = self.sliderHolder.find('ul').eq(0);
                self.paginationListContainer = 'slider-pagination';
                self.paginationNumber = null;
                self.sliderContainerWidth = null;
                self.itemMarginVal = null;
                self.itemNumber = null;
                self.allPaginationButton = null;
                self.changePagination = false;
                self.activeIndex = null;
                self.slideIndex = null;
            };

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

                self.addSliderArrow();
                if (self.defaults.isDisplayPagination === true) {
                    self.addSliderPagination();
                }
             
            };

            this.addSliderArrow = function() {
                var containerHeight = self.sliderContainer.outerHeight(true);

                self.sliderContainer.prepend('<a href=# id="' + self.leftBtnId + '" class="arrows">&nbsp;</a>');
                self.sliderContainer.append('<a href=# id="' + self.rightBtnId + '" class="arrows">&nbsp;</a>');

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
                    position: 'relative',
                    width: self.sliderContainerWidth - self.itemMarginVal + 'px',
                    paddingLeft: self.arrowWidth + 'px',
                    paddingRight: self.arrowWidth + 'px',
                    margin: '0 auto'
                });


            };
            
            this.displayLeftBtn = function(type) {
                if (self.defaults.isDisplayAllArrows !== true) {
                    $('#' + self.leftBtnId).css({
                        display: type
                    });
                }
            };
            
            this.addSliderPagination = function() {
                if (self.defaults.isDisplayPagination === true) {
                    var sumOfItems = self.defaults.displayShowItemNumber,
                            listHtml = '', text;

                    if (sumOfItems === 1) {
                        sumOfItems = self.sliderItems.length;
                    }
                    ;
                    
                    for (var i = 1; i <= sumOfItems; i++) {
                        
                        text = (self.defaults.isDiplayPaginationNumber === true) ? i : '&nbsp;';
                        
                        listHtml += '<li><a href="#" data-item-number=' + i + '>' + text + '</a></li>';
                    }
                    ;

                    self.sliderContainer.append('<ol class="' + self.paginationListContainer + '">' + listHtml + '</ol>');

                    self.allPaginationButton = $('.' + self.paginationListContainer).find('a');

                    self.allPaginationButton.eq(0).addClass('active');
                }
            };

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

                if (self.defaults.isDisplayPagination === true) {
                    self.changePaginationItemPosition(state);
                }

                self.sliderItems = self.sliderHolder.find(self.defaults.sliderItemClass);

                self.sliderItems.css({
                    float: 'left'
                });

                self.sliderItems.eq(self.sliderItems.length - 1).addClass('last');

                self.removeSliderItemEvents();
                self.addSliderItemEvents();

            };

            this.changePaginationItemPosition = function(type) {

                if (type === 'begin') {

                    self.setActiveIndex();

                    if (self.activeIndex === self.allPaginationButton.length - 1) {
                        self.activeIndex = self.allPaginationButton.length - 2;
                    } else {
                        self.activeIndex--;
                    }

                    self.allPaginationButton.eq(self.activeIndex).addClass('active');

                } else {

                    self.setActiveIndex();

                    if (self.activeIndex === self.allPaginationButton.length - 1) {
                        self.activeIndex = 0;
                    } else {
                        self.activeIndex++;
                    }

                    self.allPaginationButton.eq(self.activeIndex).addClass('active');

                }

            };

            this.setActiveIndex = function() {
                self.allPaginationButton.each(function(index) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        self.activeIndex = index;
                    }
                });
            };

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
            
            

            this.arrowsEvents = function() {
                $('.arrows').each(function() {

                    $(this).on({
                        click: function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            var id = $(this).attr('id'),
                                    marginLeftValue = parseInt(self.listContainer.css('margin-left'));

                            if (id === self.rightBtnId) {

                                if (self.defaults.isDisplayPagination === true) {
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

                                            $('.last').removeClass('last');

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
                                } else if (self.defaults.isDisplayPagination === true) {
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

            this.addPaginationEvents = function() {

                self.allPaginationButton.on({
                    click: function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        self.changePagination = false;

                        var activeEl = $(this),
                                activeNumber;

                        if ($(this).hasClass('active')) {
                            return false;
                        } else {
                            $('.active').removeClass('active');
                            $(this).addClass('active');
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

                self.listContainer.animate(animObj, 'slow', function() {
                    self.displayLeftBtn('block');
                });
            };

            this.addSliderEvents = function() {
                self.arrowsEvents();
                self.addSliderItemEvents();
                if (self.defaults.isDisplayPagination === true) {
                    self.addPaginationEvents();
                } 
            };

            this.removeSliderItemEvents = function() {
                self.sliderItems.off('.slideItemEvent');
            };

            constructor = function() {
                self.init();
                self.buildSlider();
                self.addSliderEvents();
            }();
        }
    });
})(jQuery);

