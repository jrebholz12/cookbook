const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");

// Extract ingredients from a recipe URL
exports.extractIngredients = functions.https.onRequest(async (req, res) => {
  const {url} = req.body;

  if (!url) {
    return res.status(400).send({error: "URL is required"});
  }

  try {
    // Fetch the recipe page
    const {data} = await axios.get(url);

    // Parse the HTML with Cheerio
    const $ = cheerio.load(data);

    // Extract ingredients (adjust the selector for the specific site)
    const ingredients = [];
    $("li.ingredient").each((i, el) => {
      ingredients.push($(el).text().trim());
    });

    res.status(200).send({ingredients});
  } catch (error) {
    console.error("Error extracting ingredients:", error.message);
    res.status(500).send({error: "Failed to extract ingredients"});
  }
});
