simpleslider
============

Slider jquery plugin

Document
<h3>
There is a new way of slider plugin and the plugin creating.
</h3>
<p>
Before use this plugin, you use two CSS files:
<br/>Default.css // There is an Eric Meyer's reset tool
<br/>simpleslider.css // The simpleslider CSS
</p>
<h3>
Here is the config variables:
</h3>
<ul>
	<li>
	   sliderItemClass : '.slider-item' // List item class
	</li>
	<li>
		<strong>navigationItems: // Navigation item object </strong>
		<ul>
			<li>
				<strong>arrows: // Arrows object </strong>
				<ul>
					<li>
						enabled : true, // If true the arrow is show
					</li>
					<li>
						isStartAllArrows : true, // If true, show two arrows at begin
					</li>
					<li>
						<strong>leftArrow:</strong>
						<ul>
							<li>
								btnId : 'left-btn', // DOM id
							</li>
							<li>
								btnString : '' // Button string
							</li>
						</ul>
					</li>
					<li>
						<strong>rightArrow:</strong>
						<ul>
							<li>
								btnId : 'right-btn',
							</li>
							<li>
								btnString : ''
							</li>
						</ul>
					</li>
					<li>
						<strong>pagination: // Pagination object</strong>
						<ul>
							<li>
								enabled : true, // If true, the pagination is display
							</li>
							<li>
								<span>properties:</span>
								<ul>
									<li>
										listContainerClass : 'slider-pagination',
									</li>
									<li>
										isDiplayNumber : false // If true, show the pagination number
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			
		</ul>
	</li>
	<li>
		<strong>autoPlayProperties: // Autoplay object</strong>
		<ul>
			<li>
				enabled : false, // If true, the autoplay slide start
			</li>
			<li>
				timeValue : 1000 // Autoplay time
			</li>
		</ul>
	</li>
	<li>
		<strong>animationProperties: // Animation object</strong>
		<ul>
			<li>
				speed : 1000, // Animation speed
			</li>
			<li>
				easing : 'swing' // Animation easing, use the easing.js plugin
			</li>
		</ul>
	</li>
	<li>	
		displayShowItemNumber : 1, // Display slide item
	</li>
	<li>
		enableItemClickEvent : false, // If true, the slide item is clicking 
	</li>
	<li>
		position : 'relative', // The slide container position
	</li>
	<li>
		onClickedItemEvent : function(el) { console.info(el); } // Clicked item function, el param is the clicked element
	</li>
</ul>
<h4>
	For example, see in the index.html file
</h4>
