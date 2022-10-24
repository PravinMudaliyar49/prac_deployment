'use-strict';

const handleTestimonialFollowAlong = function () {
    const testimonials = document.querySelectorAll('.testimonial');
    const followAlong = document.querySelector('.follow_along_background');

    const handleHoverEnter = function (e) {
        e.target.classList.add('testimonial_enter');

        // setTimeout(() => {
        //     e.target.classList.add('testimonial_dropdown_visible');
        // }, 200);
        // Hover over all the testimonials quickly and get the cursor out of all the testimonials. Then in the inspector, we'll get to see that the last-hovered testimonial is still having the "testimonial_dropdown_visible". To avoid this, we write:

        setTimeout(() => e.target.classList.contains('testimonial_enter') && e.target.classList.add('testimonial_dropdown_visible'), 200);

        const dropdown = e.target.querySelector('.testimonial_dropdown');
        const dropdownCoords = dropdown.getBoundingClientRect();

        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            // top: dropdownCoords.top + window.pageYOffset,
            // left: dropdownCoords.left + window.pageXOffset,
            top: dropdownCoords.top,
            left: dropdownCoords.left,
        }

        followAlong.style.height = `${coords.height}px`;
        followAlong.style.width = `${coords.width}px`;
        followAlong.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
        followAlong.classList.add('open');
    }

    const handleHoverLeave = function (e) {
        e.target.classList.remove('testimonial_enter', 'testimonial_dropdown_visible');
        followAlong.classList.remove('open');
    }

    testimonials.forEach(testimonial => testimonial.addEventListener('mouseenter', handleHoverEnter));
    testimonials.forEach(testimonial => testimonial.addEventListener('mouseleave', handleHoverLeave));
}

handleTestimonialFollowAlong();