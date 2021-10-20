const MenuToggle ={
    menuBtn: document.querySelector('[data-menu="menu-control"]'),
    menu: document.querySelector('.nav-menu'),
    modalWrp: document.querySelector('.modal-wrapper'),

    init() {
        MenuToggle.menuBtn.addEventListener('click', Menu.open);
    },
    open() {
        MenuToggle.menuBtn.classList.toggle('active');
        MenuToggle.activeMenu();
    },
    activeMenu() {
        if (MenuToggle.menu.classList.contains('active')) {
            MenuToggle.menu.classList.remove('active');
            ModalToggle.modalWrp.classList.remove('active');
        }
        else {
            MenuToggle.menu.classList.add('active');
            ModalToggle.menu.classList.add('active');
        }
    },
    
};

const ModalToggle = {
    modalBtn: document.querySelectorAll('.option-reward'),
    modalWrp: document.querySelector('.modal-wrapper'),
    modal: document.querySelector('.modal'),
    modalClose: document.querySelector('[data-menu="close-modal"]'),
    modalDefault: document.querySelector('.modal-default'),
    modalSuccess: document.querySelector('.modal-completed'),

    init() {
        ModalToggle.modalBtn.forEach((btn) => {
            btn.addEventListener('click', ModalToggle.active);
        });
    },
    active() {
        ModalToggle.modal.classList.add('active');
        ModalToggle.modalWrp.classList.add('active');
        ModalToggle.modalClose.addEventListener('click', ModalToggle.disable);
    },
    disable() {
        ModalToggle.modal.classList.remove('active');
        ModalToggle.modalWrp.classList.remove('active');
    },
    enableOffers(event) {
        let container= event.target.parentNode.parentNode.parentNode;
        let offer= container.querySelector('.card-selected');
        if (offer) {
            offer.classList.add('active');
        }
    },
    disableOffers(container) {
        let offer= container.querySelector('.card-selected');
        if (offer) {
            offer.classList.remove('active');
        }
    },
    confirm() {
        if (ModalToggle.modalSuccess.classList.contains('active')) {
            ModalToggle.modalDefault.classList.remove('disable');
            ModalToggle.modalSuccess.classList.remove('active');
        }
        else {
            ModalToggle.modalDefault.classList.add('disable');
            ModalToggle.modalSuccess.classList.add('active');
        }
    },
};



MenuToggle.init();
ModalToggle.init();
