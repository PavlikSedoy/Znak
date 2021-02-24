// Classes
import ProfileAds from "@js/classes/models/ProfileAds";
import Preloader from "@js/classes/Preloader";
import PrintProfileAds from "@js/classes/PrintProfileAds";

// Elements
const moreBtn = document.getElementById('loadMore');
const select = document.getElementById('profileSort');

const authorId = document.getElementById('authorId').value;

const getAds = new ProfileAds(authorId);
const printAds = new PrintProfileAds();

document.addEventListener('DOMContentLoaded', () => {
    // Click on load More
    moreBtn.addEventListener('click', () => getAdsF());

    select.addEventListener('change', () => {
        const sortingVal = select.value;

        getAds.changeSorting(sortingVal);
        getAds.resetClickCounter();
        printAds.cleaningAdsBlock();
        printAds.showMoreBtn();

        getAdsF();
    });
});

const getAdsF = () => {
    Promise.resolve( getAds.getData() )
        .then( data => {
            data = data.data;

            const resultStatus = data.result,
                ads = data.ads,
                currentOffset = data.currentOffset,
                total = data.total,
                photos = data.devicePhotos,
                lang = data.language;

            if ( resultStatus ) {
                if ( currentOffset >= total ) printAds.hideMoreBtn();

                printAds.print(ads, photos);
                Preloader.hide();
            }
        });
}