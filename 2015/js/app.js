$(document).ready(function() {
    initCycle(false);
    initBackground();
    addListeners();
    initCycle(true);
    initParticles();
    initTabs();
    initJump();
    loop();
});

var width, height, header, particles, intro;
var cycleDivs, cycleCount;

//setup for cycling
function initCycle(ready) {
  if(ready) {
    cycleDivs.eq(cycleCount).hide().css('visibility','visible');
  } else {
    cycleCount = 0
    cycleDivs = $('h2[id^="cycle"]').hide();
    cycleDivs.eq(cycleCount).css('visibility','hidden').show();
  }
}

//still need to address the change in header div heightwhen text takes more than one line
//the canvas doesn't update and ideally this header div shouldn't have to change size at all
function initBackground() {
  width = window.innerWidth;
  height = window.innerHeight;

  header = document.getElementById('header');
  header.style.minHeight = height+'px';

  particles = document.getElementById('particles-js');
  particles.width = header.offsetWidth;
  particles.height = header.offsetHeight;

  greeting = document.getElementById('greeting');
  offset = height/2 - (greeting.offsetHeight+10)/2;
  if(offset > 0) {
    greeting.style.marginTop = offset+'px';
  } else {
    greeting.style.marginTop = 0;
  }
}

//start listening for resize and scroll events
function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
}

//don't remember what this is supposed to do - oops
function scrollCheck() {

}

//adjust variables and styles
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    header.style.minHeight = height+'px';

    particles.width = header.offsetWidth;
    particles.height = header.offsetHeight;

    offset = height/2 - (greeting.offsetHeight+10)/2;
    if(offset > 0) {
      greeting.style.marginTop = offset+'px';
    } else {
      greeting.style.marginTop = 0;
    }
}

//loops through each h2 text option
function loop() {
  cycleDivs.eq(cycleCount).fadeIn(400).delay(1000).fadeOut(400, loop);
  cycleCount = ++cycleCount % cycleDivs.length;
}

//initializes particles.js from settings in particles.json
function initParticles() {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'js/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
}

//initializes tabs -- modified but original credit to http://codyhouse.co/
function initTabs() {
  var tabs = $('.tabs');

	tabs.each(function(){
		var tab = $(this),
			tabItems = tab.find('ul.tabs-navigation'),
			tabContentWrapper = tab.children('ul.tabs-content'),
			tabNavigation = tab.find('nav');

		tabItems.on('click', 'a', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if( !selectedItem.hasClass('selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					selectedContentHeight = selectedContent.innerHeight();

				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');
				//animate tabContentWrapper height when content changes
				tabContentWrapper.animate({
					'height': selectedContentHeight
				}, 200);
			}
		});

		//hide the .tabs::after element when tabbed navigation has scrolled to the end (mobile version)
		checkScrolling(tabNavigation);
		tabNavigation.on('scroll', function(){
			checkScrolling($(this));
		});
	});

	$(window).on('resize', function(){
		tabs.each(function(){
			var tab = $(this);
			checkScrolling(tab.find('nav'));
			tab.find('.tabs-content').css('height', 'auto');
		});
	});

	function checkScrolling(tabs){
		var totalTabWidth = parseInt(tabs.children('.tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
		if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.tabs').addClass('is-ended');
		} else {
			tabs.parent('.tabs').removeClass('is-ended');
		}
	}
}

//initializes links to tabs
function initJump() {
  var jumpItems = $('.intro').find('.jump');
  var tabItems = $('.tabs').find('ul.tabs-navigation');
  var tabContentWrapper = $('.tabs').children('ul.tabs-content');

  jumpItems.on('click', 'a', function(event){
    event.preventDefault();
    var selectedJump = $(this);
    var selectedTab = selectedJump.data('content');
    var selectedItem = tabItems.find('a[data-content="'+selectedTab+'"]');
    var selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]');
    var selectedContentHeight = selectedContent.innerHeight();

    tabItems.find('a.selected').removeClass('selected');
    selectedItem.addClass('selected');
    selectedContent.addClass('selected').siblings('li').removeClass('selected');
    //animate tabContentWrapper height when content changes
    tabContentWrapper.animate({
      'height': selectedContentHeight
    }, 200);
  });
}
