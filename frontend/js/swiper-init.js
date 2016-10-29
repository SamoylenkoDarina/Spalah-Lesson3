requirejs( [
  'swiper',
], function( Swiper ) {
	new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	new Swiper('.swiper-container2', {
	    slidesPerView: 4,
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		spaceBetween: 40
	});
});