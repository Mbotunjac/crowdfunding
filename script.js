const MenuToggle ={
    menuBtn: document.querySelector('[data-menu="menu-control"]'),
    menu: document.querySelector('.nav-menu'),
    modalWrp: document.querySelector('.modal-wrapper'),

    init() {
        MenuToggle.menuBtn.addEventListener('click', MenuToggle.open);
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
            ModalToggle.modalWrp.classList.add('active');
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
        let container = event.target.parentNode.parentNode.parentNode;
        let offer = container.querySelector('.card-selected');
        if (offer) {
            offer.classList.add('active');
        }
    },
    disableOffers(container) {
        let offer = container.querySelector('.card-selected');
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

const InputManipulation = {
    inputControll: document.querySelectorAll('input'),

    init() {
        InputManipulation.inputControll.forEach((input) => {
            input.addEventListener('change', InputManipulation.selectElement);

        });
    },
    selectElement(event) {
        InputManipulation.clean();
        ModalToggle.enableOffers(event);
        let container = event.target.parentNode.parentNode.parentNode;
        container.style.border = '2px solid #21afa7';
    },
    clean() {
        InputManipulation.inputControll.forEach((input) => {
            let container = input.parentNode.parentNode.parentNode;
            ModalToggle.disableOffers(container);
            container.style.border = '1px solid #aaa';
        });
    },
};

const Buy = {
    buyBtn: document.querySelectorAll('[data-cart="commiting"'),
    buyDone: document.querySelector("#finish"),

    init() {
        console.log(Buy.buyBtn);
        Buy.buyBtn.forEach((button) => {
            button.addEventListener('click', ModalToggle.confirm);
            let container = button.parentElement;
        });

        Buy.buyDone.addEventListener('click', (event) => {
            ModalToggle.disable();
            ModalToggle.confirm();
        }); 
    },

};




MenuToggle.init();
ModalToggle.init();
InputManipulation.init();
Buy.init();
