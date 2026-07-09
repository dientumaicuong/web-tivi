const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#mainNav");
const bookingForm = document.querySelector("#bookingForm");
const formStatus = document.querySelector("#formStatus");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mainNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get("name") || "quý khách";
  formStatus.textContent = `Cảm ơn ${name}, yêu cầu đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm.`;
  bookingForm.reset();
});
