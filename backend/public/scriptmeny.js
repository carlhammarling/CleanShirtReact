
// DROPDOWN

document.addEventListener('click', e => {
    const isDropDownButton = e.target.matches('[data-dropdown-button]');

    // för att inte ta bort menyn när man klickar i
    if (!isDropDownButton && e.target.closest('[data-dropdown]') != null) return;

    let currentDrop = null;
    if (isDropDownButton) {
         currentDrop = e.target.closest('[data-dropdown]');
         currentDrop.classList.toggle('active');
        };

        // för att stänga om man klickar utanför
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDrop) return
        dropdown.classList.remove('active');
    });  

});