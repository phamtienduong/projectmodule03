import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './Product.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


export default function Products() {
  // dùng để chuyển trang
  const navigate = useNavigate()
  // lưu sản phẩm
  const [products, setProducts] = useState([]);
  // số trang
  const [productTotal, setProductTotal] = useState(0)
  // trang hiện tại
  const [currentPage, setCurrentPage] = useState(1)
  // số sp trong một trang
  const [pageSize, setPageSize] = useState(6)


  // vẽ danh sách các trang
  const renderPage = () => {
    // mảng lưu kết quả giao diện dùng để vẽ
    const page = []
    // lặp qua số trang để vẽ
    for (let i = 0; i < productTotal; i++) {
      page.push(
        <a
          key={i}
          href="#"
          aria-current="page"
          className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${(i + 1) == currentPage ? "bg-indigo-600" : "white"}
              ${(i + 1) == currentPage ? "text-white" : "text-black"}
              `}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </a>
      )
    }
    return page
  }

  // đánh dấu trang hiện tại
  const handleUpDownPage = (status) => {
    // status quyết định lên trang hay lùi trang
    switch (status) {
      // 0 là lùi
      case 0:
        if (currentPage == 1) {
          setCurrentPage(productTotal)
        } else {
          setCurrentPage(currentPage - 1)
        }
        break
      // 1 là tăng
      case 1:
        if (currentPage == productTotal) {
          setCurrentPage(1)
        } else {
          setCurrentPage(currentPage + 1)
        }
        break
    }
  }

  useEffect(() => {
    // lấy thông tin tất cả product
    fetch("http://localhost:8080/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        // tính toán sản phẩm cần có trong trang hiện tại
        const start = (currentPage - 1) * pageSize
        let end = (start) + pageSize

        if (end > data.length) {
          end = data.length
        }

        // mảng lưu sản phẩm sẽ in ra
        const newProducts = []
        // vòng lặp để lấy phần tử
        data.forEach((item, index) => {
          if (index >= start && index < end) {
            newProducts.push(item)
          }
        });
        setProducts([...newProducts]);
        setProductTotal(Math.ceil(data.length / pageSize))
      })
  }, [currentPage])

  // chọn sản phẩm để chuyển trang
  const handleClickProduct = (id) => {
    // lưu thông tin id sp lên local
    localStorage.setItem("idProductDetail", id)
    // chuyển trang
    navigate(`/productDetail/${id}`)
  }
  return (
    <div>
      <div className='collection-body'>
        {products.map((item) => (
          <div className="product-item" key={item.productId}>
            <div className="product-img" onClick={() => handleClickProduct(item.productId)}>
              <a ><img src={item.image} alt="img" /></a>
            </div>
            <div className="product-detail font-sans">
              <h3><a>{item.nameProduct}</a></h3>
            </div>
            <div className="box-pro-prices">
              <span>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>
        ))}
      </div>
      <div >
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>

            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  onClick={() => handleUpDownPage(0)}
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {renderPage()}
                <a
                  onClick={() => handleUpDownPage(1)}
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}
