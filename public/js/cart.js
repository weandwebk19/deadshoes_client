
$(document).ready(function () {
    let currAmount;
    let currAmountIndex = 0;
    let newQty = [];
    let currId;
    let currSize;
    const deleteForm = document.forms['delete-product-form'];

    // plus 
    $('.btn-plus').click(function () {
        currAmount = parseInt($(this).parent().parent().find('.product-quantity').data('count')) + 1;
        $(this).parent().parent().find('.product-quantity').text(currAmount).data('count', currAmount);
    });

    // minus
    $('.btn-minus').click(function () {
        currAmount = Math.max(parseInt($(this).parent().parent().find('.product-quantity').data('count')) - 1, 1);
        $(this).parent().parent().find('.product-quantity').text(currAmount).data('count', currAmount);
    });

    // delete
    $('.remove-from-cart').click(function () {
        currId = $(this).attr('name');
        currSize = $(this).attr('shoesize');
        $('#btn-delete-product').attr('name', currId).attr('shoesize', currSize);
    });

    // confirm delete
    $('#btn-delete-product').click(function () {
        deleteForm.action = '/cart/' + $(this).attr('name') + '/' + $(this).attr('shoesize') + '?_method=DELETE';
        deleteForm.submit();
    });

    $('.value-changed').click(function (e) {
        e.preventDefault();

        /* Disabled btn 500ms when click add */
        if ($('.value-changed').hasClass('disabled')) return;
        $('.value-changed').addClass('disabled');
        setTimeout(function () {
            $('.value-changed').removeClass('disabled');
        }, 500);

        const value = $(this).attr('value');
        const size = $(this).attr('shoesize')
        const productid = $(this).attr('name');

        const request = $.ajax({
            url: `/cart/${productid}`,
            data: JSON.stringify({
                bias: {
                    value: parseInt(value),
                    size: parseInt(size)
                },
            }),
            type: 'PUT',
            contentType: 'application/json',
            processData: false,
            xhr: function () {
                return window.XMLHttpRequest == null ||
                    new window.XMLHttpRequest().addEventListener == null
                    ? new window.ActiveXObject('Microsoft.XMLHTTP')
                    : $.ajaxSettings.xhr();
            },
        });

        // Req done
        request.done(function (data, status) {
            if (data.msg === 'success' && status === 'success') {
                // Update view
                data.data.cartProductsDetail.forEach((item) => {
                    $(`#${item.product.productid}and${item.size}`).html(`$${item.total}`);
                });

                $('#totalCost').html(
                    `$${data.data.totalPrice}`
                )
            }
        });
    });
}) 
