'use-strict';

// Fixed this: A slight clunky effect is observed when quickly scrolled to the footer. This is cuz, we've translatedY to footer as well. Whereas in J_S sir's version, the footer wasn't translated. To solve this, add a small section just below the testimonials_section and have it translatedY. Remove the "transform: translateY()" from the footer.

const handleSmoothReveal = function () {
    const sections = document.querySelectorAll('.section');

    const sectionObserverCallback = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    }

    const options = {
        root: null,
        threshold: 0,
    };

    const sectionObserver = new IntersectionObserver(sectionObserverCallback, options);
    sections.forEach(section => {
        section.classList.add('section--hidden')
        sectionObserver.observe(section);
    });
}

handleSmoothReveal();