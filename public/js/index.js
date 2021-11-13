// document.querySelectorAll('.dropdown > a').forEach(e => {
//     e.addEventListener('click', (event) => event.preventDefault())
// })

// document.querySelectorAll('.mega-dropdown > a').forEach(e => {
//     e.addEventListener('click', (event) => event.preventDefault())
// })

// document.querySelector('#mb-menu-toggle').addEventListener('click', () => document.querySelector('#header-wrapper').classList.add('active'))
// document.querySelector('#mb-menu-close').addEventListener('click', () => document.querySelector('#header-wrapper').classList.remove('active'))

let products = [
    {
        name: 'JBL E55BT KEY BLACK',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL JR 310BT',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL TUNE 750BTNC',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL Horizon',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL Tune 220TWS',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'UA Project Rock',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
    {
        name: 'JBL Endurance SPRINT',
        image1: '/images/sneakers/s21.jpg',
        image2: '/images/sneakers/s01.jpg',
        old_price: '400',
        curr_price: '300'
    },
]

let best_product_list = document.querySelector('#best-products')
let latest_product_list = document.querySelector('#latest-products')

products.forEach(e => {
    let prod = `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product-card">
                <div class="product-card-img">
                    <img src="${e.image1}" alt="">
                    <img src="${e.image2}" alt="">
                </div>
                <div class="product-card-info">
                    <div class="product-btn">
                    
                    <a href="./product-detail" class="btn-flat btn-hover btn-shop-now">shop now</a>
                        <button class="btn-flat btn-hover btn-cart-add">
                                <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="btn-flat btn-hover btn-cart-add">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="product-card-name">
                        ${e.name}
                    </div>
                    <div class="product-card-price">
                        <span><del>$${e.old_price}</del></span>
                        <span class="curr-price">$${e.curr_price}</span>
                    </div>
                </div>
            </div>
        </div>
    `

    latest_product_list.insertAdjacentHTML("beforeend", prod)
    best_product_list.insertAdjacentHTML("afterbegin", prod)
})

// // Product
// let product_list = document.querySelector('#products')

// renderProducts = (products) => {
//     products.forEach(e => {
//         let prod = `
//             <div class="col-lg-4 col-md-6 col-sm-12">
//                 <div class="product-card">
//                     <div class="product-card-img">
//                         <img src="${e.image1}" alt="">
//                         <img src="${e.image2}" alt="">
//                     </div>
//                     <div class="product-card-info">
//                         <div class="product-btn">
//                             <a href="./product-detail" class="btn-flat btn-hover btn-shop-now">shop now</a>
//                             <button class="btn-flat btn-hover btn-cart-add">
//                             <i class="fas fa-shopping-cart"></i>
//                     </button>
//                     <button class="btn-flat btn-hover btn-cart-add">
//                         <i class="fas fa-heart"></i>
//                     </button>
//                         </div>
//                         <div class="product-card-name">
//                             ${e.name}
//                         </div>
//                         <div class="product-card-price">
//                             <span><del>$${e.old_price}</del></span>
//                             <span class="curr-price">$${e.curr_price}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//         product_list.insertAdjacentHTML("beforeend", prod)
//     })
// }

// renderProducts(products)
// renderProducts(products)

// let filter_col = document.querySelector('#filter-col')

// document.querySelector('#filter-toggle').addEventListener('click', () => filter_col.classList.toggle('active'))

// document.querySelector('#filter-close').addEventListener('click', () => filter_col.classList.toggle('active'))


// // product-detail
// document.querySelectorAll('.product-img-item').forEach(e => {
//     e.addEventListener('click', () => {
//         let img = e.querySelector('img').getAttribute('src')
//         document.querySelector('#product-img > img').setAttribute('src', img)
//     })
// })

// document.querySelector('#view-all-description').addEventListener('click', () => {
//     let content = document.querySelector('.product-detail-description-content')
//     content.classList.toggle('active')
//     document.querySelector('#view-all-description').innerHTML = content.classList.contains('active') ? 'view less' : 'view all'
// })

// let relate_product_list = document.querySelector('#related-products')

// renderProducts = (products) => {
//     products.forEach(e => {
//         let prod = `
//             <div class="col-lg-4 col-md-6 col-sm-12">
//                 <div class="product-card">
//                     <div class="product-card-img">
//                         <img src="${e.image1}" alt="">
//                         <img src="${e.image2}" alt="">
//                     </div>
//                     <div class="product-card-info">
//                         <div class="product-btn">
//                             <a href="./product-detail" class="btn-flat btn-hover btn-shop-now">shop now</a>
//                             <button class="btn-flat btn-hover btn-cart-add">
//                                 <i class='bx bxs-cart-add'></i>
//                             </button>
//                             <button class="btn-flat btn-hover btn-cart-add">
//                                 <i class='bx bxs-heart'></i>
//                             </button>
//                         </div>
//                         <div class="product-card-name">
//                             ${e.name}
//                         </div>
//                         <div class="product-card-price">
//                             <span><del>$${e.old_price}</del></span>
//                             <span class="curr-price">$${e.curr_price}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//         relate_product_list.insertAdjacentHTML("beforeend", prod)
//     })
// }

// renderProducts(products)