(function($){
	/**
	 * jQuery plugin to tabify a simple dom like this:
	 			<div class="tabs"> <--! the current jQuery object -->
					<div id="description" class="tab" title="title of the tab here">
						text here
					</div>
					<div id="contacts" class="tab" title="title of the tab here">
						text here
					</div>
					<div id="offers" class="tab" title="title of the tab here">
						text here
					</div>
				</div>
	 */
  $.fn.tabs = function(options) {
		var settings = {
			/**
			 * jQuery selector of the elements to be tabbed
			 */
			elementsSelector		: '.tab',
			/**
			 * Class of the currently selected tab. 
			 * It will be applied to the showed tab and the relative anchor
			 */
			classSelected				:	'selected',
			/**
			 * Optional jQuery selector for the tab controller, i.e. the part 
			 * of the dom in wich will be injected the anchors to click on.
			 * If the jQuery object retrieved by this selector is empty
			 * the script provides to prepend a div to the current object
			 * giving it the attributes contained in tabList option.
			 */
			tabListSelector			: '.tabs_controller',
			/**
			 * the options of the new div inserted if the jQuery object
			 * retrieved by tabListSelector is empty
			 */
			tabList							:	{
				'class'		:	'tabs_controller'
			},
			/**
			 * optional attributes of every anchor in the tab controller,
			 * the script will insert: 
			 * tab_controller for every anchor of the control bar
			 * first\last for the first and the last element
			 * selected for the element corresponding to the current viewing tab
			 */
			tabListAnchor				:{},
			/**
			 * Duration of a single animation, total duration
			 * is 2 times this value (one for show() and one for hide())
			 */
			timer								:	200
		};
		if(options) $.extend(settings,options);
		var that = $(this);
		
		
		return this.each(function(){
			var elements = that.find(settings.elementsSelector);
			
			var tabList = $('tabListSelector');
			if (tabList.length == 0) {
		  	tabList = $('<div>', settings.tabList);
				$(this).prepend(tabList);
		  }
			
			var index = 0;
			elements.each(function(){
				var element = $(this);
				var firstLastClass = '';

				if(index == 0) firstLastClass += ' first';
				if(index == elements.length-1) firstLastClass += ' last';
				
				var anchorAttrs = {
					'href'		:	'javascript:;',
					'html'		:	$(this).attr('title'),
					'class'		:	(settings.tabListAnchor['class']) ? settings.tabListAnchor['class']+firstLastClass : 'tab_controller'+firstLastClass,
					'id'			:	'tabShow_'+$(this).attr('id')
				};
				if(settings.tabListAnchor) $.extend(settings.tabListAnchor,anchorAttrs);
				
				tabList.append(
					$('<a>',settings.tabListAnchor).click(function(e){
						e.preventDefault();
						e.stopPropagation();
						
						tabList.find('.'+settings.classSelected).each(function(){$(this).removeClass(settings.classSelected);});
						$(this).addClass(settings.classSelected);
						
						that.find('.tab.'+settings.classSelected).slideUp(settings.timer, function(){
							$(this).removeClass(settings.classSelected);
							element.slideDown(settings.timer, function(){
								element.addClass(settings.classSelected);
							});
						});
					})
				);
				index++;
			});
			
			tabList.find('a').eq(0).addClass(settings.classSelected);
			

			if($.isFunction(settings.after)){
				settings.after.call(that);
			}
			
		});
	};  
})(jQuery); 


$(document).ready(function() {
	$('#tabs').tabs({
		tabListAnchor:{
			'class':'tab_controller border_1 autopadding'
		}
	});

	$('.tabs_controller').autopadding();
});