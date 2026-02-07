const PER_PAGE = 9;

let currentPage = 1;
let currentImageIndex = 0;

const grid = document.getElementById("galleryGrid");
const items = Array.from(document.querySelectorAll(".gallery-item"));

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox-close");
const prevImgBtn = document.querySelector(".lightbox-nav.prev");
const nextImgBtn = document.querySelector(".lightbox-nav.next");

/* PAGINATION */
function renderGallery() {
    items.forEach(item => item.style.display = "none");

    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    items.slice(start, end).forEach(item => {
        item.style.display = "block";
    });

    const totalPages = Math.ceil(items.length / PER_PAGE);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/* LIGHTBOX */
function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = "flex";
    updateLightbox();
}

function updateLightbox() {
    const img = items[currentImageIndex].querySelector("img");
    lightboxImage.src = img.src;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % items.length;
    updateLightbox();
}

function prevImage() {
    currentImageIndex =
        (currentImageIndex - 1 + items.length) % items.length;
    updateLightbox();
}

/* EVENTS */
items.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
});

prevBtn.onclick = () => { currentPage--; renderGallery(); };
nextBtn.onclick = () => { currentPage++; renderGallery(); };

closeBtn.onclick = closeLightbox;
nextImgBtn.onclick = nextImage;
prevImgBtn.onclick = prevImage;

document.addEventListener("keydown", e => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
});

/* INIT */
renderGallery();
