simpleslider
============

Slider jquery plugin

Document

There is a new way of slider plugin and the plugin creating.

Before use this plugin, you use two CSS files:
  Default.css // There is an Eric Meyer's reset tool
  simpleslider.css // The simpleslider CSS

Here is the config variables:

  // This is the the li class, the parent li, which set the click event
  sliderItemClass: '.slider-item',
  
  // This is a navigations object, which set the navigation elements 
  navigationItems: {
      enableArrows: true,
      enablePagination: true
  },
  
  // This is a animation speed
  animateSpeed: '1000',
  
  // This is a animation style
  animateEasing: 'swing',
  
  // This is a pagination container Classname
  paginationListContainer: 'slider-pagination',
  
  // This show two arrows, after the plugin initialize, if the value is false, just appear one arrow 
  enableAllArrows: true,
  
  // Is not work, but under construction
  isAutoPlay: false, 
  
  // Is not work, but under construction
  isDiplayPaginationNumber: false,
  
  // This work normal, if the number is 1, but under fixing
  displayShowItemNumber: 1, 
  
  // This set the item click event
  enableItemClickEvent: false,
  
  // If set the click item event, this return the clicked item element(jquery)
  onClickedItemEvent: function(el) {
      console.info(el);
  }
  
  For example, see in the index.html file
