requirejs( [
  'jquery',
], function( $ ) {
  $( document ).ready(function() {
		$('.header__dropdown').hide();
		$('.header__item-dropdown').on('mouseenter', function(e) {
			var that = $(this);
			that
			.find('.header__nav-item')
			.addClass('header__nav-item__hover');
			that
			.find('.header__dropdown')
			.stop()
			.slideDown();
		});
		$('.header__item-dropdown').on('mouseleave', function() {
			var that = $(this);
			that
			.find('.header__dropdown')
			.stop()
			.slideUp(function() {
				that
				.find('.header__nav-item')
				.removeClass('header__nav-item__hover');
			});
		});
	});
});