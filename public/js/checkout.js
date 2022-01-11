$(document).ready(function () {
    const checkoutForm = document.forms['checkoutForm'];

    $('#btn-proceed-order').click(function (e) {
        e.preventDefault();
        checkoutForm.action = '/checkout/' + $(this).attr('order') + '?_method=DELETE';
        checkoutForm.submit();
    })
})
