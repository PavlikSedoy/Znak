import $ from 'jquery';

const serverAddress = 'http://u.7enov.com.ua:4000';

// Elements
const locationInput = document.getElementById('filters-location'),
    selectAllRegions = document.getElementById('selectAllRegion')

let selectedRegion

$(locationInput).focus( () => {
    // Open region list block
    $('#regionList').fadeIn();

    selectedRegion = selectAllRegions.dataset.name;

    if ( locationInput.value == '' ) getRegionList();
    else getCitiesList(locationInput.dataset.id, locationInput.value);
    console.log('id: ' + locationInput.dataset.id + '; name: ' + locationInput.value)
    if ( $('#filters-location').val() == '' ) locationInput.value = selectedRegion;
});

// Close region list block when click outside
$(document).click( e => {
    if ( !$(e.target).closest('.region-city-block').length ) {
        $('#regionList').fadeOut();
        // locationInput.value = selectedRegion;
    }
});

$('#filters-location').click( e => {
    e.stopPropagation();
});

// Event on region link click
$(document).click( e => {
    const clickedEl = e.target;

    // Get cities
    if ( $(clickedEl).hasClass('region-list__item') ) {
        e.preventDefault();

        const regionId = clickedEl.dataset.id,
            regionName = clickedEl.innerHTML;

        locationInput.dataset.id = regionId;

        console.log('from region click:' + regionName);

        getCitiesList(regionId, regionName);
    }

    // If back to change region
    else if ( $(clickedEl).hasClass('region-city-block__change-region') ) {
        e.preventDefault();
        showFirstStep();
        getRegionList();
    }

    // If select all Ukraine
    else if ( $(clickedEl).hasClass('region-city-block__all-ukraine') ) {
        e.preventDefault();
        $('#filters-location').val('');
        $('#regionList').fadeOut();
    }

    // Select current region
    else if ( $(clickedEl).hasClass('region-city-block__all-region') ) {
        e.preventDefault();

        const regionId = clickedEl.dataset.id;
        selectedRegion = clickedEl.dataset.name;

        locationInput.value = '';
        locationInput.dataset.id = regionId;
        locationInput.value = selectedRegion;
        $('#regionList').fadeOut();
    }

    // Select city
    else if ( $(clickedEl).hasClass('region-list__city-item') ) {
        e.preventDefault();

        locationInput.dataset.cityId = clickedEl.dataset.id;
        locationInput.value = '';
        locationInput.value = selectAllRegions.dataset.name + ', ' + clickedEl.innerHTML;

        // console.log(selectAllRegions.dataset.name + ', ' + clickedEl.innerHTML);

        $('#regionList').fadeOut();
    }
});

// Get region list
const getRegionList = () => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: serverAddress + '/getregions',
        success: data => {
            const lang = data.language;

            $('#regionsCitiesList').html('');
            $(data.regions).each( (key, region) => {
                $('#regionsCityesList').append('<a href="/" class="region-list__item" data-id="' + region._id + '">' + region[lang] + '</a>')
            });
        }
    });
}

// Hide first heading step
const hideFirstStep = () => {
    $('.region-city-block__all-ukraine').hide();
    $('.region-city-block__head-controls--second-step').css('display', 'flex');
}

// Show first step
const showFirstStep = () => {
    $('.region-city-block__head-controls--second-step').hide();
    $('.region-city-block__all-ukraine').show();
}

// Get cities list
const getCitiesList = (regionId, regionName) => {

    console.log(regionName);

    selectAllRegions.dataset.id = regionId;
    selectAllRegions.dataset.regionname = regionName + ' область';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: 'id=' + regionId,
        url: serverAddress + '/getcities',
        success: function (data) {
            hideFirstStep();
            $('#regionsCityesList').html('');

            const lang = data.language;

            $(data.cities).each( (key, city) => {
                $('#regionsCityesList').append('<a href="/" class="region-list__city-item" data-id="' + city._id + '" data-regionId="' + regionId + '">' + city[lang] + '</a>')
            });
        }
    });
}