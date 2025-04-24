
const { chromium } = require("playwright");



async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();


  let articles = [];
  let nextPageUrl = "https://news.ycombinator.com/newest";

  while (articles.length < 100) {
    await page.goto(nextPageUrl);
    await page.waitForSelector("tr.athing");

    // Extract article IDs and titles from current page
    const newArticles = await page.$$eval("tr.athing", rows => {

      function ageToMinutes(ageStr) {
        if (!ageStr) return Infinity;
      
        const [amountStr, unit] = ageStr.split(" ");
        const amount = parseInt(amountStr);
      
        if (unit.startsWith("minute")) return amount;
        if (unit.startsWith("hour")) return amount * 60;
        if (unit.startsWith("day")) return amount * 60 * 24;
        if (unit.startsWith("month")) return amount * 60 * 24 * 30;
        if (unit.startsWith("year")) return amount * 60 * 24 * 365;
      
        return Infinity;
      }
      
      return rows.map(row => {
        const id = parseInt(row.getAttribute("id"));
        const title = row.querySelector(".titleline a")?.textContent.trim() || "";
        const subtextRow = row.nextElementSibling;
        const age = subtextRow?.querySelector(".age")?.innerText || "";
        const ageMinutes = ageToMinutes(age);
        return { id, title, age, ageMinutes };
      });
    });
    

    articles = articles.concat(newArticles);

    // Get the URL for the next page (from the "More" link)
    const moreLink = await page.$("a.morelink");
    nextPageUrl = await moreLink?.getAttribute("href");
    if (!nextPageUrl) break;
    nextPageUrl = `https://news.ycombinator.com/${nextPageUrl}`;
  }

  // Trim to 100 articles
  articles = articles.slice(0, 100);

  // Check if IDs are in descending order
  const ids = articles.map(a => a.id);
  const isDescending = ids.every((id, i, arr) => i === 0 || arr[i - 1] > id);

  // Convert age to minutes and check its in descending order
  const isSortedByAge = articles.every((val, i, arr) => i === 0 || arr[i - 1].ageMinutes <= val.ageMinutes);


  console.log(`Articles: `, articles)
  console.log(`Fetched ${articles.length} articles.`);
  console.log("Are articles sorted newest to oldest by ID?", isDescending ? "✅ Yes" : "❌ No");
  console.log("Are articles sorted from newest to oldest by age?", isSortedByAge ? "✅ Yes" : "❌ No");

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
