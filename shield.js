(function() {
    const TRAP_URL = "https://t.me/ironatlas_organization";

    // Bloqueo de Teclas Prohibidas
    document.addEventListener('keydown', (e) => {
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
            (e.ctrlKey && e.keyCode === 85) // Ctrl+U (Source)
        ) {
            window.location.href = TRAP_URL;
        }
    });

    // Anti-Debugger (Detecta si la consola está abierta)
    let checkStatus = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            window.location.href = TRAP_URL;
        }
    });
    console.log(element);

    // Trampas de Inspección
    setInterval(() => {
        const start = new Date();
        debugger;
        const end = new Date();
        if (end - start > 100) {
            window.location.href = TRAP_URL;
        }
    }, 500);
})();
