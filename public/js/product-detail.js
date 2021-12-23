let currSize;
let currSizeIndex = 0;
let currAmount;
let currAmountIndex = 0;

// choose size
$('input[type="radio"]:first').attr('checked', true);
$('.product-info-shoesize .button-labels:first-child').find('label').addClass('active');
$('.shoesize-stock[index="0"]').addClass('active');

$(document).ready(function () {
    $("input[type='radio']").click(function () {
        let lastIndex = currSizeIndex;

        $(`.shoesize-stock[index="${lastIndex}"]`).removeClass('active');
        currSize = $("input[name='size']:checked").val();
        currSizeIndex = $(this).closest('.button-labels').index();

        $(this).closest('.button-labels').find('label').addClass('active');
        $('input[type="radio"]:not(:checked)').closest('.button-labels').find('label').removeClass('active');

        lastIndex = currSizeIndex;
        $(`.shoesize-stock[index="${currSizeIndex}"]`).addClass('active');
    });
});

// plus 
$('.fa-plus').click(function () {
    currAmount = parseInt($(document).find('.product-quantity').data('count')) + 1;
    $(document).find('.product-quantity').text(currAmount).data('count', currAmount);
});

// minus
$('.fa-minus').click(function () {
    currAmount = Math.max(parseInt($(document).find('.product-quantity').data('count')) - 1, 1);
    $(document).find('.product-quantity').text(currAmount).data('count', currAmount);
});



$(".btn-cart-add").click(function (e) {
    let size = document.querySelector('input[type="radio"]:checked').value;

    e.preventDefault();
    const productid = $(this).attr("value");
    $.ajax({
        async: false,
        type: "POST",
        url: `/cart/${productid}`,
        contentType: "application/x-www-form-urlencoded",
        datatype: "html",
        data: { size },
        success: function (response) {
            console.log(response);
            const curCount = parseInt($('.cart-count').html());
            $('.cart-count').html(`(${curCount + 1})`);
        },
        error: function (response) {
            console.log(response);
        }
    })
});

$(function(){
        $('#cart-add-modal').on('show.bs.modal', function(){
            let myModal = $(this);
            clearTimeout(myModal.data('hideInterval'));
            myModal.data('hideInterval', setTimeout(function(){
                myModal.modal('hide');
            }, 1500));
        });
    });