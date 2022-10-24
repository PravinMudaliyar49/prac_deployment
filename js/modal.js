'use-strict';

const handleModal = function () {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnsOpenModal = document.querySelectorAll('.btn_modal');

    const handleModalOpen = function (e) {
        e.preventDefault();
        overlay.classList.remove('invisible');

        // Just for promotional video:
        overlay.addEventListener('transitionend', e => {
            modal.classList.remove('invisible');
            modal.classList.remove('xTranslated_modal');
        }, { once: true });       // "{once: true}" this is IMP cuz the "transitionend" of overlay again gets triggered when closing the modal.
    }

    const handleModalClose = function (e) {
        e.preventDefault();
        modal.classList.add('invisible');
        modal.classList.add('xTranslated_modal');

        // Just for promotional video:
        modal.addEventListener('transitionend', e => {
            overlay.classList.add('invisible');
        }, { once: true });     // Again for the same reason.
    }

    btnsOpenModal.forEach(btn => btn.addEventListener('click', handleModalOpen));

    // Notice that we don't have to attach a listener on the "close_btn" cuz of event bubbling.
    overlay.addEventListener('click', handleModalClose);

    // TEST:
    // setTimeout(() => {
    //     btnsOpenModal.forEach(btn => btn.click());

    //     setTimeout(() => {
    //         overlay.click();
    //     }, 5000);
    // }, 5000);
}

handleModal();