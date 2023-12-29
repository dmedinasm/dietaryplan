const planButton = document.querySelector('.btnDiet');
const mainBanner = document.getElementById('top');
const divApp = document.getElementById('app');
const home = document.querySelector('.home')
const planNav = document.querySelector('.planNav')
const logo = document.querySelector('.logo')
const logoFoot = document.querySelector('.logoFoot')
const contactForm = document.querySelector('.contactForm')
const contact = document.querySelector('.contact')
const formContact = document.getElementById('formContact')
planButton.addEventListener('click', (event) =>{
    divApp.classList.remove('hiddenApp');
    mainBanner.classList.add('hidden');
    mainBanner.classList.remove('shadow');
    contact.classList.add('hidden');
    contact.classList.remove('shadow');
})

planNav.addEventListener('click', (event) =>{
    divApp.classList.remove('hiddenApp');
    mainBanner.classList.add('hidden');
    mainBanner.classList.remove('shadow');
    contact.classList.add('hidden');
    contact.classList.remove('shadow');
})

home.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hidden');
    mainBanner.classList.add('shadow');
    contact.classList.add('hidden');
    contact.classList.remove('shadow');
})

logo.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hidden');
    mainBanner.classList.add('shadow');
    contact.classList.add('hidden');
    contact.classList.remove('shadow');
})

logoFoot.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hidden');
    mainBanner.classList.add('shadow');
    contact.classList.add('hidden');
    contact.classList.remove('shadow');
})

contactForm.addEventListener('click', (event) => {
    divApp.classList.add('hiddenApp');
    mainBanner.classList.add('hidden');
    mainBanner.classList.remove('shadow');
    contact.classList.add('shadow');
})

formContact.addEventListener('submit', (event) => {
    event.preventDefault()
})