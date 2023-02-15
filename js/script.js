"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const errMessage = document.createElement("p");

let data = [];

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(API_URL);
    data = await response.json();

    newQuote();
  } catch (err) {
    showLoadingSpinner();
    showErrorMessage(err.message);
  }
}

// Show error message
const showErrorMessage = function (message) {
  errMessage.classList.add("error");
  errMessage.textContent = `💥 Sorry, there was an error. ${message}`;
  document.body.appendChild(errMessage);
}

// Show loader
const showLoadingSpinner = function () {
  loader.classList.remove("hidden");
  quoteContainer.hidden = true;
};

// Hide loader
const removeLoadingSpinner = function () {
  loader.classList.add("hidden");
  quoteContainer.hidden = false;
}

// New quote
const newQuote = function () {
  showLoadingSpinner();
  // Pick a random quote from the data array
  const quote = data[Math.floor(Math.random() * data.length)];

  // Check if author field is blank and replace it with 'Anonymous'
  !quote.author ? authorText.textContent = "Anonymous" : authorText.textContent = quote.author;

  // Check quote length to determine styling
  quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");

  // Set quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Tweet quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();