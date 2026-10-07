```javascript
const form = document.querySelector("#greeting-form");
const nameInput = document.querySelector("#name");
const greeting = document.querySelector("#greeting");
const counter = document.querySelector(".counter-number");

const LAMBDA_URL =
  "https://o73g5ptpujgtclinhzhhneplje0jogoh.lambda-url.us-east-1.on.aws/";

/**
 * Display a greeting or error message.
 */
function showGreeting(message, isError = false) {
  greeting.textContent = message;
  greeting.classList.toggle("error", isError);
  greeting.hidden = false;
}

/**
 * Handle the greeting form.
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (!name) {
    showGreeting("Please enter your name first.", true);
    nameInput.focus();
    return;
  }

  showGreeting(`Hello, ${name}! 👋`);

  form.reset();
});

/**
 * Fetch and display the current page-view count.
 */
async function updateCounter() {
  try {
    const response = await fetch(LAMBDA_URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // The Lambda currently returns the view count directly.
    const views =
      typeof data === "number"
        ? data
        : data.views ?? data.body ?? data;

    counter.textContent = `Views: ${Number(views).toLocaleString()}`;
  } catch (error) {
    console.error("Unable to update view counter:", error);
    counter.textContent = "Views unavailable";
  }
}

// Load the view counter when the page opens.
updateCounter();
```