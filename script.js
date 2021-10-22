
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#wrapper");
const main = document.querySelector("main");
const numberSection = document.querySelector("#funding");
const statsContainer = document.querySelector("#funding .funding-info");
const progressBar = document.querySelector("#progress .progress-fill");
const logo = document.querySelector("#logo");
const openNav = document.querySelector("#openNav"); 
const closeNav = document.querySelector("#closeNav");
const navToggles = [openNav, closeNav]; 
const mobileNav = document.querySelector("#mobileNav");
const desktoptNav = document.querySelector("#desktopNav");
const bookmark = document.querySelector("#bookmark");
const bookmarkLabel = document.querySelector("#bookmark p");
const openButtons = document.querySelectorAll("main button");
const specificButtons = { button1: "#basic", button2: "#advanced", button3: "#premium" };
const closeModal = document.querySelector("#closeModal");
const selects = document.querySelectorAll(".card input");
const inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 };
const continueButtons = document.querySelectorAll(".card-option button");
const confirmation = document.querySelector("#completed");
const finalizeButton = document.querySelector("#completed button");
const totalRaised = document.querySelector("#total");
const totalBackers = document.querySelector("#totalBackers");

let pledge = 0;

const toggleOverlay = () => overlay.classList.toggle("active");

const toggleNav = () => {
    main.classList.toggle("inactive");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");
    navToggles.forEach(toggle => toggle.classList.toggle("active"));
};

const toggleModal = () => {
    modal.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    desktoptNav.classList.toggle("inactive");
};

const resetModal = () => {
    setTimeout(() => {
        clearSelect();
        closeModal.scrollIntoView();
    }, 500);
};

const clearSelect = () => {
    const currentSelection = document.querySelector(".card-option.active");
    if (currentSelection) {
        const radio = document.querySelector(".card-option .card input");
        const pledge = document.querySelector(".card-option .card-selected");
        const currentInput = document.querySelector(".card-option.active .amount input");
        currentSelection.classList.remove("active");
        radio.checked = false;
        pledge.style.maxHeight = 0;
        setTimeout(() => {
            currentInput.parentElement.parentElement.classList.remove("error");
            currentInput.value = "";
        }, 500);
    };
};

const selectNew = select => {
    const parentSelection = select.parentElement.parentElement;
    parentSelection.classList.toggle("active");
 //   const pledge = document.querySelector(".card-option.active .amount");
 //   pledge.style.maxHeight = pledge.scrollHeight + "px";
    select.checked = true;
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500);
};

const updateStock = () => {
    const selector = document.querySelector(".card-option.active .card input").getAttribute("value");;
    const options = document.querySelectorAll(`.option.${selector}`);
    const stock = document.querySelectorAll(`.option.${selector} .price`)
    if (selector !== "noReward") {
        const newStock = Number(stock[0].innerHTML) - 1;
        stock.forEach(s => {
            s.innerHTML = newStock.toString();
        });
        if (newStock === 0) {
            options.forEach(o => {
                o.classList.add("inactive");
                document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock");
            });
        };
    };;
};


// Overlay Close

overlay.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
        toggleNav();
        mobileNav.style.opacity = 0;
        mobileNav.style.maxHeight = 0;
    } else {
        resetModal();
        toggleModal();
        toggleOverlay();
    };
});


// Mobile Menu

openNav.addEventListener("click", () => {
    mobileNav.style.opacity = 1;
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    toggleNav();
});

closeNav.addEventListener("click", () => {
    mobileNav.style.opacity = 0;
    mobileNav.style.maxHeight = 0;
    toggleNav();
});


// Bookmark Button

bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active");
    if (bookmark.classList.contains("active")) {
        bookmarkLabel.innerHTML = "Bookmarked";
    } else {
        bookmarkLabel.innerHTML = "Bookmark";
    };
});


// Modal

openButtons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModal();
        toggleOverlay();
        if (b.classList.contains("option-reward")) {
            const inputID = specificButtons[b.id];
            const checkedOption = document.querySelector(inputID);
            
            selectNew(checkedOption);
        };
    });
});

closeModal.addEventListener("click", () => {
    resetModal();
    toggleModal();
    toggleOverlay();
});


// Option Selection

selects.forEach(select => {
    select.addEventListener("change", () => {
        clearSelect();
        selectNew(select);
    });
});


// Form Validation

continueButtons.forEach(b => {
    b.addEventListener("click", event => {
        event.preventDefault();
        const input = document.querySelector(".card-option.active .amount input");
        const inputID = input.id;
        pledge = Number(input.value);
        if (!pledge || pledge < inputConditions[inputID]) {
            input.parentElement.parentElement.classList.add("error");
       } else {
            input.parentElement.parentElement.classList.remove("error");
            updateStock();
            resetModal();
            overlay.classList.toggle("inactive");
           modal.classList.toggle("active");
           setTimeout(() => {
               confirmation.classList.toggle("active");
           }, 1000);
        };
    });
});


// Confirmation

finalizeButton.addEventListener("click", () => {
    overlay.classList.toggle("inactive");
    overlay.classList.toggle("active");
    confirmation.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    numberSection.classList.toggle("loading");
    const newTotal = Math.round(parseFloat(totalRaised.innerHTML.replace(",", "")) + pledge);
    let totalString = newTotal.toString();
    const newBackers = (parseFloat(totalBackers.innerHTML.replace(",", "")) + 1).toString();
    let backersString = newBackers.toString();
    for (let i = 3; i < totalString.length; i += 4) {
        totalString = totalString.slice(0, -i) + "," + totalString.slice(-i);
    }
    for (let i = 3; i < backersString.length; i += 3) {
        backersString = backersString.slice(0, -i) + "," + backersString.slice(-i);
    }
    setTimeout(() => {
        numberSection.scrollIntoView({ behavior: "smooth" });
        progressBar.style.transition = "width 0s ease-out";
        progressBar.style.maxWidth = 0;
        progressBar.style.width = 0;
        setTimeout(() => {
            totalRaised.innerHTML = totalString;
            totalBackers.innerHTML = backersString;
            numberSection.classList.toggle("loading");
            progressBar.style.maxWidth = "100%";
            let newWidth = newTotal * 100 / 100000;
            if (newWidth < 100) {
                progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`;
                progressBar.style.width = newWidth + "%";
            } else {
                progressBar.style.transition = "width 2s ease-out";
                progressBar.style.width = "100%";
            };
        }, 500);
    }, 500);
});






/*

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

*/
