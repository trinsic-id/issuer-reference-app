async function submit() {
    const bizCard = {
        name: document.getElementById("name").value,
        title: document.getElementById("title").value,
        org: document.getElementById("organization").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    }
    console.log(bizCard)
    openModal();
    hideQRCode();
    showSpinner();
    axios.post('/api/issue', bizCard).then((response) => {
        console.log(response);
        let inviteURL = "https://web.cloud.streetcred.id/link/?c_i=" + response.data.invite_url;
        setQRCodeImage(inviteURL);
        hideSpinner();
        showQRCode();
    });
}

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function hideQRCode() {
    let qrImage = document.getElementsByClassName("qr-image")[0];
    if (qrImage) {
        qrImage.remove();
    }
    qr.style.display = "none";
}

function showQRCode() {
    qr.style.display = "block";
}

function setQRCodeImage(url) {
    let svgElement = document.createElement("div");
    let s = QRCode.generateSVG(url, {
        ecclevel: "M",
        fillcolor: "#FFFFFF",
        textcolor: "#373737",
        margin: 4,
        modulesize: 8,
    });
    s.classList.add("qr-image");
    svgElement.appendChild(s);
    qr.appendChild(s);
}

function hideSpinner() {
    spinner.style.display = "none";
}

function showSpinner() {
    spinner.style.display = "block";
}
