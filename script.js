/*
  Telemetría para una simulación autorizada de awareness.

  Esta demo NO recopila:
  - contraseñas
  - códigos MFA
  - passkeys
  - cookies
  - tokens
  - credenciales de autenticación

  Por defecto solamente imprime los eventos en la consola.
*/

const CAMPAIGN = "managua-restaurants-demo";

// Pega aquí la URL de tu Google Apps Script Web App.
// Ejemplo:
// const ENDPOINT = "https://script.google.com/macros/s/XXXXX/exec";
const ENDPOINT = "";

function track(eventName, extra = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    campaign: CAMPAIGN,
    event: eventName,
    ...extra
  };

  console.log("[PHISHING TEST]", payload);

  if (!ENDPOINT) return;

  fetch(ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  }).catch(() => {});
}
