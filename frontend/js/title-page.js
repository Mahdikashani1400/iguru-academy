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
        ><span class="location-space fs-5">></span
        ><a href="" class="nav-link position-relative active"
          >${title}</a
        >
      </ul>
    </div>
  </div>`;
  }
}
export { getPoster };
