import refs from './refs';

refs.openTeamModalBtn.addEventListener('click', addModal);
window.addEventListener('keydown', onEscapeModalClose);
refs.teamBackdrop.addEventListener('click', onOverlayModalClose)

function addModal() {
    refs.modal.classList.remove('is-hidden');

}
function removeModal() {
    refs.modal.classList.add('is-hidden');
}
function onEscapeModalClose(event) {
    if (event.key !== 'Escape') {
        return;
    }
    removeModal();
}
function onOverlayModalClose(event) {
    if (event.currentTarget === event.target) {
        removeModal();
    }
}

$('[data-slick]').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 320,
            settings: {
                slidesToShow: 1
            }
        }
    ],
    mobileFirst: true,
});