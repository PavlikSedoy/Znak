import IntersectionObserver from '@babel/polyfill';
import Stickyfill from 'stickyfilljs';

const filtersHeader = document.getElementById('filtersHeading');
Stickyfill.add(filtersHeader);

export default class StickyHeading {
    // Change styling when filters-heading is stuck
    static filtersHeadingStuck() {
        console.log(filtersHeader);
    }
    // End Change styling when filters-heading is stuck

    observer(entries) {
        const observer = new IntersectionObserver(this.checkStuck(entries), {threshold: [0, 1]});

        observer.observe(document.querySelector("#filtersHeading"));
    }

    checkStuck(entries) {
        console.log(entries);
        // no intersection
        // if (entries[0].intersectionRatio === 0)
        //     document.querySelector("#filtersHeading").classList.add("nav-container-sticky");
        // fully intersects
        // else if (entries[0].intersectionRatio === 1)
        //     document.querySelector("#filtersHeading").classList.remove("nav-container-sticky");
    }
}