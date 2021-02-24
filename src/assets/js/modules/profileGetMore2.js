import axios from 'axios';
import disableScroll from 'disable-scroll';
import ProfileAds from '@js/classes/models/ProfileAds';
import PrintProfileAds from "@js/classes/PrintProfileAds";

const SERVER_DOMAIN = 'http://u.7enov.com.ua:4000';

const preloader = document.getElementById('preloader');

const getAds = new ProfileAds(SERVER_DOMAIN);
const printAds = new PrintProfileAds();

const sortingSelect = document.getElementById('profileSort');

// Variables for loading more ads
const loadMoreBtn = document.getElementById('loadMore'),
    // preloader = document.getElementById('preloader'),
    // adsBlock = document.getElementById('ads'),
    authorId = document.getElementById('authorId').value,
    userId = document.getElementById('userId').value;

let page = 1,
    sorting = {'public_time': -1};

const offset = 10,
    total = document.getElementById('totalAds').innerText;

document.addEventListener('DOMContentLoaded', () => {

    // On click "Load more button"
    loadMoreBtn.addEventListener('click', () => {
        const allResponse = getAds.getData(offset * page, authorId, ProfileAds.SORT_PUBLIC_TIME, ProfileAds.ORDER_DOWN);
        Promise.resolve( allResponse )
            .then( data => {
                const result = data.result,
                    ads = data.ads,
                    currentOffset = data.currentOffset;

                result ? checkDataR(ads, currentOffset) : console.log('error');
                console.log(data);
            });
        page++;
        if ( offset * page > total ) PrintProfileAds.hideMoreBtn();
        // console.log(r2);
        // Promise.resolve(r2).then( (value) => console.log(value));
    });

    // If result == true
    const checkDataR = (res, currentOffset) => {
        page++;
        if ( offset * page > total ) PrintProfileAds.hidePreloader();
        // preloader.style.display = 'none';
        // console.log(res);
        if ( currentOffset == 0 ) PrintProfileAds.clearingAdsBlock();
        // if (data.result) printAds(data.ads, data.favorites);
        // setTimeout( () => {disableScroll.off()}, 100);
        // console.log(response.data)
    }
    // End if result == true

    // On click "Load more button"
    // loadMoreBtn.addEventListener('click', () => {
    //     // getMoreAds(authorId, offset * page, sorting);
    //     page++;
    //     if ( offset * page > total ) document.getElementById('loadMore').style.display = 'none';
    // });
    //
    // // On change sorting
    // document.getElementById('profileSort').addEventListener('change', () => {
    //     const sortingName = document.getElementById('profileSort').value;
    //
    //     page = 0;
    //
    //     if ( sortingName == 'newToOld' ) sorting = {'public_time': -1};
    //     else if ( sortingName == 'oldToNew' ) sorting = {'public_time': 1};
    //     else if ( sortingName == 'minToMax' ) sorting = {'price': 1};
    //     else if ( sortingName == 'maxToMin' ) sorting = {'price': -1};
    //     else if ( sortingName == 'modelAZ' ) sorting = {'model': 1};
    //     else if ( sortingName == 'modelZA' ) sorting = {'model': -1};
    //     else if ( sortingName == 'brandAZ' ) sorting = {'brend': 1};
    //     else if ( sortingName == 'brandZA' ) sorting = {'brend': -1};
    //
    //     getMoreAds(authorId, 0, sorting);
    //     page = 1;
    //     document.getElementById('loadMore').style.display = 'block';
    // });
    //
    // // Toggle favorite
    // document.querySelector('.listing-item__favorite').addEventListener('click', e => {
    //     const clickedStar = e.target.closest('.listing-item__favorite');
    // });
});

// AJAX toggle favorite
const toggleFavorite = (adId, userId, token, deviceId) => {
    // axios({
    //     type: 'POST',
    //     dataType: 'json',
    //     data: {
    //         'adId': adId,
    //         'userId': userId,
    //         '_csrf': token,
    //         'deviceId': deviceId
    //     },
    //     url: serverDomain + '/set/favourite',
    //     beforeSend: () => {
    //         $(preloader).fadeIn()
    //         disableScroll.on();
    //     },
    //     success: data => {
    //         $(preloader).fadeOut();
    //         // Do something
    //
    //         setTimeout( () => {disableScroll.off()}, 100);
    //     }
    // });
    console.log('func1')
}

// Ajax get more ads
// const getMoreAds = (authorId, currentOffset, sorting) => {
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'json',
    //     data: {
    //         'authorId': authorId,
    //         'offset': currentOffset,
    //         'sort': sorting
    //     },
    //     url: serverDomain + '/get/profileads',
    //     beforeSend: () => {
    //         $(preloader).fadeIn()
    //         disableScroll.on();
    //     },
    //     success: data => {
    //         if ( currentOffset == 0 ) $(adsBlock).html('');
    //         $(preloader).fadeOut();
    //         if (data.result) printAds(data.ads, data.favorites);
    //         setTimeout( () => {disableScroll.off()}, 100); 
    //     }
    // });

//     axios.interceptors.request.use( config => {
//         preloader.style.display = 'block';
//         disableScroll.on();
//
//         return config;
//     }, err => {
//         return Promise.reject(err)
//     });
//
//     axios.get(serverDomain + '/get/profileads', {
//         params: {
//             'authorId': authorId,
//             'offset': currentOffset,
//             'sort': 'public_time',
//             'order': -1
//         }
//     })
//         .then( response => {
//             const data = response.data;
//             if ( currentOffset == 0 ) adsBlock.innerHTML('');
//             preloader.style.display = 'none';
//             if (data.result) printAds(data.ads, data.favorites);
//             setTimeout( () => {disableScroll.off()}, 100);
//             console.log(response.data)
//         })
//         .catch( err => {
//             console.log(err);
//         });
//
//     // console.log(resultP);
// }

// Print ads
// const printAds = (ads, favorites) => {
//     $(ads).each( (key, ad) => {
//         $(adsBlock).append( adItem(ad) );
//     });
//     console.log('func3')
// }

// Ad item
const adItem = ad => {
    let deviceType;

    const haggleClass = ad.is_haggle ? 'listing-item__prop-item active' : 'listing-item__prop-item',
        exchangeClass = ad.exchange ? 'listing-item__prop-item active' : 'listing-item__prop-item',
        sendClass = ad.send ? 'listing-item__prop-item active' : 'listing-item__prop-item';

    if ( ad.device_id == 1 || ad.device_id == 2 ) deviceType = 'Телефоны';
    else if ( ad.device_id == 11 ) deviceType = 'Планшеты';
    else if ( ad.device_id == 21 ) deviceType = 'Часы';

    // Condition
    let condition;

    if (ad.condition == 10) condition = 'Новый';
    else if (ad.condition == 20) condition = 'Идеальное';
    else if (ad.condition == 30) condition = 'Хорошее';
    else if (ad.condition == 40) condition = 'Среднее';

    let publicDate = dateFormat(ad.public_time);

    return '' +
        '<article class="listing-item listing-item__type_profile">' +
        '<div class="listing-item__avatar-side">' +
        '<a class="listing-item__avatar-wr" href="/">' +
        '<img class="listing-item__avatar" src="/assets/images/iphoneModels/x.png" alt="iphoneX">' +
        '</a>' +
        '</div>' +
        '<div class="listing-item__content-side">' +
        '<a class="listing-item__title-link" href="/">' +
        '<h4 class="listing-item__title">' + ad.title + '</h4>' +
        '</a>' +
        '<div class="listing-item__in">' +
        '<div class="listing-item__col listing-item__col_with-row">' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_text">Бренд: ' + ad.brend + '</div>' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_text">Категория: ' + deviceType + '</div>' +
        '</div>' +
        '<div class="listing-item__col listing-item__col_with-row">' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_text">' +
        '<span class="mobile-none">Опубликовано:</span>' +
        '<span class="mobile-on">От: </span> ' + publicDate +
        '</div>' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_props">' +
        '<div class="' + exchangeClass + '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"></path></svg>' +
        '</div>' +
        '<div class="' + sendClass + '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path></svg>' +
        '</div>' +
        '<div class="' + haggleClass + '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504.971 199.362l-22.627-22.627c-9.373-9.373-24.569-9.373-33.941 0l-5.657 5.657L329.608 69.255l5.657-5.657c9.373-9.373 9.373-24.569 0-33.941L312.638 7.029c-9.373-9.373-24.569-9.373-33.941 0L154.246 131.48c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l5.657-5.657 39.598 39.598-81.04 81.04-5.657-5.657c-12.497-12.497-32.758-12.497-45.255 0L9.373 412.118c-12.497 12.497-12.497 32.758 0 45.255l45.255 45.255c12.497 12.497 32.758 12.497 45.255 0l114.745-114.745c12.497-12.497 12.497-32.758 0-45.255l-5.657-5.657 81.04-81.04 39.598 39.598-5.657 5.657c-9.373 9.373-9.373 24.569 0 33.941l22.627 22.627c9.373 9.373 24.569 9.373 33.941 0l124.451-124.451c9.372-9.372 9.372-24.568 0-33.941z"></path></svg>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="listing-item__col listing-item__col_with-row">' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_text">' + condition + '</div>' +
        '<div class="listing-item__row-in-col listing-item__row-in-col_color">' +
        '<span>16ГБ, <span class="mobile-none">' + ad.color + '</span></span>' +
        '<div style="background: ' + ad.colorCode + ';"></div>' +
        '</div>' +
        '</div>' +
        '<div class="listing-item__col">' +
        '<div class="listing-item__single-row listing-item__single-row_price">' +
        '<span>' + ad.price + '</span>' +
        '<span>грн</span>' +
        '</div>' +
        '</div>' +
        '<div class="listing-item__col">' +
        '<div class="listing-item__single-row listing-item__favorite" data-id="">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</article>' +
        '';
    // console.log('func4')
}

// Change date format
const dateFormat = date => {
    // let publicDtae = new Date(date);
    //
    // let dateDay = publicDate.getDate(),
    //     dateMonth = publicDate.getMonth() + 1,
    //     dateYear = publicDate.getFullYear();
    //
    // dateDay = dateDay < 10 ? '0' + dateDay : dateDay;
    // dateMonth = dateMonth < 10 ? '0' + dateMonth : dateMonth;
    // dateYear = dateYear.toString().substring(2);
    //
    // return publicDate = dateDay + '.' + dateMonth + '.' + dateYear;
    console.log('func5')
}


// const ads = new ProfileAds('d', 's', 'd', 'd');
// ads.printParams();