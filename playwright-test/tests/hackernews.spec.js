import { test, expect } from '@playwright/test';

test('Hacker News articles are sorted by ID and age descending', async ({ page }) => {
  let articles = [];
  let nextPageUrl = "https://news.ycombinator.com/newest";

  while (articles.length < 100) {
    await page.goto(nextPageUrl);
    await page.waitForSelector("tr.athing");

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

    const moreLink = await page.$("a.morelink");
    const href = await moreLink?.getAttribute("href");
    if (!href) break;
    nextPageUrl = `https://news.ycombinator.com/${href}`;
  }

  articles = articles.slice(0, 100);

  // Assertions
  const ids = articles.map(a => a.id);
  const isDescendingById = ids.every((id, i, arr) => i === 0 || arr[i - 1] > id);
  expect(isDescendingById).toBe(true);

  const isSortedByAge = articles.every((val, i, arr) => i === 0 || arr[i - 1].ageMinutes <= val.ageMinutes);
  expect(isSortedByAge).toBe(true);
});
