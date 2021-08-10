const $ = document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)


const formInputs= $$('.form__input')
const formLabels = $$('.form__label')

const navMobileBtnOpen = document.getElementById('nav__mobilebtn-open')
const navMobileBtnClose = document.getElementById('nav__mobilebtn-close')
const navMobile = document.getElementById('nav__mobile')
const overlayNavMobile = document.getElementById('overlay__navmobile')

const menuMobile = $('.menu__mobile')
const dropItems = $$('.menu__item.menu__dropdown')

navMobileBtnOpen.onclick = function (e){
    overlayNavMobile.classList.add('show')
    navMobile.classList.add('show')
}
const removeNavMmobile = function (e){
    overlayNavMobile.classList.remove('show')
    navMobile.classList.remove('show')
}
navMobileBtnClose.onclick = removeNavMmobile
overlayNavMobile.onclick = removeNavMmobile

dropItems.forEach(function(dropItem){
    dropItem.onclick = function(e){
        if(!e.target.closest('.menu__item-link')){
            // console.log(e.target);
            e.target.classList.toggle('show')
            const submenu = e.target.querySelector('.submenu')
            console.log(submenu.clientHeight,submenu.offsetHeight);
            if (submenu && submenu.clientHeight === 0){
                submenu.style.height = submenu.scrollHeight + 'px'
            }
            else{
                submenu.style.height = 0
            }
        }
    }
})

function FormValidate(options){
    const form = $(options.form)
    const selectorRules = {}


    function getParentElement(selector){
        return $(selector).parentElement
    }

    options.rules.forEach(function(rule) {
        if(selectorRules[rule.selector])
        {
            selectorRules[rule.selector].push(rule.message)
        }
        else{
            selectorRules[rule.selector] = [rule.message]
        }
    });
    var i;
    
    function validate(selector){
        const length = selectorRules[selector].length
        var errorMsg
        for (i = 0 ; i< length; ++i ) {
            errorMsg = selectorRules[selector][i]()
            if(errorMsg){
                break
            }
        }
        const parentElement = getParentElement(selector)
        const errorElement = parentElement.querySelector(options.errorSelector)
        if(errorMsg){
            parentElement.classList.add('error')
            errorElement.innerText = errorMsg
        }
        else{
            parentElement.classList.remove('error')
            errorElement.textContent = ' '
        }
    }
    for (const selector in selectorRules) {
        const inputElements = $$(selector)
        inputElements.forEach(function(inputElement){
            inputElement.oninput = function(){
                validate(selector)
            }

            inputElement.onblur = function(){
                validate(selector)
            }
        })
    }  
}
FormValidate.isRequired = function(selector, message){
    return{
        selector: selector,
        message : function(){
            const inputElement = $(selector)
            return inputElement.value ? undefined : message || 'Không được để trống'
        }
    }
}
FormValidate.isEmail = function(selector, message){
    return{
        selector: selector,
        message: function(){
            const inputElement = $(selector)
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(inputElement.value) ? undefined : message || 'Email không dúng định dạng' 
        }
    }
}
FormValidate.isMinLength = function(selector, length, message){
    return{
        selector: selector,
        message: function(){
            const inputElement = $(selector)
            return inputElement.value.length < length ? undefined : message || `Tổi thiểu ${length} ký tự`
        }
    }
}
FormValidate.isMaxLength = function(selector, length,message){
    return{
        selector: selector,
        message: function(){
            const inputElement = $(selector)
            return inputElement.value <= length ? undefined : message || `Tối đa ${length} ký tự`  
        }
    }
}
FormValidate.isConfirm = function(selector, getValue,message){
    return{
        selector: selector,
        message: function(){
            const inputElement = $(selector)
            return inputElement.value === getValue() ? undefined : message || `Không trùng khớp`  
        }
    }
}

const options = {
    form: '#login-form',
    errorSelector: '.error-msg',
    rules: [FormValidate.isRequired('#usernameLogin'),
            FormValidate.isRequired('#passwordLogin'),
            FormValidate.isEmail('#usernameLogin')]
}
FormValidate(options)

formInputs.forEach((formInput,index) => {
    const formLabel = formLabels[index]
    formInput.onclick = function(e){
        formLabel.classList.add('input-focus-visile')
    }
});


const tabs = $$('.tab-item');
const tabPanes = $$('.tab-pane')
const tabActive = $('.tab-item.active')
const tabLine = $('.tab-line')

tabLine.style.left = tabActive.offsetLeft + 'px';
tabLine.style.width = tabActive.offsetWidth + 'px';
tabs.forEach((tab,index) => {
    const pane = tabPanes[index]
    tab.onclick = function(e){
        const tabActive = $('.tab-item.active')
        const paneActive = $('.tab-pane.active')
        if(tabActive){
            tabActive.classList.remove('active')
        }
        if(paneActive){
            paneActive.classList.remove('active')
        }
        tab.classList.add('active')
        pane.classList.add('active')
        tabLine.style.left = tab.offsetLeft + 'px'
        tabLine.style.width = tab.offsetWidth + 'px'
    }
});
 




// carousel


const bannerImgs = ['assets/img/B365G.jpg','assets/img/i9.png','assets/img/i7.jpg']
const bannerImgLength = bannerImgs.length
var carouselIndex = 0;
function showCarousel(){
    const bannerImg = $('#banner__img')
    // console.log([bannerImg]);
    if (bannerImg && bannerImgLength > 0){
        bannerImg.src = bannerImgs[carouselIndex]
        carouselIndex = carouselIndex + 1 === bannerImgLength ? 0 : carouselIndex + 1;
    }
    setTimeout(() => {
        showCarousel()
    }, 2000)
}
showCarousel()