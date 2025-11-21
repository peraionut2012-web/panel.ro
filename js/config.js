// Configurare pentru site-ul InvisionRomania
// Acest fiÈ™ier conÈ›ine variabile de configurare ce ar trebui pÄƒstrate private
// ÃŽntr-o implementare realÄƒ, aceste date ar trebui pÄƒstrate pe server

const CONFIG = {
    // Webhook URLs pentru sisteme de platÄƒ
    WEBHOOK_URLS: {
        PAYPAL: "https://discord.com/api/webhooks/1366434190081527890/Ds0W5SSq_XH--uet-yq0m_HSuMGhH0gAUvIz3ZROdyxnbojfLTVQVUxfuWr8wm6Q5JuI",
        REVOLUT: "https://discord.com/api/webhooks/1366434547142627348/rjJDTMb1bhBWuKZRdM0Mvtx2y1jt1sMZTFdNg8qDO5GDdrB4QyXpB1Tj8eeLs80C_H68",
        PAYSAFE: "https://discord.com/api/webhooks/1366435045530800238/Gr-6uLJV85vOVARWkGOJaNV5ZJP-3Hzob6EeW1dH_mxIVPgkeCveuG4GqJHfiDax8t2s"
    },
    
    // ParolÄƒ admin (hash SHA-256)
    ADMIN: {
        // Hashul SHA-256 pentru "InvisionAdmin2023" 
        // Regenerat pentru compatibilitate cu algoritmul din aplicaÈ›ie
        PASSWORD_HASH: "76cc31b2e0fa4e0b4bcf5e156181f7a0361f1f7d3e23fcb4f7dfcee784b094e0" 
    },
    
    // Configurarea PayPal (dacÄƒ este necesarÄƒ Ã®n viitor)
    PAYPAL: {
        CLIENT_ID: ""
    }
}; 