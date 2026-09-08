const CAMPAIGN = "managua-restaurants-demo-v2";
const ENDPOINT = "";

function setLoading(button, state){
  if(!button) return;
  button.disabled = state;
  button.classList.toggle("is-loading", state);
}

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
    headers: {"Content-Type":"text/plain;charset=utf-8"},
    body: JSON.stringify(payload)
  }).catch(() => {});
}
