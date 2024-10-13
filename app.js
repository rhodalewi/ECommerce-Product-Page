const main = document.getElementById('main');
const lightbox = document.getElementById('lightbox');
const mainPic = document.getElementById('viewPic');
const lightboxMainPic = document.getElementById('viewPic1');
const mainThumbnailDiv = document.querySelectorAll('.picks');
const mainThumbnailPicImg = document.querySelectorAll('.product');
const lightboxThumbnailPicImg= document.querySelectorAll('.product1');
const lightboxThumbnailDiv = document.querySelectorAll('.picks1');
const cart = document.querySelector('.carts');
const emptyBasket = document.querySelector('.emptyBasket');
const filledBasket = document.querySelector('.filledBasket');
const quantity = document.querySelector('.quantity');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const cartQuantity = document.querySelector('.cartNumber');
const discountPrice = parseInt(document.querySelector('.discountPrice').value);
const totalPrice = document.querySelector('.totalAmount');
const noOfItem = document.querySelector('.noOfItem');
const button = document.getElementById('btn');
const closeLightbox = document.getElementById('close');
const checkoutBtn = document.querySelector('.checkout');
const deletes = document.querySelector('.delete');
const cartImage = document.querySelector('.imgSelect');
const bodyOpacity = document.querySelector('.body-opacity');
const previousContainer = document.querySelector('.previous');
const previousImg = document.getElementById('previous');
const nextContainer = document.querySelector('.next');
const nextImg = document.getElementById('next');
const menuIcon = document.getElementById('menuIcon');
const menuClose = document.getElementById('menuClose');
const navBar = document.querySelector('.navBar');
const toggleMenu = document.querySelector('.menus');
const navOpacity = document.querySelector('.body-opacity');

const lightboxImg = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg', 
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];

// THUMBNAIL INDEX FOR  SLIDING
let imgSlide = 0;

//  NO OFFF SJOES 
let quantities = 0;

//CHANGE THE MAIN IMAGE TO THE THUMBNAIL IMAGE CLICKED
function changeImg(src) {
    mainPic.src = src;

    mainThumbnailPicImg.forEach(image => {
        image.addEventListener('click', function() {   
        mainThumbnailPicImg.forEach(img => img.classList.remove('opacity'));
        this.classList.add('opacity');
        })
    })
          
    mainThumbnailDiv.forEach(div => {
        div.addEventListener('click', function() {
        mainThumbnailDiv.forEach(div => div.classList.remove('border'));
        this.classList.add('border');
        })
    })
};

//UPDATE LIGHTBOX
function updateLightbox() {
    lightboxMainPic.src = lightboxImg[imgSlide];
          
    lightboxThumbnailPicImg.forEach(img => img.classList.remove('opacity'));
    lightboxThumbnailPicImg[imgSlide].classList.add('opacity');
           
    lightboxThumbnailDiv.forEach(div => div.classList.remove('border'));
    lightboxThumbnailDiv[imgSlide].classList.add('border');
};


// VIEW THE LIGHTBOX
mainPic.addEventListener('click', function() {
    lightbox.style.display = 'flex';
    lightboxMainPic.src = mainPic.src; 
});

//CHANGE THE LIGHTBOX MAIN IMAGE TO THE THUMBNAIL IMAGE CLICKED
function changeLightboxImg(src) {
    lightboxMainPic.src = src;

    lightboxThumbnailPicImg.forEach(thumbnailImg => {
        thumbnailImg.addEventListener('click', function() {
          
        lightboxThumbnailPicImg.forEach(imgs => imgs.classList.remove('opacity'));
        this.classList.add('opacity');
        })
    })
          
    lightboxThumbnailDiv.forEach(thumbnailDiv => {
        thumbnailDiv.addEventListener('click', function() {
        lightboxThumbnailDiv.forEach(divs => divs.classList.remove('border'));
        this.classList.add('border');
        })
    })

    imgSlide = Array.from(lightboxThumbnailPicImg).indexOf(src);
};


// SLIDE TO THE NEXT IMAGE
function slideImg(direction) {
    imgSlide += direction;

    if (imgSlide < 0) {
        imgSlide = lightboxImg.length -1;
    } else if(imgSlide >= lightboxImg.length) {
        imgSlide = 0;
    }

    updateLightbox();
};



// PREVIOUS HOVER STATE
previousContainer.addEventListener('mouseover', () => {
    previousImg.classList.add('preNext'); 
})
previousContainer.addEventListener('mouseout', () => {
    previousImg.classList.remove('preNext'); 
});

// NEXT HOVER STATE
nextContainer.addEventListener('mouseover', () => {
        nextImg.classList.add('preNext'); 
})
nextContainer.addEventListener('mouseout', () => {
        nextImg.classList.remove('preNext'); 
});

// CLOSE LIGHTBOX
closeLightbox.addEventListener('click', function() {
    lightbox.style.display = 'none';
    bodyOpacity.style.display = 'none';
});


//INCFREMENT AND DECREMENT BUTTON
increment.addEventListener('click', function() {
    quantities++;
    quantity.textContent = quantities;
});

decrement.addEventListener('click', function() {
    if (quantities > 0) {
        quantities--;
    }
    quantity.textContent = quantities;
});


// CART QUANTITY
button.addEventListener('click', function(e) {
    e.preventDefault();

    const mainImg = document.getElementById('viewPic').src;
    const lightboxImg = document.getElementById('viewPic1').src;

    if (`${quantities}` <= 0) {
        cartQuantity.style.display = 'none';
    } else {
        cartQuantity.style.display = 'block';
        cartQuantity.textContent = `${quantities}`;
        noOfItem.textContent = `${quantities}`;
        cartImage.src = mainImg;
        cartImage.src = lightboxImg;
    }
    
    //CALCULATE THE TOTAL PRICE
    const totalAmount = discountPrice * `${quantities}`;
    totalPrice.textContent = '$' + totalAmount.toFixed(2);
});


// BASKET DISPLAY
cart.addEventListener('click', function(e) {
    e.preventDefault();

    if (`${quantities}` > 0) {
        filledBasket.style.display = 'block';
    } else {
        emptyBasket.style.display = 'block';
    }
});


// CHECKOUT BUTTON
checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    cartQuantity.style.display = 'none';
    filledBasket.style.display = 'none';
    emptyBasket.style.display = 'block'; 
});

// REMOVE BASKET WHEN PAGE IS CLICKED
main.addEventListener('click', function(event) {
    if (!cart.contains(event.target)) {
      emptyBasket.style.display = 'none';
      filledBasket.style.display = 'none';
    }
});

// MOBILE NAVIGATION
toggleMenu.addEventListener('click', () => {
    if (menuIcon.style.display === 'block') {
        menuIcon.style.display ='none';
        menuClose.style.display = 'block';
        navBar.style.display = 'block';
        navBar.classList.add('show');
        navOpacity.style.display = 'block';

    } else {
        menuIcon.style.display ='block';
        menuClose.style.display = 'none';
        navBar.classList.remove('show');
        navOpacity.style.display = 'none';
    }  
})


// DELETE
/* deletes.addEventListener('click', function() {
    cartQuantity.style.display = 'none';
    filledBasket.style.display = 'none';
    emptyBasket.style.display = 'block'; 
}) */


// TOGGLE THUMBNAIL IMAGES TO ADD OPACITY AND BORDER
/* thumbnailPicImg.forEach(image => {
    image.addEventListener('click', function() {
      
        thumbnailPicImg.forEach(img => img.classList.remove('opacity'));
        this.classList.add('opacity');
    })
});
      
thumbnailPic.forEach(div => {
    div.addEventListener('click', function() {
        thumbnailPic.forEach(div => div.classList.remove('border'));
        this.classList.add('border');
    })
}); */
