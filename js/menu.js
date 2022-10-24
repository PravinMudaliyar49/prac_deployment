'use-strict';

// Unlike Jonas sir's version, which didn't have a transition when the tabs were changed, we used JS30's trick of adding the element to the document (with opacity: 0) and then making the opacity: 1.

const menuOptions = function () {
    const menuTabsCont = document.querySelector('.menu_tabs_container');
    const menuTabs = document.querySelectorAll('.menu_tab');
    const menuContents = document.querySelectorAll('.menu_content');

    const handleTabChange = function (e) {
        // Activate the appropriate menu-tab:
        const menuTab = e.target.closest('.menu_tab');
        if (!menuTab) return;

        menuTabs.forEach(mTab => mTab.classList.remove('menu_tab--active'));
        menuTab.classList.add('menu_tab--active');

        // Activate the appropriate menu-content:
        menuContents.forEach(menuContent => menuContent.classList.add('transparent'));      // This is to make sure that menu-content fades out with a nice transition.

        setTimeout(() => {
            // If we knew the active-element (on which transparent was added), we couldn't listened for transitionend event and can avoid this timer.
            menuContents.forEach(menuContent => menuContent.classList.add('hidden'));    // As classList() doesn't let a class to be twice present on an element, we simply add the "hidden" class on all the elements.

            document.querySelector(`.menu_content[data-menu-content="${menuTab.dataset.tab}"]`).classList.remove('hidden');
            
            // Just for the promotional video:
            setTimeout(() => {
                document.querySelector(`.menu_content[data-menu-content="${menuTab.dataset.tab}"]`).classList.remove('transparent');
            }, 100);
        }, 600);
    }

    menuTabsCont.addEventListener('click', handleTabChange);
}

menuOptions();