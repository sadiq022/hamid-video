document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value.trim();

    let text =
        `Hello Hamid Video Films 👋%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A`;

    if (date) text += `Wedding Date: ${date}%0A`;
    if (message) text += `Message: ${message}%0A`;

    text += `%0ALooking forward to your response.`;

    const whatsappNumber = "918265993619";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");
});
