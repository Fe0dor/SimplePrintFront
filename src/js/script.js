const navbarToggle = document.querySelector('.navbar__toggle');
const nav  = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item')
const header = document.querySelector('.header');
let isNavActive = false;
let isScrolled = false;
let isMobile = window.innerWidth <= 768;

window.addEventListener('scroll', () => {
    if (scrollY > 20) {
        isScrolled = true;
        setHeaderBackground(true);
    } else {
        isScrolled = false;
        setHeaderBackground(false);
    }
});

window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if ((w <= 768) != isMobile) {
        closeNav();
        isMobile = w <= 768;
    }
});

function setHeaderBackground(isSet) {
    if (!isNavActive) {
        if (isSet) {
            header.classList.add('header_scrolled');
            isScrolled = true;
        } else {
            header.classList.remove('header_scrolled');
            isScrolled = false;
        }
    } else {
        header.classList.add('header_scrolled');
    }
    
}

const closeNav = function () {
    isNavActive = false;
    setNavbar(false);
    navbarToggle.classList.remove('navbar__toggle_active');
    navItems.forEach(element => {
        element.removeEventListener('click', closeNav);
    });
}

navbarToggle.addEventListener('click', () => {
    isNavActive = !isNavActive;
    if(isNavActive) {
        setNavbar(true);
        navItems.forEach(element => {
            element.addEventListener('click', closeNav);
        });
    } else {
        closeNav();
    }
});

function setNavbar(isOpen) {
    if(isOpen) {
        nav.style.height = `${nav.scrollHeight}px`;
        navbarToggle.classList.add('navbar__toggle_active');
        setHeaderBackground(true);
    } else {
        nav.style = '';
        navbarToggle.classList.remove('navbar__toggle_active')
        setHeaderBackground(isScrolled);
    }
}

let accrodionItems = document.querySelectorAll('.accordion__item');
let accordionActiveItem = null;

for (let i = 0; i < accrodionItems.length; i++) {
    accrodionItems[i].children[0].addEventListener('click', () => {
        if (accrodionItems[i].children[1].style.maxHeight) {
            accrodionItems[i].children[1].style.maxHeight = null;
            accrodionItems[i].children[0].children[1].children[0].classList.remove('accordion__line-wrapper_active');
        } else {
            accrodionItems[i].children[1].style.maxHeight = accrodionItems[i].children[1].scrollHeight + "px";
            accrodionItems[i].children[0].children[1].children[0].classList.add('accordion__line-wrapper_active');
        }
    });
}