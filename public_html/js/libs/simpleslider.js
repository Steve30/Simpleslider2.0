(function($) {
    $.fn.extend({
        simpleslider : function(options) {
          
            this.defaults = {
                sliderItemClass : '.slider-item',
                navigationItems : {
                    arrows : {
                        enabled : true,
                        isStartAllArrows : true,
                        leftArrow : {
                            btnId : 'left-btn',
                            btnString : ''
                        },
                        rightArrow : {
                            btnId : 'right-btn',
                            btnString : ''
                        }
                    },
                    pagination : {
                        enabled : true,
                        properties : {
                            listContainerClass : 'slider-pagination',
                            isDiplayNumber : false
                        }
                    }
                },
                autoPlayProperties : {
                    enabled : false,
                    timeValue : 1000
                },
                animationProperties : {
                    speed : 1000,
                    easing : 'swing'
                },
                displayShowItemNumber : 1,
                enableItemClickEvent : false,
                position : 'relative',
                onClickedItemEvent : function(el) {
                    console.info(el);
                }
            };

            this.plugin = {
                el : undefined,
                options : undefined,
                navigationItems : undefined,
                sliderContainerWidth : undefined,
                sliderHolder : undefined,
                sliderItems : undefined,
                sliderItemClass : undefined,

                listContainer : undefined,
                listContainerWidth : undefined,

                oneItemWidth : undefined,
                itemMarginVal : undefined,
                isSetItemEvent : undefined,
                animateObj : undefined,
                displayItemNumber : undefined,
                autoPlayObj : undefined,
                autoPlayTimer : undefined,
                position: undefined,

                initialize : function() {

                    this.el = $(arguments[0]);
                    this.options = arguments[1];

                    this.navigationItems = this.options.navigationItems;

                    this.sliderContainerWidth = null;
                    this.sliderHolder = this.el.find('.slider-holder');
                    this.sliderItems = this.sliderHolder.find(this.options.sliderItemClass);
                    this.sliderItemClass = this.options.sliderItemClass;

                    this.listContainer = this.sliderHolder.find('ul').eq(0);
                    this.listContainerWidth = 0;

                    this.oneItemWidth = null;
                    this.itemMarginVal = null;
                    this.isSetItemEvent = this.options.enableItemClickEvent;
                    this.animateObj = this.options.animationProperties;
                    this.displayItemNumber = this.options.displayShowItemNumber;
                    this.autoPlayObj = this.options.autoPlayProperties;
                    this.autoPlayTimer = undefined;
                    this.position = this.options.position;

                    for (var item in this.navigationItems) {

                        var navigationObj = this.navigationItems[item];

                        if (item === 'arrows' && navigationObj.enabled === true) {

                            this.isStartAllArrows = navigationObj.isStartAllArrows;
                            this.leftBtnObj = navigationObj.leftArrow;
                            this.rightBtnObj = navigationObj.rightArrow;
                            this.arrowWidth = null;
                            this.arrowHeight = null;
                            this.isSetArrow = navigationObj.enabled;

                        } else if (item === 'pagination' && navigationObj.enabled === true) {

                            this.paginationObj = navigationObj.properties;
                            this.paginationNumber = null;
                            this.allPaginationButton = null;
                            this.changePagination = false;
                            this.activeIndex = null;
                            this.activeClass = 'active';
                            this.slideIndex = null;
                            this.isSetPagination = navigationObj.enabled;

                        }
                    }

                    this.buildSlider();

                },

                buildSlider : function() {
                    var self = this;

                    this.setSliderItemCSS(self);

                    this.sliderContainerWidth = this.displayItemNumber * this.oneItemWidth;

                    this.sliderHolder.css({
                        width : this.sliderContainerWidth - this.itemMarginVal + 'px',
                        overflow : 'hidden'
                    });

                    this.listContainer.css({
                        width : this.listContainerWidth + 'px'
                    });

                    this.setContainerWidth = this.sliderContainerWidth - this.itemMarginVal;

                    this.el.css({
                        position : this.position,
                        width : this.setContainerWidth + 'px',
                        margin : '0 auto'
                    });

                    if (this.sliderItems.filter('.selected').length === 1) {
                        this.getSliderItemSelected(self);
                    }

                    if (this.autoPlayObj.enabled === true) {
                        this.runAutoPlay();
                    }

                    if (this.isSetArrow === true) {
                        this.addSliderArrow();
                    }

                    if (this.isSetPagination === true) {
                        this.addSliderPagination();
                    }

                    this.addSliderEvents();
                },

                setSliderItemCSS : function(self) {

                    this.sliderItems.each(function(index) {
                        var el = $(this);

                        el.css({
                            float : 'left'
                        });

                        if (self.oneItemWidth === null) {
                            self.oneItemWidth = el.outerWidth(true);
                            self.itemMarginVal = parseInt(el.css('margin-right'));
                        }

                        self.listContainerWidth += el.outerWidth(true);
                    });

                },

                getSliderItemSelected : function(self) {

                    this.sliderItems.each(function() {
                        var itemEl = $(this).eq(0);

                        if ($(this).hasClass('selected')) {
                            return false;
                        } else {
                            var sumOfItems = self.sliderItems.length - 1;

                            self.sliderItems.eq(sumOfItems).removeClass('last').after(itemEl);
                            self.sliderItems = self.sliderHolder.find(self.sliderItemClass);
                            self.sliderItems.eq(sumOfItems).addClass('last');
                        }

                    });
                },

                runAutoPlay : function() {
                    var self = this;

                    this.autoPlayTimer = setInterval(function() {
                        self.animateToNextElement(parseInt(self.listContainer.css('margin-left')));
                    }, this.autoPlayObj.timeValue);
                },

                stopAutoPlay : function() {
                    if (this.autoPlayTimer !== undefined) {
                        clearInterval(this.autoPlayTimer);
                    }
                },

                addSliderArrow : function() {
                    var containerHeight = this.el.outerHeight(true),
                        leftBtnString = '',
                        rightBtnString = '',
                        self = this;

                    if (this.leftBtnObj.btnString !== '') {
                        leftBtnString = '<span class=string>' + this.leftBtnObj.btnString + '</span>';
                    }

                    if (this.rightBtnObj.btnString !== '') {
                        rightBtnString = '<span class=string>' + this.rightBtnObj.btnString + '</span>';
                    }

                    this.el.prepend('<a href=# id="' + this.leftBtnObj.btnId + '" class="arrows"><span>&nbsp;</span>' + leftBtnString + '</a>');
                    this.el.append('<a href=# id="' + this.rightBtnObj.btnId + '" class="arrows"><span>&nbsp;</span>' + rightBtnString + '</a>');

                    this.displayLeftBtn('none');

                    this.setSliderArrowsCSS(self, containerHeight);

                    this.el.css({
                        paddingLeft : this.arrowWidth + 'px',
                        paddingRight : this.arrowWidth + 'px'
                    });
                },

                setSliderArrowsCSS : function(self, containerHeight) {

                    this.el.find('.arrows').each(function() {
                        if (self.arrowWidth === null) {
                            self.arrowWidth = $(this).outerWidth(true);
                            self.arrowHeight = $(this).outerHeight(true);
                        }
                        ;

                        $(this).css({
                            top : (containerHeight / 2 - self.arrowHeight / 2) + 'px'
                        });

                    });

                },

                displayLeftBtn : function() {
                    if (this.isStartAllArrows !== true) {
                        $('#' + this.leftBtnObj.btnId).css({
                            display : type
                        });
                    }
                },

                addSliderPagination : function() {
                    var sumOfItems = this.displayItemNumber, listHtml = '', text, paginationContainer;

                    if (sumOfItems === 1) {
                        sumOfItems = this.sliderItems.length;
                    };

                    for (var i = 0; i <= sumOfItems - 1; i++) {

                        text = (this.paginationObj.isDiplayNumber === true) ? (i + 1) : '&nbsp;';

                        listHtml += '<li><a href="#" data-item-number=' + i + '>' + text + '</a></li>';
                    };

                    this.el.append('<ol class="' + this.paginationObj.listContainerClass + '">' + listHtml + '</ol>');

                    paginationContainer = $('.' + this.paginationObj.listContainerClass);

                    this.allPaginationButton = paginationContainer.find('a');

                    if (this.sliderItems.filter('.selected').length === 1) {
                        var num = this.sliderItems.filter('.selected').data("slider-number");

                        this.allPaginationButton.eq(num).addClass(this.activeClass);

                    } else {
                        this.allPaginationButton.eq(0).addClass(this.activeClass);
                    }
                },

                replaceItem : function(state) {

                    if (state === 'begin') {

                        this.changeItemPosition(state);

                        this.listContainer.css({
                            marginLeft : -self.oneItemWidth + 'px'
                        });

                    } else if (state === 'last') {

                        this.changeItemPosition(state);

                        this.listContainer.css({
                            marginLeft : 0
                        });

                    }

                    if (this.isSetPagination === true) {
                        this.changePaginationItemPosition(state);
                    }

                    this.sliderItems = this.sliderHolder.find(this.sliderItemClass);

                    this.sliderItems.css({
                        float : 'left'
                    });

                    this.sliderItems.eq(this.sliderItems.length - 1).addClass('last');

                    if (this.isSetItemEvent === true) {
                        this.removeSliderItemEvents();
                        this.addSliderItemEvents();
                    }
                },

                changePaginationItemPosition : function(type) {

                    if (type === 'begin') {

                        this.setActiveIndex();

                        if (this.activeIndex === this.allPaginationButton.length - 1) {
                            this.activeIndex = this.allPaginationButton.length - 2;
                        } else {
                            this.activeIndex--;
                        }

                        this.allPaginationButton.eq(this.activeIndex).addClass(this.activeClass);

                    } else {

                        this.setActiveIndex();

                        if (this.activeIndex === this.allPaginationButton.length - 1) {
                            this.activeIndex = 0;
                        } else {
                            this.activeIndex++;
                        }

                        this.allPaginationButton.eq(this.activeIndex).addClass(this.activeClass);

                    }
                },

                setActiveIndex : function() {
                    var self = this;

                    this.allPaginationButton.each(function(index) {
                        if ($(this).hasClass(self.activeClass)) {
                            $(this).removeClass(self.activeClass);
                            self.activeIndex = index;
                        }
                    });
                },

                changeItemPosition : function(type) {
                    var item, htmlObj;

                    if (type === 'begin') {
                        item = this.sliderItems.eq(this.sliderItems.length - 1);
                    } else {
                        item = this.sliderItems.eq(0);
                    }

                    htmlObj = item[0];

                    this.sliderItems.eq(this.sliderItems.length - 1).removeClass('last');

                    if (type === 'begin') {
                        this.listContainer.prepend(htmlObj);
                    } else {
                        this.listContainer.append(htmlObj);
                    }
                },

                addAutoPlayEvents : function() {
                    var eventObj;

                    if (this.autoPlayObj.enabled === true) {
                        eventObj = {
                            mouseenter : function(e) {
                                self.stopAutoPlay();
                            },
                            mouseleave : function(e) {
                                self.runAutoPlay();
                            }
                        };

                        this.sliderContainer.on(eventObj);
                        $('.' + this.paginationObj.listContainerClass).on(eventObj);
                    }
                },

                addArrowsEvents : function() {
                    var self = this;

                    this.el.find('.arrows').each(function() {

                        $(this).on({
                            click : function(e) {
                                e.preventDefault();
                                e.stopPropagation();

                                var id = $(this).attr('id');

                                if (id === self.rightBtnObj.btnId) {

                                    self.animateToNextElement(parseInt(self.listContainer.css('margin-left')));

                                } else if (id === self.leftBtnObj.btnId) {

                                    self.animateToPrevElement(parseInt(self.listContainer.css('margin-left')));
                                }

                            }
                        });
                    });
                },

                animateToPrevElement : function(marginLeftValue) {
                    if (marginLeftValue === 0) {
                        this.replaceItem('begin');
                    } else if (this.isSetPagination === true) {
                        this.changePaginationItemPosition('begin');
                    }

                    this.listContainer.animate({
                        marginLeft : '+=' + this.oneItemWidth + 'px'
                    }, this.animateObj.speed, this.animateObj.easing);
                },

                animateToNextElement : function(marginLeftValue) {
                    var width = 0, htmlTexts = new Array(), self = this;

                    if (this.isSetPagination === true) {
                        this.changePagination = true;
                    }

                    if (marginLeftValue < 0) {

                        this.sliderItems.each(function() {

                            width += self.oneItemWidth;
                            htmlTexts.push($(this).eq(0)[0]);

                            if (-marginLeftValue === width) {

                                htmlTexts.reverse();

                                for (var i = 0; i <= htmlTexts.length - 1; i++) {
                                    this.sliderItems.eq(this.sliderItems.length - 1).after(htmlTexts[i]);
                                }

                                this.sliderItems = this.sliderHolder.find(this.defaults.sliderItemClass);
                                this.sliderItems.filter('.last').removeClass('last');
                                this.sliderItems.eq(this.sliderItems.length - 1).addClass('last');

                                this.listContainer.css({
                                    marginLeft : 0
                                });
                            }
                        });
                    }

                    this.listContainer.animate({
                        marginLeft : '-=' + this.oneItemWidth + 'px'
                    }, this.animateObj.speed, this.animateObj.easing, function() {
                        self.replaceItem('last');
                        self.displayLeftBtn('block');
                    });
                },

                addSliderItemEvents : function() {

                    this.sliderItems.on({
                        'click.slideItemEvent' : function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            $(this).trigger('onItemClicked', $(this));
                        },
                        'onItemClicked.slideItemEvent' : function(el) {
                            try {
                                self.defaults.onClickedItemEvent($(el.currentTarget));
                            } catch (error) {
                                console.info(error);
                            }

                        }
                    });

                },

                addPaginationEvents : function() {
                    var self = this;

                    this.allPaginationButton.on({
                        click : function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            self.changePagination = false;

                            var activeEl = $(this), activeNumber;

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

                },

                animateMarginLeft : function(type, num) {
                    var animObj, self = this;

                    if (type === 'left') {
                        animObj = {
                            marginLeft : '-=' + (num * this.oneItemWidth) + 'px'
                        };
                    } else if (type === 'right') {
                        animObj = {
                            marginLeft : '+=' + (num * this.oneItemWidth) + 'px'
                        };
                    }
                    this.listContainer.animate(animObj, this.animateSpeed, this.animateEasing, function() {
                        self.displayLeftBtn('block');
                    });
                },

                addSliderEvents : function() {

                    this.addAutoPlayEvents();

                    if (this.isSetItemEvent === true) {
                        this.addSliderItemEvents();
                    }

                    if (this.isSetArrow === true) {
                        this.addArrowsEvents();
                    }
                    if (this.isSetPagination === true) {
                        this.addPaginationEvents();
                    }
                },

                removeSliderItemEvents : function() {
                    this.sliderItems.off('.slideItemEvent');
                }
            }

            /**
             *  This is an init function, which set the variable
             */
            this.init = function(opt) {
                $.proxy(this.plugin.initialize(this, opt), this.plugin);
            };

            /**
             *  This is a constuctor function, which run automatically, when the plugin is set the webpage
             */
            constructor = function(plugin) {
                plugin.options = $.extend(plugin.defaults, options);
                plugin.init(plugin.options);
            }(this);
        }
    });
})(jQuery);

