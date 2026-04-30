window.onload = function () {

    // =========================
    // HALAMAN 1 (LOGIN / REGISTER)
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

    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");
    const dateSelect = document.getElementById("dateSelect");
    const roleSelect = document.getElementById("roleSelect");

    const nameInput = document.getElementById("nameInput"); // dari HTML kamu

    // =========================
    // HALAMAN 3
    // =========================
    const page3 = document.getElementById("page3");

    // Header mini status
    const helloText = document.getElementById("helloText");
    const roleMini = document.getElementById("roleMini");
    const expMini = document.getElementById("expMini");

    // Profile card
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
    // TAB BUG NOMOR / BUG GROUP (MENU WHATSAPP)
    // =========================
    const tabBugNomor = document.getElementById("tabBugNomor");
    const tabBugGroup = document.getElementById("tabBugGroup");

    const bugNomorBox = document.getElementById("bugNomorBox");
    const bugGroupBox = document.getElementById("bugGroupBox");

    // Tombol kirim (visual)
    const sendWaBtn = document.getElementById("sendWaBtn");
    const sendGroupBtn = document.getElementById("sendGroupBtn");

    // Popup visual send
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

    const myNumber = "6282315673352";
    const message = "list";

    // =========================
    // MODE LOGIN / REGISTER
    // =========================
    let isRegisterMode = false;
    let lastPopupAction = "";

    // =========================
    // POPUP FUNCTION
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
    // VALIDASI PASSWORD SUPER KETAT
    // =========================
    function isStrongPassword(password, username, email) {
        if (password.length < 8) return false;

        // harus ada huruf besar, huruf kecil, angka
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        // harus ada simbol
        const hasSymbol = /[^A-Za-z0-9]/.test(password);

        if (!hasUpper || !hasLower || !hasNumber || !hasSymbol) return false;

        // jangan sama dengan username/email
        if (username && password.toLowerCase().includes(username.toLowerCase())) return false;
        if (email && password.toLowerCase().includes(email.toLowerCase().split("@")[0])) return false;

        // blacklist password umum
        const blacklist = [
            "12345678", "123456789", "1234567890",
            "11111111", "00000000", "87654321",
            "password", "qwerty", "qwerty123",
            "admin123", "adminadmin", "iloveyou",
            "sayang", "anjay", "kontol", "bismillah",
            "asdfghjkl", "zxcvbnm"
        ];

        if (blacklist.includes(password.toLowerCase())) return false;

        // kalau cuma angka semua
        if (/^[0-9]+$/.test(password)) return false;

        // pola urutan naik
        if (password.includes("1234") || password.includes("2345") || password.includes("3456") || password.includes("4567")) {
            return false;
        }

        // pola urutan turun
        if (password.includes("9876") || password.includes("8765") || password.includes("7654") || password.includes("6543")) {
            return false;
        }

        // karakter sama berulang (aaaaaaa / 111111)
        if (/^(.)\1+$/.test(password)) return false;

        return true;
    }

    function passwordRulesText() {
        return "Password harus minimal 8 karakter + ada Huruf BESAR, huruf kecil, angka, dan simbol. Tidak boleh gampang ditebak.";
    }

    // =========================
    // DATABASE LOCALSTORAGE (SIMULASI)
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

        if (!emailValue.includes("@") || emailValue.length < 6) {
            showPassError("Email tidak valid!");
            return;
        }

        // REGISTER MODE
        if (isRegisterMode) {

            if (!isStrongPassword(passValue, userValue, emailValue)) {
                showPassError(passwordRulesText());
                return;
            }

            submitBtn.innerText = "WAIT...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = "CREATE";

                saveAccount(userValue, emailValue, passValue);

                showPopup("Akun <span>Dibuat</span>", "Akun berhasil dibuat. Sekarang login dulu.");
                lastPopupAction = "register";
            }, 1200);

            return;
        }

        // LOGIN MODE
        else {
            const acc = getAccount();

            if (!acc) {
                showPassError("Belum ada akun. Silahkan Create Identity dulu.");
                return;
            }

            if (emailValue !== acc.email || passValue !== acc.password) {
                showPassError("Email atau Password salah!");
                return;
            }

            submitBtn.innerText = "WAIT...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = "AUTHORIZE";

                showPopup("Login <span>Berhasil</span>", "Selamat datang kembali.");
                lastPopupAction = "login";
            }, 1000);
        }
    };

    // =========================
    // POPUP OK BUTTON
    // =========================
    popupOk.onclick = function () {
        popup.style.display = "none";

        // Kalau REGISTER: jangan pindah halaman, balik ke login
        if (lastPopupAction === "register") {
            isRegisterMode = false;

            formTitle.innerHTML = "DJAVUE <span>DEV</span>";
            submitBtn.innerText = "AUTHORIZE";
            hintText.innerText = "New user?";
            toggleBtn.innerText = "Create Identity";
            passInput.placeholder = "Password";

            clearPassError();
            return;
        }

        // Kalau LOGIN sukses: pindah ke halaman 2
        if (lastPopupAction === "login") {
            authCard.style.display = "none";
            nextPage.style.display = "flex";
        }
    };

    // =========================
    // HALAMAN 2 CONFIRM -> PAGE 3
    // =========================
    confirmBtn.onclick = function () {

        const year = yearSelect.value;
        const month = monthSelect.value;
        const date = dateSelect.value;
        const role = roleSelect.value;
        const nameValue = nameInput.value.trim();

        // VALIDASI: kalau belum lengkap jangan disable tombol
        if (nameValue === "") {
            showSendPopup("Gagal", "Nama wajib diisi!");
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Konfirmasi";
            return;
        }

        if (year === "" || month === "" || date === "" || role === "") {
            showSendPopup("Gagal", "Harap isi semua pilihan dulu!");
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Konfirmasi";
            return;
        }

        confirmBtn.innerText = "WAIT...";
        confirmBtn.disabled = true;

        setTimeout(() => {

            // SET DATA KE PAGE 3
            if (helloText) helloText.innerText = "Halo, " + nameValue;

            if (roleMini) roleMini.innerText = role.toUpperCase();
            if (expMini) expMini.innerText = "Exp: " + date + " " + month + " " + year;

            if (profileName) profileName.innerText = nameValue;
            if (profileRole) profileRole.innerText = "Role: " + role;
            if (profileExp) profileExp.innerText = "Exp: " + date + " " + month + " " + year;

            confirmBtn.disabled = false;
            confirmBtn.innerText = "Konfirmasi";

            nextPage.style.display = "none";
            page3.style.display = "flex";

            showSection("home");

        }, 1000);
    };

    // =========================
    // NAVBAR SECTION PAGE3
    // =========================
    function showSection(section) {

        // hide all section
        if (homeContent) homeContent.style.display = "none";
        if (whatsappContent) whatsappContent.style.display = "none";
        if (toolsContent) toolsContent.style.display = "none";
        if (senderContent) senderContent.style.display = "none";
        if (settingsContent) settingsContent.style.display = "none";

        // remove active navbar
        if (navHome) navHome.classList.remove("active");
        if (navWhatsapp) navWhatsapp.classList.remove("active");
        if (navTools) navTools.classList.remove("active");
        if (navSender) navSender.classList.remove("active");
        if (navSettings) navSettings.classList.remove("active");

        // show selected
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
    if (navHome) navHome.onclick = () => showSection("home");
    if (navWhatsapp) navWhatsapp.onclick = () => showSection("whatsapp");
    if (navTools) navTools.onclick = () => showSection("tools");
    if (navSender) navSender.onclick = () => showSection("sender");
    if (navSettings) navSettings.onclick = () => showSection("settings");

    // =========================
    // TAB BUG NOMOR / BUG GROUP
    // =========================
    if (tabBugNomor && tabBugGroup) {
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
    }

    // =========================
    // SEND POPUP FUNCTION
    // =========================
    function showSendPopup(title, desc) {
        sendTitle.innerText = title;
        sendDesc.innerText = desc;
        sendPopup.style.display = "flex";
    }

    if (sendOk) {
        sendOk.onclick = function () {
            sendPopup.style.display = "none";
        };
    }

    // =========================
    // SEND BUTTON (VISUAL DOANG)
    // =========================
    if (sendWaBtn) {
        sendWaBtn.onclick = function () {
            const num = document.getElementById("waNumber").value.trim();
            const opt = document.getElementById("waOption").value;

            if (num.length < 10) {
                showSendPopup("Gagal", "Nomor minimal 10 digit!");
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
                showSendPopup("Sukses", "Berhasil mengirim (visual / boongan)");
            }, 1200);
        };
    }

    if (sendGroupBtn) {
        sendGroupBtn.onclick = function () {
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
                showSendPopup("Sukses", "Berhasil mengirim (visual / boongan)");
            }, 1200);
        };
    }

    // =========================
    // SETTINGS -> CONTACT PAGE
    // =========================
    if (openContactBtn) {
        openContactBtn.onclick = function () {
            page3.style.display = "none";
            contactPage.style.display = "flex";
        };
    }

    if (backHomeBtn) {
        backHomeBtn.onclick = function () {
            contactPage.style.display = "none";
            page3.style.display = "flex";
            showSection("settings");
        };
    }

    // Contact links
    if (waContact2) {
        waContact2.onclick = function (e) {
            e.preventDefault();
            window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, "_blank");
        };
    }

    if (tgContact2) {
        tgContact2.onclick = function (e) {
            e.preventDefault();
            window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(message)}`, "_blank");
        };
    }

    // =========================
    // ANIMASI MATA BLINK
    // =========================
    function blink() {
        const lids = document.querySelectorAll(".lid");
        lids.forEach(l => l.style.height = "100%");
        setTimeout(() => lids.forEach(l => l.style.height = "0%"), 150);
        setTimeout(blink, Math.random() * 3000 + 2000);
    }
    blink();
};
