// $('#pagination').pagination({
//     dataSource: '/products',
//     pageSize: 9,
//     afterPageOnClick: function (event, pageNumber) {
//         loadPage(pageNumber);
//     }
// })

// function loadPage(page) {
//     currentPage = page;
//     $.ajax({
//         url: `../products?page=${page}`,
//         async: false,
//         type: "GET",
//         contentType: "application/x-www-form-urlencoded",
//         datatype: "html",
//         data: { data: data },
//         success: function (response) {
//             console.log(response);
//             // $('#products').replaceWith(response);
//         },
//     })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }