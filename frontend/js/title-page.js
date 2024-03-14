function getPoster(title, src) {
  let description = document.querySelector(".description");
  description.style.backgroundImage = `url(img/bg/${src})`;
  if (title) {
    description.innerHTML = `
  <div class="description__bg"></div>
  <div
    class="container-fluid align-items-lg-center content-space-t-5 content-space-lg-5 min-vh-lg-50 text-white justify-content-center col-9 w-100"
  >
    <div class="description__title text-center">
      <div class="description__title-h display-4">${title}</div>
    </div>
    <div class="description__location pt-4">
      <ul
        class="location-items navbar-nav mx-auto h-100 flex-row justify-content-center align-items-center gap-3"
      >
        <a href="index.html" class="nav-link position-relative">صفحه اصلی</a
        ><span class="location-space fs-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
        </span
        ><a href="" class="nav-link position-relative active"
          >${title}</a
        >
      </ul>
    </div>
  </div>`;
  }
}
export { getPoster };
