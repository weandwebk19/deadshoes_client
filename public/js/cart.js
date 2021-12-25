let currAmount;
let currAmountIndex = 0;
let newQty = [];

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

$('.value-changed').click(function () {
    console.log(parseInt($('.product-quantity').text()));

    const value = $(this).attr('value');
    const size = $(this).attr('shoesize')
	const productid = $(this).attr('name');

    console.log(value, productid, size);

	// if (parseInt(value) === 0) {
	// 	const re = confirm('Bạn chắc chắn muốn xóa vật phẩm khỏi giỏ hàng ?');
	// 	if (re == false) return false;
	// 	$(this).parent().parent().addClass('d-none');

	// 	/* Check cart empty */
	// 	$('#cart tr').not('tr[class="d-none"]').length === 0 && displayCartEmpty();
	// }

    // Chân thành cảm ơn copilot <3, chúc những lập trình viên ra copilot ngày mới xinh đẹp, tuyệt vời, xứng đáng ở trong lâu đài tình ái.
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
    request.done(async function (data, status) {
        if (data.msg === 'success' && status === 'success') {
            // Update view
            await data.data.cartProductsDetail.forEach((item) => {
				$(`#${item.product.productid}and${item.size}`).html(`$${item.total}`);
			});

            $('#totalCost').html(
                data.data.totalPrice
            )
        }

        // toastMessage('Cart', 'success', 'Cập nhật giỏ hàng thành công!');
    });
});