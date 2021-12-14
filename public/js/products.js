
let product_list = document.querySelector('#products')
const btnCart = document.querySelectorAll('.btn-cart-add')
let filter_col = document.querySelector('#filter-col')

document.querySelector('#filter-toggle').addEventListener('click', () => filter_col.classList.toggle('active'))

document.querySelector('#filter-close').addEventListener('click', () => filter_col.classList.toggle('active'))

$(".btn-cart-add").click(function (e) {
    e.preventDefault();
    const slugName = $(this).attr("value");
    // $.ajax({
    //     async: false,
    //     type: "POST",
    //     url: `/cart/${slugName}`,
    //     contentType: "application/x-www-form-urlencoded",
    //     datatype: "html",
    //     data: {},
    //     success: function (response) {
    //         console.log(response);
    //         $('.cart-count').html(`(${curCount + 1})`);
    //     },
    //     error: function (response) {
    //         console.log(response);
    //     }
    // })
    $.post(`/cart/${slugName}`, {}, function (data, status) {
        if(data.msg==="success"){
            const curCount = parseInt($('.cart-count').html());
            $('.cart-count').html(`(${curCount + 1})`);
        }
    });
});