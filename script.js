window.onload = function() {
    const authCard = document.getElementById("authCard");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");
    const hintText = document.getElementById("hintText");
    const toggleBtn = document.getElementById("toggleBtn");
    const userInput = document.getElementById("username");
    const passInput = document.getElementById("key");
    const popup = document.getElementById("popupOverlay");

    const nextPage = document.getElementById("nextPage");
    const confirmBtn = document.getElementById("confirmBtn");

    const page3 = document.getElementById("page3");

    const roleText = document.getElementById("roleText");
    const expText = document.getElementById("expText");

    const tabWhatsapp = document.getElementById("tabWhatsapp");
    const tabGroup = document.getElementById("tabGroup");

    const whatsappForm = document.getElementById("whatsappForm");
    const groupForm = document.getElementById("groupForm");

    const navHome = document.getElementById("navHome");
    const navTools = document.getElementById("navTools");
    const navSender = document.getElementById("navSender");
    const navSettings = document.getElementById("navSettings");

    const homeContent = document.getElementById("homeContent");
    const toolsContent = document.getElementById("toolsContent");
    const senderContent = document.getElementById("senderContent");
    const settingsContent = document.getElementById("settingsContent");

    const sendPopup = document.getElementById("sendPopup");
    const sendTitle = document.getElementById("sendTitle");
    const sendDesc = document.getElementById("sendDesc");
    const sendOk = document.getElementById("sendOk");

    const sendWaBtn = document.getElementById("sendWaBtn");
    const sendGroupBtn = document.getElementById("sendGroupBtn");

    // CONTACT BUTTON
    const waContact = document.getElementById("waContact");
    const tgContact = document.getElementById("tgContact");

    const myNumber = "6282315673352";
    const message = "list";

    // FIX: supaya gak crash kalau tombol contact gak ada
    if (waContact) {
        waContact.onclick = function(e) {
            e.preventDefault();
            window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, "_blank");
        };
    }

    if (tgContact) {
        tgContact.onclick = function(e) {
            e.preventDefault();
            window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(message)}`, "_blank");
        };
    }

    let isRegisterMode = false;

    // Switch login/register
    toggleBtn.onclick = function() {
        isRegisterMode = !isRegisterMode;
        authCard.classList.add("fade");
        setTimeout(() => authCard.classList.remove("fade"), 400);

        if (isRegisterMode) {
            formTitle.innerHTML = "CREATE <span>IDENTITY</span>";
            submitBtn.innerText = "CREATE";
            hintText.innerText = "Already user?";
            toggleBtn.innerText = "Authorize";
            passInput.placeholder = "Create Password";
        } else {
            formTitle.innerHTML = "DJAVUE <span>DEV</span>";
            submitBtn.innerText = "AUTHORIZE";
            hintText.innerText = "New user?";
            toggleBtn.innerText = "Create Identity";
            passInput.placeholder = "Password";
        }
    };

    // Login / Register submit
    submitBtn.onclick = function() {
        const userValue = userInput.value.trim();
        const passValue = passInput.value.trim();

        if (userValue === "" || passValue === "") {
            authCard.classList.add("shake");
            setTimeout(() => authCard.classList.remove("shake"), 400);
            return;
        }

        submitBtn.innerText = "WAIT...";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = isRegisterMode ? "CREATE" : "AUTHORIZE";

            showPopup(
                isRegisterMode ? "Akun <span>Dibuat</span>" : "Login <span>Berhasil</span>",
                isRegisterMode ? "Silahkan login menggunakan akun kamu." : "Selamat datang kembali."
            );
        }, 1500);
    };

    function showPopup(title, desc) {
        document.querySelector(".popup-title").innerHTML = title;
        document.querySelector(".popup-desc").innerText = desc;
        popup.style.display = "flex";
    }

    document.getElementById("popupOk").onclick = function() {
        popup.style.display = "none";
        authCard.style.display = "none";
        nextPage.style.display = "flex";
    };

    // Halaman 2 confirm -> pindah ke halaman 3
    confirmBtn.onclick = function() {
        const year = document.getElementById("yearSelect").value;
        const month = document.getElementById("monthSelect").value;
        const date = document.getElementById("dateSelect").value;
        const role = document.getElementById("roleSelect").value;

        if (year === "" || month === "" || date === "" || role === "") {
            showSendPopup("Gagal", "Harap isi semua pilihan dulu!");
            return;
        }

        roleText.innerText = "Role: " + role;
        expText.innerText = "Exp: Aktif sampai " + date + " " + month + " " + year;

        confirmBtn.innerText = "WAIT...";
        confirmBtn.disabled = true;

        setTimeout(() => {
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Konfirmasi";

            nextPage.style.display = "none";
            page3.style.display = "flex";

            showSection("home");
        }, 1500);
    };

    // Tab WhatsApp / Group wa
    tabWhatsapp.onclick = function() {
        tabWhatsapp.classList.add("active");
        tabGroup.classList.remove("active");
        whatsappForm.style.display = "block";
        groupForm.style.display = "none";
    };

    tabGroup.onclick = function() {
        tabGroup.classList.add("active");
        tabWhatsapp.classList.remove("active");
        whatsappForm.style.display = "none";
        groupForm.style.display = "block";
    };

    // Navbar switch section
    navHome.onclick = () => showSection("home");
    navTools.onclick = () => showSection("tools");
    navSender.onclick = () => showSection("sender");
    navSettings.onclick = () => showSection("settings");

    function showSection(section) {
        homeContent.style.display = "none";
        toolsContent.style.display = "none";
        senderContent.style.display = "none";
        settingsContent.style.display = "none";

        navHome.classList.remove("active");
        navTools.classList.remove("active");
        navSender.classList.remove("active");
        navSettings.classList.remove("active");

        if (section === "home") {
            homeContent.style.display = "block";
            navHome.classList.add("active");
        }
        if (section === "tools") {
            toolsContent.style.display = "block";
            navTools.classList.add("active");
        }
        if (section === "sender") {
            senderContent.style.display = "block";
            navSender.classList.add("active");
        }
        if (section === "settings") {
            settingsContent.style.display = "block";
            navSettings.classList.add("active");
        }
    }

    // Popup visual
    function showSendPopup(title, desc) {
        sendTitle.innerText = title;
        sendDesc.innerText = desc;
        sendPopup.style.display = "flex";
    }

    sendOk.onclick = function() {
        sendPopup.style.display = "none";
    };

    // Tombol Kirim WhatsApp (visual)
    sendWaBtn.onclick = function() {
        const num = document.getElementById("waNumber").value.trim();
        const opt = document.getElementById("waOption").value;

        if (num.length < 12) {
            showSendPopup("Gagal", "Nomor wajib minimal 12 digit!");
            return;
        }

        if (opt === "") {
            showSendPopup("Gagal", "Harap pilih pilihan dulu!");
            return;
        }

        sendWaBtn.innerText = "WAIT...";
        sendWaBtn.disabled = true;

        setTimeout(() => {
            sendWaBtn.disabled = false;
            sendWaBtn.innerText = "Kirim";
            showSendPopup("Sukses", "Berhasil mengirim ke WhatsApp (visual)");
        }, 1200);
    };

    // Tombol Kirim Group (visual)
    sendGroupBtn.onclick = function() {
        const link = document.getElementById("groupLink").value.trim();
        const opt = document.getElementById("groupOption").value;

        if (link === "") {
            showSendPopup("Gagal", "Link group wajib diisi!");
            return;
        }

        if (opt === "") {
            showSendPopup("Gagal", "Harap pilih pilihan dulu!");
            return;
        }

        sendGroupBtn.innerText = "WAIT...";
        sendGroupBtn.disabled = true;

        setTimeout(() => {
            sendGroupBtn.disabled = false;
            sendGroupBtn.innerText = "Kirim";
            showSendPopup("Sukses", "Berhasil mengirim ke Group WA (visual)");
        }, 1200);
    };

    // Animasi Mata Otomatis
    function blink() {
        const lids = document.querySelectorAll(".lid");
        lids.forEach(l => l.style.height = "100%");
        setTimeout(() => lids.forEach(l => l.style.height = "0%"), 150);
        setTimeout(blink, Math.random() * 3000 + 2000);
    }
    blink();
};
