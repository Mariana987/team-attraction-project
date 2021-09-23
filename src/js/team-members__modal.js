import refs from './refs';

refs.openTeamModalBtn.addEventListener('click', addModal);
refs.closeTeamModalBtn.addEventListener('click', removeModal);
window.addEventListener('keydown', onEscapeModalClose);
refs.teamBackdrop.addEventListener('click', onOverlayModalClose)

function addModal() {
    refs.modal.classList.remove('is-hidden');
    // $('.team-list').slick('setPosition');
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
    // autoplaySpeed: 4000,
});