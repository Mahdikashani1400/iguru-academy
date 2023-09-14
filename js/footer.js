function getFooter() {
  const footer = document.querySelector(".page-footer");
  footer.innerHTML = `
  <div class="footer-information container text-center text-md-left my-5">
  <!-- Grid row -->
  <div class="row gy-5">
    <!-- Grid column -->
    <div class="col-lg-3 my-lg-0 mb-3 order-3 order-lg-1 ps-lg-5">
      <!-- Links -->

      <ul
        class="footer-info list-unstyled d-flex flex-column text-end gap-3"
      >
        <li class="pb-2">
          <img
            src="./img/logo_footer.png"
            alt=""
            class="logo-footer"
            style="width: 100px"
          />
        </li>
        <li>
          <span class="text-orange fw-bold">آدرس:</span>
          <span class="footer-address"
            >ایران ،استان خراسان رضوی، مشهدمقدس</span
          >
        </li>
        <li>
          <span class="text-orange fw-bold">ایمیل:</span>
          <span class="footer-email">iguru@mail.com</span>
        </li>
        <li>
          <span class="text-orange fw-bold">تلفن:</span>
          <span class="footer-phone">02112345678</span>
        </li>
        <li class="d-flex gap-4 footer-contact">
          <i class="fab fa-twitter"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-linkedin-in"></i>
        </li>
      </ul>
    </div>
    <!-- Grid column -->

    <!-- Grid column -->
    <div class="col-lg-3 col-md-6 my-lg-0 mb-3 order-2 order-md-1">
      <!-- Links -->
      <h4 class="text-uppercase pb-4 text-end">دوره های محبوب</h4>

      <ul
        class="footer-courses list-unstyled d-flex flex-column text-end"
      >
        <li>
          <a href="#!" class="under__line-animate position-relative"
            >طراحی UI/Ux</a
          >
        </li>
        <li>
          <a href="#!" class="under__line-animate position-relative"
            >توسعه وردپرس</a
          >
        </li>
        <li>
          <a href="#!" class="under__line-animate position-relative"
            >استراژی کسب و کار</a
          >
        </li>
        <li>
          <a href="#!" class="under__line-animate position-relative"
            >توسعه نرم افزار</a
          >
        </li>
        <li>
          <a href="#!" class="under__line-animate position-relative"
            >کسب و کار انگلیسی</a
          >
        </li>
      </ul>
    </div>
    <!-- Grid column -->
    <div
      class="col-lg-6 col-md-6 my-lg-0 mt-3 order-1 order-md-2 order-lg-3 d-flex flex-column"
    >
      <!-- Content -->
      <h4 class="text-uppercase text-end">ما اینجا هستیم</h4>
      <img
        src="./img/map.jpg"
        alt=""
        class="rounded rounded-3 mt-4 map-footer"
        style="max-width: 570px"
      />
    </div>
    <!-- Grid column -->

    <!-- Grid column -->
  </div>
  <!-- Grid row -->
</div>
<!-- Footer Links -->

<!-- Copyright -->
<div class="footer-copyright text-end bg-black py-3">
  کپی رایت © 1398 تک ستاره وب. تمامی حقوق محفوظ است.
</div>
<!-- Copyright -->`;
}
export { getFooter };
