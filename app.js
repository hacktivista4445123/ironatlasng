// --- BASE DE DATOS DE RATAS (JSON SIMULADO) ---
const RAT_DATABASE = [
    {
        id: "RATA_01",
        nombre: "IDENTIDAD_RESERVADA",
        cargo: "Funcionario Minsalud",
        delito: "Venta de suministros médicos",
        evidencia: "https://t.me/ironatlas_organization",
        foto: "https://i.postimg.cc/mPCTw51J/nullsec.png"
    }
];

// --- CEREBRO DE LA WEB ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("IRON_ATLAS_OS v9.4 Loaded...");
    
    // Verificar si el usuario está baneado localmente
    if(localStorage.getItem('BANNED') === 'TRUE') {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%;'>TU ACCESO HA SIDO REVOCADO PERMANENTEMENTE POR INTENTO DE ATAQUE.</h1>";
        setTimeout(() => { window.location.href = "https://t.me/ironatlas_organization"; }, 3000);
    }

    // Inyectar ratas si existe el contenedor (en forum o index)
    const container = document.getElementById('exposedList');
    if(container) {
        RAT_DATABASE.forEach(rat => {
            const div = document.createElement('div');
            div.className = 'rat-entry';
            div.innerHTML = `
                <img src="${rat.foto}" style="width:50px; float:left; margin-right:15px; border:1px solid red;">
                <strong>TARGET: ${rat.nombre}</strong><br>
                <span>Cargo: ${rat.cargo}</span><br>
                <span style="color:red">Delito: ${rat.delito}</span><br>
                <a href="${rat.evidencia}" style="font-size:10px;">[VER EXPEDIENTE]</a>
                <div style="clear:both;"></div>
            `;
            container.appendChild(div);
        });
    }
});
