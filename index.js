const planButton = document.querySelector('.btnDiet');
const mainBanner = document.getElementById('top');
const divApp = document.getElementById('app');
const home = document.querySelector('.home')

planButton.addEventListener('click', (event) =>{
    divApp.classList.add('showApp');
    divApp.classList.remove('hiddenApp');
    mainBanner.classList.add('hiddenBanner');
    mainBanner.classList.remove('shadowBanner');
})

home.addEventListener('click', (event) =>{
    divApp.classList.remove('showApp');
    divApp.classList.add('hiddenApp');
    mainBanner.classList.remove('hiddenBanner');
    mainBanner.classList.add('shadowBanner');
})