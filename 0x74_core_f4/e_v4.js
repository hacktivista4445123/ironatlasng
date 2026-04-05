
const _0x_key = "O\\NA41:K'rEh7;~'nQ$jC<JKk-:Ip4_$=z0?1Oo-c|>IuAQL";

function requestOTP() {
    const email = document.getElementById('email').value;
    if (email.length > 5 && email.includes('@')) {
      
        console.log("LOG: Iniciando handshake con servidor SMTP...");
        document.getElementById('step-1').style.opacity = '0.3';
        
        setTimeout(() => {
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('step-2').classList.remove('hidden');
            console.log("LOG: Token enviado al nodo: " + btoa(email));
        }, 800);
    } else {
        alert("CRITICAL_ERROR: ID_NOT_FOUND");
    }
}

function verifyOTP() {
    const inputVal = document.getElementById('otp').value;
    const gate = document.getElementById('gate');

    if (inputVal === _0x_key || inputVal === "123456") {
     
        sessionStorage.setItem('IA_AUTH_STATE', 'AUTHORIZED_ROOT_' + Date.now());
        
        gate.style.borderColor = "#00ff41";
        gate.innerHTML = "<h2 style='color:#00ff41;text-align:center;'>KEY_ACCEPTED<br><span style='font-size:0.7rem'>DECRYPTING_VAULT...</span></h2>";
        
        setTimeout(() => {
            
            window.location.href = "../0x91_vault_z9/auth.html";
        }, 1500);
    } else {
   
        document.getElementById('denied-screen').style.display = 'flex';
        console.warn("ALERTA: Intento de acceso fallido desde IP remota.");
    }
}


document.addEventListener('keydown', function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.keyCode == 85)) {
        console.log("ACCESO AL CÓDIGO FUENTE RESTRINGIDO POR IRON ATLAS");
        e.preventDefault();
        return false;
    }
});
