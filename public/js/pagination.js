/*
 * https://github.com/superRaytin/paginationjs
*/
module.exports = {
    getPagination: function (page, size) {
        const limit = size ? +size : 9;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    },

    getPagingData: function (data, page, limit) {
        const { count: totalItems, rows: items } = data;
        const currentPage = page ? +page: 1;
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, items, totalPages, currentPage };
    }
}