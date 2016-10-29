// require the require function
requirejs( [ 'require', 'jquery', 'isotope.pkgd' ],
  function( require, $, Isotope ) {
    // require jquery-bridget, it's included in isotope.pkgd.js
    require( [ 'jquery-bridget' ],
    function( jQueryBridget ) {
    	// make Isotope a jQuery plugin
		    jQueryBridget( 'isotope', Isotope, $ );
		    // now you can use $().isotope()
	      	var grid = $('.grid').isotope({
				itemSelector: '.portfolio__item',
		  		layoutMode: 'fitRows'
			});

			$('.portfolio__filters-group').on('click', 'li', function(e) {
				var filterVal = $(this).attr('data-filter');
				grid.isotope({ filter: filterVal });
			});
    }
  );
});