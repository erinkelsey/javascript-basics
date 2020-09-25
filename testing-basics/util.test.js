const { generateText, checkAndGenerate } = require("./util");
const puppeteer = require("puppeteer");

test("should output name and age", () => {
  const text = generateText("Erin", 29);
  expect(text).toBe("Erin (29 years old)");
});

test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Erin", 20);
  expect(text).toBe("Erin (20 years old)");
});

test("should test add user - e2e", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920, 1080"],
  });

  const page = await browser.newPage();
  await page.goto(
    "file:///Users/erinkelsey/Dropbox/Documents/03_Portfolio/javascript/javascript-basics/testing-basics/index.html"
  );

  await page.click("input#name");
  await page.type("input#name", "Anna");

  await page.click("input#age");
  await page.type("input#age", "30");

  await page.click("#btnAddUser");

  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Anna (30 years old)");

  browser.close();
}, 10000); // set timeout for test
