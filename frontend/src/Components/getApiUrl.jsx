export default function getApiUrl() {
  const currentUrl = window.location.href;
  let apiUrl;

  if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
    // Running on localhost
    apiUrl = "http://localhost:3001/"; // Example local API URL
  } else {
    // Running on the web
    apiUrl = "https://epiceventsbackend.onrender.com/"; // Example production API URL
  }

  return apiUrl;
}
