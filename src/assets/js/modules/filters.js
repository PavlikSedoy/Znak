import $ from 'jquery';
import select2 from 'select2';

$(document).ready( () => {
    if ( $(window).width() > 472 ) {
        console.log('width > 472');
        console.log($(window).width());
        $('#filtersSort').select2({
            minimumResultsForSearch: -1
        });
    }

    // if ( $(document).width() < 600 ) {
    //     const ob = new StickyHeading();
    //     StickyHeading.filtersHeadingStuck();
    //     ob.observer(document.querySelector("#filtersHeading"));
    // }
});