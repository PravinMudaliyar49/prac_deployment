'use-strict';

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// Fade-out the elements on hover:
const fadeOutOnHover = function () {
    // Not creating a separate util-class called "hover_fadeout" cuz we don't have to transform all the fade-out elements. For this, we'd have to create 2 util classes. So instead of that hassle, just directly set the styling over here.
    const navItemsCont = document.querySelector('.nav_items_container');
    const navItems = document.querySelectorAll('.nav_item');
    const logo = document.querySelector('.restaurant_logo');

    /*
    Dry violation:
    navItemsCont.addEventListener('mouseover', function (e) {
        const navItem = e.target.closest('.nav_item');
        if (!navItem) return;

        logo.style.opacity = '0.5';
        navItems.forEach(nItem => {
            if (nItem !== navItem) {
                nItem.style.opacity = '0.5';
                if(!nItem.querySelector('.btn')) {
                    nItem.style.transform = 'scale(0.9)';
                }
            }
        });

    });

    navItemsCont.addEventListener('mouseout', function (e) {
        logo.style.opacity = '1';
        navItems.forEach(nItem => {
            nItem.style.opacity = '1';
            nItem.style.transform = 'scale(1)';
        });
    });
    */

    //Task: Export the callback into a separate function:
    const handleFadeoutEffect = function (e) {
        const navItem = e.target.closest('.nav_item');
        if (!navItem) return;

        const [opacityParam, transformParam] = this;

        logo.style.opacity = opacityParam;
        navItems.forEach(nItem => {
            if (nItem !== navItem) {
                nItem.style.opacity = opacityParam;
                if (!nItem.querySelector('.btn')) {
                    nItem.style.transform = `scale(${transformParam})`;
                }
            }
        });
    }

    navItemsCont.addEventListener('mouseover', handleFadeoutEffect.bind(['0.5', 0.9]));
    navItemsCont.addEventListener('mouseout', handleFadeoutEffect.bind([1, 1]));
}

// Sticky navbar:
const handleStickyNavbar = function () {
    const header = document.querySelector('.header');
    const voidSpace = document.querySelector('.void_space');
    const heroSection = document.querySelector('.hero_section');

    const navBarHeight = header.getBoundingClientRect().height;

    const stickyNavObserverCallback = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) {
            header.classList.add('sticky');
            voidSpace.classList.remove('hidden');
        } else {
            header.classList.remove('sticky');
            voidSpace.classList.add('hidden');
        }
    }

    const stickyNavOptions = {
        root: null,
        threshold: 0,
        rootMargin: `-${navBarHeight + 4}px`,   // Cuz I want to shrink the "heroSection" dimensions, I gave -ve rootMargin.
    };

    const stickyNavObserver = new IntersectionObserver(stickyNavObserverCallback, stickyNavOptions);
    stickyNavObserver.observe(heroSection);
}

// Smooth scrolling
const handleSmoothScrolling = function () {
    const navItemsCont = document.querySelector('.nav_items_container');

    const smoothScrollToTheElement = function (e) {
        e.preventDefault();
        /* Solution 1:
        const section = document.querySelector(`${e.target.getAttribute('href')}`);
        if (!section) return;
        section.scrollIntoView({ behavior: 'smooth' }); */

        if(!e.target.classList.contains('nav_link')) return;

        const section = document.querySelector(`${e.target.getAttribute('href')}`);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    navItemsCont.addEventListener('click', smoothScrollToTheElement);
    // Exported to a separate function cuz, we may decide to do the same activity on clicking "explore_more" btn.
}

fadeOutOnHover();
handleStickyNavbar();
handleSmoothScrolling();
