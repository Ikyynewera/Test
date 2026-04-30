window.onload = function () {

    // =========================
    // HALAMAN 1 (LOGIN)
    // =========================
    const authCard = document.getElementById("authCard");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");
    const hintText = document.getElementById("hintText");
    const toggleBtn = document.getElementById("toggleBtn");

    const userInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("key");

    const popup = document.getElementById("popupOverlay");
    const popupOk = document.getElementById("popupOk");

    const passError = document.getElementById("passError");

    // =========================
    // HALAMAN 2
    // =========================
    const nextPage = document.getElementById("nextPage");
    const confirmBtn = document.getElementById("confirmBtn");

    const nameInput = document.getElementById("nameInput");
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");
    const dateSelect = document.getElementById("dateSelect");
    const roleSelect = document.getElementById("roleSelect");

    // =========================
    // HALAMAN 3
    // =========================
    const page3 = document.getElementById("page3");

    const helloText = document.getElementById("helloText");
    const roleMini = document.getElementById("roleMini");
    const expMini = document.getElementById("expMini");

    const profileName = document.getElementById("profileName");
    const profileRole = document.getElementById("profileRole");
    const profileExp = document.getElementById("profileExp");

    // Navbar page3
    const navHome = document.getElementById("navHome");
    const navWhatsapp = document.getElementById("navWhatsapp");
    const navTools = document.getElementById("navTools");
    const navSender = document.getElementById("navSender");
    const navSettings = document.getElementById("navSettings");

    // Konten page3
    const homeContent = document.getElementById("homeContent");
    const whatsappContent = document.getElementById("whatsappContent");
    const toolsContent = document.getElementById("toolsContent");
    const senderContent = document.getElementById("senderContent");
    const settingsContent = document.getElementById("settingsContent");

    // =========================
    // WHATSAPP MENU (BUG NOMOR / BUG GROUP)
    // =========================
    const tabBugNomor = document.getElementById("tabBugNomor");
    const tabBugGroup = document.getElementById("tabBugGroup");

    const bugNomorBox = document.getElementById("bugNomorBox");
    const bugGroupBox = document.getElementById("bugGroupBox");

    // Tombol kirim (visual)
    const sendWaBtn = document.getElementById("sendWaBtn");
    const sendGroupBtn = document.getElementById("sendGroupBtn");

    // =========================
    // POPUP VISUAL SEND
    // =========================
    const sendPopup = document.getElementById("sendPopup");
    const sendTitle = document.getElementById("sendTitle");
    const sendDesc = document.getElementById("sendDesc");
    const sendOk = document.getElementById("sendOk");

    // =========================
    // CONTACT PAGE
    // =========================
    const contactPage = document.getElementById("contactPage");
    const openContactBtn = document.getElementById("openContactBtn");
    const backHomeBtn = document.getElementById("backHomeBtn");

    const waContact2 = document.getElementById("waContact2");
    const tgContact2 = document.getElementById("tgContact2");

    // Data contact
    const myNumber = "6282315673352";
    const message = "list";

    // Mode register/login
    let isRegisterMode = false;
    let lastPopupAction = "";

    // =========================
    // FUNCTION POPUP LOGIN
    // =========================
    function showPopup(title, desc) {
        document.querySelector(".popup-title").innerHTML = title;
        document.querySelector(".popup-desc").innerText = desc;
        popup.style.display = "flex";
    }

    function showPassError(msg) {
        if (passError) {
            passError.innerText = msg;
        }
    }

    function clearPassError() {
        if (passError) passError.innerText = "";
    }

    // =========================
    // VALIDASI PASSWORD
    // =========================
    function isEasyPassword(password) {
        const easyPasswords = [
            "12345678", "123456789", "1234567890",
            "11111111", "00000000", "87654321",
            "password", "qwerty123", "asdfghjkl",
            "iloveyou", "admin123", "adminadmin"
        ];

        if (easyPasswords.includes(password.toLowerCase())) return true;

        // angka semua
        if (/^[0-9]+$/.test(password)) return true;

        // urutan naik
        if (password.includes("12345678")) return true;

        // urutan turun
        if (password.includes("87654321")) return true;

        return false;
    }

    // =========================
    // SWITCH LOGIN / REGISTER
    // =========================
    toggleBtn.onclick = function () {
        isRegisterMode = !isRegisterMode;

        authCard.classList.add("fade");
        setTimeout(() => authCard.classList.remove("fade"), 400);

        clearPassError();

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

    // =========================
    // DATABASE SIMULASI LOCAL
    // =========================
    function saveAccount(username, email, password) {
        const data = {
            username: username,
            email: email,
            password: password
        };
        localStorage.setItem("userAccount", JSON.stringify(data));
    }

    function getAccount() {
        const data = localStorage.getItem("userAccount");
        if (!data) return null;
        return JSON.parse(data);
    }

    // =========================
    // SUBMIT LOGIN / REGISTER
    // =========================
    submitBtn.onclick = function () {
        const userValue = userInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passValue = passInput.value.trim();

        clearPassError();

        if (userValue === "" || emailValue === "" || passValue === "") {
            showPassError("Username, Email, dan Password wajib diisi!");
            return;
        }

        if (!emailValue.includes("@")) {
            showPassError("Email tidak valid!");
            return;
        }

        if (passValue.length < 8) {
            showPassError("Password harus minimal 8 karakter!");
            return;
        }

        if (isEasyPassword(passValue)) {
            showPassError("Password terlalu mudah! Buat yang lebih sulit.");
            return;
        }

        submitBtn.innerText = "WAIT...";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.disabled = false;

            // REGISTER
            if (isRegisterMode) {
                saveAccount(userValue, emailValue, passValue);

                submitBtn.innerText = "CREATE";
                showPopup("Akun <span>Dibuat</span>", "Akun berhasil dibuat. Silahkan login dulu.");
                lastPopupAction = "register";
            }

            // LOGIN
            else {
                const acc = getAccount();

                if (!acc) {
                    submitBtn.innerText = "AUTHORIZE";
                    showPassError("Belum ada akun. Silahkan Create Identity dulu.");
                    return;
                }

                if (emailValue !== acc.email || passValue !== acc.password) {
                    submitBtn.innerText = "AUTHORIZE";
                    showPassError("Email atau Password salah!");
                    return;
                }

                submitBtn.innerText = "AUTHORIZE";
                showPopup("Login <span>Berhasil</span>", "Selamat datang kembali.");
                lastPopupAction = "login";
            }

        }, 1200);
    };

    // =========================
    // POPUP OK
    // =========================
    popupOk.onclick = function () {
        popup.style.display = "none";

        // Kalau REGISTER: jangan pindah halaman, suruh login dulu
        if (lastPopupAction === "register") {
            isRegisterMode = false;

            formTitle.innerHTML = "DJAVUE <span>DEV</span>";
            submitBtn.innerText = "AUTHORIZE";
            hintText.innerText = "New user?";
            toggleBtn.innerText = "Create Identity";
            passInput.placeholder = "Password";

            return;
        }

        // Kalau LOGIN sukses: masuk halaman 2
        if (lastPopupAction === "login") {
            authCard.style.display = "none";
            nextPage.style.display = "flex";
        }
    };

    // =========================
    // POPUP VISUAL SEND
    // =========================
    function showSendPopup(title, desc) {
        sendTitle.innerText = title;
        sendDesc.innerText = desc;
        sendPopup.style.display = "flex";
    }

    sendOk.onclick = function () {
        sendPopup.style.display = "none";
    };

    // =========================
    // HALAMAN 2 CONFIRM -> PAGE 3
    // =========================
    confirmBtn.onclick = function () {
        const name = nameInput.value.trim();
        const year = yearSelect.value;
        const month = monthSelect.value;
        const date = dateSelect.value;
        const role = roleSelect.value;

        if (name === "" || year === "" || month === "" || date === "" || role === "") {
            showSendPopup("Gagal", "Harap isi semua pilihan dulu!");
            return;
        }

        confirmBtn.innerText = "WAIT...";
        confirmBtn.disabled = true;

        setTimeout(() => {
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Konfirmasi";

            // Isi data halaman 3
            helloText.innerText = "Halo, " + name;

            roleMini.innerText = role;
            expMini.innerText = "Exp: " + date + " " + month + " " + year;

            profileName.innerText = name;
            profileRole.innerText = "Role: " + role;
            profileExp.innerText = "Exp: " + date + " " + month + " " + year;

            // pindah halaman
            nextPage.style.display = "none";
            page3.style.display = "flex";

            showSection("home");
        }, 900);
    };

    // =========================
    // SHOW SECTION PAGE3
    // =========================
    function showSection(section) {
        homeContent.style.display = "none";
        whatsappContent.style.display = "none";
        toolsContent.style.display = "none";
        senderContent.style.display = "none";
        settingsContent.style.display = "none";

        navHome.classList.remove("active");
        navWhatsapp.classList.remove("active");
        navTools.classList.remove("active");
        navSender.classList.remove("active");
        navSettings.classList.remove("active");

        if (section === "home") {
            homeContent.style.display = "block";
            navHome.classList.add("active");
        }

        if (section === "whatsapp") {
            whatsappContent.style.display = "block";
            navWhatsapp.classList.add("active");
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

    // Navbar click
    navHome.onclick = () => showSection("home");
    navWhatsapp.onclick = () => showSection("whatsapp");
    navTools.onclick = () => showSection("tools");
    navSender.onclick = () => showSection("sender");
    navSettings.onclick = () => showSection("settings");

    // =========================
    // TAB BUG NOMOR / BUG GROUP
    // =========================
    tabBugNomor.onclick = function () {
        tabBugNomor.classList.add("active");
        tabBugGroup.classList.remove("active");

        bugNomorBox.style.display = "block";
        bugGroupBox.style.display = "none";
    };

    tabBugGroup.onclick = function () {
        tabBugGroup.classList.add("active");
        tabBugNomor.classList.remove("active");

        bugNomorBox.style.display = "none";
        bugGroupBox.style.display = "block";
    };

    // =========================
    // SEND BUTTON VISUAL (BOONGAN)
    // =========================
    sendWaBtn.onclick = function () {
        const num = document.getElementById("waNumber").value.trim();
        const opt = document.getElementById("waOption").value;

        if (num.length < 10) {
            showSendPopup("Gagal", "Nomor target wajib diisi!");
            return;
        }

        if (opt === "") {
            showSendPopup("Gagal", "Harap pilih bug dulu!");
            return;
        }

        sendWaBtn.innerText = "WAIT...";
        sendWaBtn.disabled = true;

        setTimeout(() => {
            sendWaBtn.disabled = false;
            sendWaBtn.innerText = "Kirim";
            showSendPopup("Sukses", "Berhasil mengirim bug ke nomor (visual / boongan)");
        }, 1200);
    };

    sendGroupBtn.onclick = function () {
        const link = document.getElementById("groupLink").value.trim();
        const opt = document.getElementById("groupOption").value;

        if (link === "") {
            showSendPopup("Gagal", "Link group wajib diisi!");
            return;
        }

        if (opt === "") {
            showSendPopup("Gagal", "Harap pilih bug dulu!");
            return;
        }

        sendGroupBtn.innerText = "WAIT...";
        sendGroupBtn.disabled = true;

        setTimeout(() => {
            sendGroupBtn.disabled = false;
            sendGroupBtn.innerText = "Kirim";
            showSendPopup("Sukses", "Berhasil mengirim bug ke group (visual / boongan)");
        }, 1200);
    };

    // =========================
    // SETTINGS -> CONTACT PAGE
    // =========================
    openContactBtn.onclick = function () {
        page3.style.display = "none";
        contactPage.style.display = "flex";
    };

    backHomeBtn.onclick = function () {
        contactPage.style.display = "none";
        page3.style.display = "flex";
        showSection("settings");
    };

    // =========================
    // CONTACT LINK
    // =========================
    waContact2.onclick = function (e) {
        e.preventDefault();
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    tgContact2.onclick = function (e) {
        e.preventDefault();
        window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(message)}`, "_blank");
    };

    // =========================
    // BLINK ANIMATION
    // =========================
    function blink() {
        const lids = document.querySelectorAll(".lid");
        lids.forEach(l => l.style.height = "100%");
        setTimeout(() => lids.forEach(l => l.style.height = "0%"), 150);
        setTimeout(blink, Math.random() * 3000 + 2000);
    }
    blink();
};
