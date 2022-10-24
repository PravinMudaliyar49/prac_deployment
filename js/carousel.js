'use-strict';

const funkyCarousel = function () {
    const carouselCont = document.querySelector('.carousel_container');

    const handleNewElementCreation = function (element, classToAdd) {
        const content = element.textContent;
        const classNameList = element.className.split(' ');
        classNameList.pop();

        const newElement = document.createElement('div');
        newElement.className = classNameList.join(' ');
        newElement.classList.add(classToAdd);
        // Can do: newElement.innerHTML = content;
        newElement.textContent = `${content}`;

        return newElement;
    }

    const handleNext = function () {
        const leftExtremeElement = document.querySelector('.left_extreme');
        const newRightExtreme = handleNewElementCreation(leftExtremeElement, 'right_extreme');
        leftExtremeElement.remove();

        document.querySelector('.prev_slide').classList.add('left_extreme');
        document.querySelector('.prev_slide').classList.remove('prev_slide');

        document.querySelector('.active_slide').classList.add('prev_slide');
        document.querySelector('.active_slide').classList.remove('active_slide');

        document.querySelector('.next_slide').classList.add('active_slide');
        document.querySelector('.next_slide').classList.remove('next_slide');

        document.querySelector('.right_extreme').classList.add('next_slide');
        document.querySelector('.right_extreme').classList.remove('right_extreme');

        carouselCont.appendChild(newRightExtreme);
    }


    const handlePrev = function () {
        const rightExtremeElement = document.querySelector('.right_extreme');
        const newLeftExtreme = handleNewElementCreation(rightExtremeElement, 'left_extreme');
        rightExtremeElement.remove();

        document.querySelector('.next_slide').classList.add('right_extreme');
        document.querySelector('.next_slide').classList.remove('next_slide');

        document.querySelector('.active_slide').classList.add('next_slide');
        document.querySelector('.active_slide').classList.remove('active_slide');

        document.querySelector('.prev_slide').classList.add('active_slide');
        document.querySelector('.prev_slide').classList.remove('prev_slide');

        document.querySelector('.left_extreme').classList.add('prev_slide');
        document.querySelector('.left_extreme').classList.remove('left_extreme');

        carouselCont.prepend(newLeftExtreme);
    }

    // Won't work as per expectation:
    // document.querySelector('.next_slide').addEventListener('click', handleNext);
    // document.querySelector('.prev_slide').addEventListener('click', handlePrev);

    carouselCont.addEventListener('click', function (e) {
        if (e.target.classList.contains('prev_slide')) handlePrev();
        else if (e.target.classList.contains('next_slide')) handleNext();
    });
}

funkyCarousel();