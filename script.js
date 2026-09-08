// Static mockup only. No network requests, no storage, no navigation.
// "Next" does exactly one thing: swap the visible section.

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // never submits or navigates anywhere

  document.getElementById("state-login").hidden = true;
  document.getElementById("state-result").hidden = false;
});
