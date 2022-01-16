let currId;

$(document).ready(function () {
    const deleteForm = document.forms['delete-product-form'];

    // delete
    $('.remove-from-wishlist').click(function () {
        currId = $(this).attr('name');
    });

    // confirm delete
    $('#btn-delete-product').click(function () {
        deleteForm.action = '/wishlist/' + currId + '/' + '?_method=DELETE';
        deleteForm.submit();
    });
}) 
