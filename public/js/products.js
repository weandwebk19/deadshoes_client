
let product_list = document.querySelector('#products')
let filter_col = document.querySelector('#filter-col')

document.querySelector('#filter-toggle').addEventListener('click', () => filter_col.classList.toggle('active'))

document.querySelector('#filter-close').addEventListener('click', () => filter_col.classList.toggle('active'))

// let size;

// $(document).ready(function(){
//     $("input[type='radio']").click(function(){
//         size = $("input[name='size']:checked").val();
//     });
// });

$(".btn-cart-add").click(function (e) {
    e.preventDefault();
    const productid = $(this).attr("value");

    $.post(`/cart/${productid}/`, {}, function (data, status) {
        if (data.msg === "success") {
            const curCount = parseInt($('.cart-count').html());
            $('.cart-count').html(`(${curCount + 1})`);
        }
    });

    if ($(this).hasClass('disable')) {
        return false;
    }
    $(document).find('.btn-cart-add').addClass('disable');

    const parent = $(this).parents('.product-card');
    const src = parent.find('img').attr('src');
    const cart = $(document).find('.cart-btn');

    const parentTop = $(this).offset().top;
    const parentLeft = $(this).offset().left;

    $('<img/>', {
        class: 'flying-product',
        src: src,
    }).appendTo('body').css({
        'top': parentTop,
        'left': parentLeft,
    });

    setTimeout(function () {
        $(document).find('.flying-product').css({
            'top': cart.offset().top,
            'left': cart.offset().left,

        })
        setTimeout(function () {
            $(document).find('.flying-product').remove();
            let citem = parseInt($(document).find('.cart-count').data('count')) + 1;
            $(document).find('.cart-count').text(citem).data('count', citem);
            $(document).find('.btn-cart-add').removeClass('disable')
        }, 990)
    }, 500)
});

$(".btn-wishlist-add").click(function (e) {
    e.preventDefault();
    const heartIcon = $(this).find('.heart-icon');
    const productid = $(this).attr("value");
    
    $.post(`/wishlist/${productid}/`, {}, function (data, status) {

    });

    if (heartIcon.hasClass('like')) {
        heartIcon.removeClass('like');
    } else {
        heartIcon.addClass('like');
    }
});