const navbarToggle = document.querySelector('.navbar__toggle');
const nav  = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item')
const header = document.querySelector('.header');
let isNavActive = false;
let isScrolled = false;
let isMobile = window.innerWidth <= 576;

window.addEventListener('scroll', () => {
    if (scrollY > 10) {
        isScrolled = true;
        setHeaderBackground(true);
    } else {
        isScrolled = false;
        setHeaderBackground(false);
    }
});

window.addEventListener('resize', () => {
    let w = window.innerWidth;
    if ((w <= 576) != isMobile) {
        closeNav();
        isMobile = w <= 576;
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