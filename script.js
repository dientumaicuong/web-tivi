const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#mainNav");
const bookingForm = document.querySelector("#bookingForm");
const formStatus = document.querySelector("#formStatus");
const heroImage = document.querySelector(".hero-image");
const navDropdown = document.querySelector(".nav-dropdown");
const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navDropdownToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navDropdown.classList.toggle("is-open");
  navDropdownToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mainNav.classList.remove("is-open");
    navDropdown?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navDropdownToggle?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  if (!navDropdown?.contains(event.target)) {
    navDropdown?.classList.remove("is-open");
    navDropdownToggle?.setAttribute("aria-expanded", "false");
  }
});

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);

  if (bookingForm.dataset.provider === "web3forms") {
    const accessKey = data.get("access_key");

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      formStatus.textContent = "Vui lòng thay access_key của Web3Forms trước khi nhận yêu cầu thật.";
      return;
    }

    formStatus.textContent = "Đang gửi yêu cầu...";

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        window.location.href = "thank-you.html";
        return;
      }

      formStatus.textContent = "Chưa gửi được yêu cầu. Vui lòng gọi hotline hoặc nhắn Zalo.";
    } catch (error) {
      formStatus.textContent = "Không thể kết nối gửi yêu cầu. Vui lòng gọi hotline hoặc nhắn Zalo.";
    }

    return;
  }

  const name = data.get("name") || "quý khách";
  formStatus.textContent = `Cảm ơn ${name}, yêu cầu đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm.`;
  bookingForm.reset();
});

if (heroImage) {
  const heroSlides = [
    "images/mai-cuong-top-banner.png",
    "images/z8024352909546_49ae4108ef6faad20fae824613752418.jpg",
    "images/z8024352919683_2bb963a52c7330b7e9cd8134aacce0bd.jpg",
    "images/hero-tv-repair.png",
    "images/hero-tv-repair - Copy.png",
    "images/ảnh bìa.png",
  ];
  let currentSlide = 0;

  heroSlides.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroImage.classList.add("is-changing");

    setTimeout(() => {
      heroImage.src = heroSlides[currentSlide];
      heroImage.classList.remove("is-changing");
    }, 600);
  }, 5000);
}
