const planButton = document.querySelector('.btnDiet');
const mainBanner = document.getElementById('top');
const divApp = document.getElementById('app');
const home = document.querySelector('.home')
const planNav = document.querySelector('.planNav')
const logo = document.querySelector('.logo')
const logoFoot = document.querySelector('.logoFoot')

planButton.addEventListener('click', (event) =>{
    divApp.classList.remove('hiddenApp');
    mainBanner.classList.add('hiddenBanner');
    mainBanner.classList.remove('shadowBanner');
})

planNav.addEventListener('click', (event) =>{
    divApp.classList.remove('hiddenApp');
    mainBanner.classList.add('hiddenBanner');
    mainBanner.classList.remove('shadowBanner');
})

home.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hiddenBanner');
    mainBanner.classList.add('shadowBanner');
})

logo.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hiddenBanner');
    mainBanner.classList.add('shadowBanner');
})

logoFoot.addEventListener('click', (event) =>{
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hiddenBanner');
    mainBanner.classList.add('shadowBanner');
})