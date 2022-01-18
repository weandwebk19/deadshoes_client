$(document).ready(function () {
    const checkoutForm = document.forms['checkoutForm'];

    $('#btn-proceed-order').click(function (e) {
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const address = $('#address').val();

        if (!name || !email || !phone || !address) {
            alert("Please fill out the receiver's informations");
        } else {
            e.preventDefault();
            checkoutForm.action = '/checkout/' + $(this).attr('order') + '?_method=DELETE';
            checkoutForm.submit();
        }
    })
})
