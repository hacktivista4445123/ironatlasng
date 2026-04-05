(function() {
    const _0x_R = "https://t.me/ironatlas_organization";

    // Bloqueo de inspección agresivo
    const detect = () => {
        const start = new Date();
        debugger;
        const end = new Date();
        if (end - start > 100) {
            window.location.href = _0x_R;
        }
    };

    window.addEventListener('load', () => {
        setInterval(detect, 500);
    });

    document.onkeydown = (e) => {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
            window.location.href = _0x_R;
            return false;
        }
    };

    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        window.location.href = _0x_R;
    });

    console.log("%cIRON ATLAS: EL CADÁVER HA SIDO ABIERTO.", "color:red; font-size:30px; font-weight:bold;");
})();
