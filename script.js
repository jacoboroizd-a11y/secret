const CAMPAIGN = "managua-de-noche-v4";
const ENDPOINT = "";

function track(eventName, extra = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    campaign: CAMPAIGN,
    event: eventName,
    ...extra
  };

  console.log("[AWARENESS]", payload);

  if (!ENDPOINT) return;

  fetch(ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type":"text/plain;charset=utf-8"},
    body: JSON.stringify(payload)
  }).catch(() => {});
}

function protectedAction(action) {
  track("protected_action_clicked", {action});
  location.href = "access.html?action=" + encodeURIComponent(action);
}
