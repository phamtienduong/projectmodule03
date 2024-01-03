import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div>
     <footer className="text-center text-lg-start text-white" style={{backgroundColor: '#45526e'}}>
  {/* Grid container */}
  <div className="container p-4 pb-0">
    {/* Section: Links */}
    <section>
      {/*Grid row*/}
      <div className="row">
        {/* Grid column */}
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">
            Truy cập nhanh
          </h6>
          <p>
            Trang chủ
          </p>
          <p>Giới thiệu </p>
          <p>Trung tâm trợ giúp</p>
        </div>
        {/* Grid column */}
        <hr className="w-100 clearfix d-md-none" />
        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Về HIME’S Blog</h6>
          <p>
            <a className="text-white">Tuyển dụng</a>
          </p>
          <p>
            <a className="text-white">Điều khoản dịch vụ </a>
          </p>
          <p>
            <a className="text-white">Chính sách bảo mật</a>
          </p>
          <p>
            <a className="text-white">Quy trình giải quyết khiếu nại</a>
          </p>
        </div>
        {/* Grid column */}
        <hr className="w-100 clearfix d-md-none" />
        {/* Grid column */}
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">
            Về sản phẩm
          </h6>
          <p>
            <a className="text-white">Hướng dẫn mua hàng</a>
          </p>
          <p>
            <a className="text-white">Giao hàng &amp; Nhận hàng</a>
          </p>
          <p>
            <a className="text-white">Hướng dẫn đổi trả hàng</a>
          </p>
        </div>
        {/* Grid column */}
        <hr className="w-100 clearfix d-md-none" />
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Liên hệ</h6>
          <p><i className="fas fa-home mr-3" /> Hotline &amp; chat trực tuyến (24/7)</p>
          <p><i className="fas fa-envelope mr-3" /> himecskh@stripe-vn.com</p>
          <p><i className="fas fa-phone mr-3" /> + 024 6259 1551</p>
          <p><i className="fas fa-print mr-3" /> + 0987 769 594</p>
        </div>
        {/* Grid column */}
      </div>
      {/*Grid row*/}
    </section>
    {/* Section: Links */}
    <hr className="my-3" />
    {/* Section: Copyright */}
    <section className="p-3 pt-0">
      <div className="row d-flex align-items-center">
        {/* Grid column */}
        <div className="col-md-7 col-lg-8 text-center text-md-start">
          {/* Copyright */}
          <div className="p-3">
            © 2023 Copyright:
            <a className="text-white" href="#">himevn.com</a>
          </div>
          {/* Copyright */}
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
          {/* Facebook */}
          <a className="btn btn-outline-light btn-floating m-1" role="button"><i className="fab fa-facebook-f" /></a>
          {/* Twitter */}
          <a className="btn btn-outline-light btn-floating m-1" role="button"><i className="fab fa-twitter" /></a>
          {/* Google */}
          <a className="btn btn-outline-light btn-floating m-1" role="button"><i className="fab fa-google" /></a>
          {/* Instagram */}
          <a className="btn btn-outline-light btn-floating m-1" role="button"><i className="fab fa-instagram" /></a>
        </div>
        {/* Grid column */}
      </div>
    </section>
    {/* Section: Copyright */}
  </div>
  {/* Grid container */}
</footer>

    </div>
  )
}
