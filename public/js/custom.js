//const pageItems = $('.pagination>li.page-item');
const pageLinks = $('.pagination>li.page-item>.page-link');
const pagePrev = $('#dataTable_previous');
const pageNext = $('#dataTable_next');
const selectSize = $('select[name="dataTable_length"]');
const searchForm = $('form[class="search"]');
console.log(searchForm);

// Paginate
pageLinks.on('click', (event) => {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    event.target.href = updateQueryStringParameter(event.target.baseURI, 'page', page);
    window.location = event.target.href;
});

function updatePaginate(totalPages, currentPage) {
    $(`.page-link[data-page=${currentPage}]`).parent('li').addClass('active');

    if (currentPage < 2 || isNaN(totalPages)) {
        pagePrev.addClass('disabled');
    };
    if (currentPage > totalPages - 1 || isNaN(totalPages)) {
        pageNext.addClass('disabled');
    };
}

// Choose size
selectSize.on('change', function (event) {
    const url = updateQueryStringParameter(this.parentNode.baseURI, 'size', this.value);
    window.location = url;
});

function updateSelectSize(totalPages, totalItems) {
    let size;
    const temp = totalItems / totalPages;
    if (temp < 11) {
        size = 10;
    }
    else if (temp < 26) {
        size = 25;
    } else if (temp < 51) {
        size = 50
    }
    else if (temp < 101) {
        size = 100;
    }

    selectSize.val(size);
}

// Search
searchForm.on('submit', function (event) {
    event.preventDefault();
    const url = updateQueryStringParameter(event.target.baseURI, 'term', $('input[class="search-box"]').val());
    window.location = url;
})

function updateQueryStringParameter(uri, key, value) {
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}