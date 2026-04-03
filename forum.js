// No hay nombres de usuario aquí. Solo el resultado del algoritmo.
const _0x4a21 = ["8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "4f55a1d7c37613768560647895186064789515"]; // Hashes pre-calculados

async function _hash(data) {
    const msgUint8 = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Escuchador de entrada con Delay de Seguridad (Anti-Brute Force)
let typingTimer;
document.getElementById('userInput').addEventListener('input', async (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
        const inputHash = await _hash(e.target.value);
        
        // El Hash del usuario amsec425d4fdasñ... 
        // Si coincide, desbloquea el campo de pass, si no, SILENCIO TOTAL.
        if (inputHash === "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855") { // Ejemplo de hash del user
            document.getElementById('passField').style.display = "block";
            document.getElementById('userInput').style.border = "1px solid #ff0000";
        }
    }, 500);
});

async function checkAuth() {
    const pass = document.getElementById('passInput').value;
    const passHash = await _hash(pass);

    // Verificación de la contraseña secreta
    if (passHash === _0x4a21[0]) {
        console.log("ATLAS_LOG: ACCESS_GRANTED");
        document.getElementById('adminPanel').style.display = "block";
        document.getElementById('loginArea').style.opacity = "0.1";
        document.getElementById('loginArea').style.pointerEvents = "none";
    } else {
        // TRAMPA: Si falla la pass en el panel oculto, baneo de IP simulado
        localStorage.setItem('BANNED', 'TRUE');
        window.location.href = "https://t.me/ironatlas_organization";
    }
}
