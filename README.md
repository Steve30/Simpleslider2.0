simpleslider
============

Slider jquery plugin

Document
<p>
There is a new way of slider plugin and the plugin creating.
</p>
<p>
Before use this plugin, you use two CSS files:
  Default.css // There is an Eric Meyer's reset tool
  simpleslider.css // The simpleslider CSS
</p>
<p>
Here is the config variables:
</p>
  <ul>
    <li>
       // This is the the li class, the parent li, which set the click event<br/>sliderItemClass: '.slider-item'
    </li>
    <li>
      // This is a navigations object, which set the navigation elements<br/>navigationItems: {
          enableArrows: true,
          enablePagination: true
      }
    </li>
    <li>
      // This is a animation speed<br/>animateSpeed: '1000'
    </li>
      // This is a animation style<br/>animateEasing: 'swing',
    <li>
      // This is a pagination container Classname<br/>paginationListContainer: 'slider-pagination',
    </li>
    <li>
       // This show two arrows, after the plugin initialize, if the value is false, just appear one arrow<br/>enableAllArrows: true,
    </li>
    <li>
      // Is not work, but under construction<br/>isAutoPlay: false, 
    </li>
    <li>
      // Is not work, but under construction<br/>isDiplayPaginationNumber: false,
    </li>
    <li>
      // This work normal, if the number is 1, but under fixing<br/>displayShowItemNumber: 1, 
    </li>
      // This set the item click event<br/>enableItemClickEvent: false,
    <li>
      // If set the click item event, this return the clicked item element(jquery)<br/>onClickedItemEvent: function(el) {
      console.info(el);
  }
    </li>
  </ul>
  <p>
    For example, see in the index.html file
  </p>