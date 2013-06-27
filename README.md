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
	   sliderItemClass : '.slider-item'
	</li>
	<li>
		<strong>navigationItems:</strong>
		<ul>
			<li>
				<strong>arrows:</strong>
				<ul>
					<li>
						enabled : true,
					</li>
					<li>
						isStartAllArrows : true,
					</li>
					<li>
						<strong>arrows:</strong>
						<ul>
							<li>
								btnId : 'left-btn',
							</li>
							<li>
								btnString : ''
							</li>
						</ul>
					</li>
					<li>
						<strong>arrows:</strong>
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
						<strong>pagination:</strong>
						<ul>
							<li>
								enabled : true,
							</li>
							<li>
								<span>properties:</span>
								<ul>
									<li>
										listContainerClass : 'slider-pagination',
									</li>
									<li>
										isDiplayNumber : false
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
		<strong>autoPlayProperties:</strong>
		<ul>
			<li>
				 enabled : false,
			</li>
			<li>
				timeValue : 1000
			</li>
		</ul>
	</li>
	<li>
		<strong>animationProperties:</strong>
		<ul>
			<li>
				speed : 1000,
			</li>
			<li>
				easing : 'swing'
			</li>
		</ul>
	</li>
	<li>	
		displayShowItemNumber : 1,
	</li>
	<li>
		enableItemClickEvent : false,
	</li>
	<li>
		position : 'relative',
	</li>
	<li>
		onClickedItemEvent : function(el) { console.info(el); }
	</li>
</ul>
<p>
	For example, see in the index.html file
</p>