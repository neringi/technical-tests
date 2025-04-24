# Take Home Assignment


In this assignment, you will create a script on [Hacker News](https://news.ycombinator.com/) using JavaScript and Microsoft's [Playwright](https://playwright.dev/) framework. 

1. Install node modules by running `npm i`.

2. Edit the `index.js` file in this project to go to [Hacker News/newest](https://news.ycombinator.com/newest) and validate that EXACTLY the first 100 articles are sorted from newest to oldest. You can run your script with the `node index.js` command.

Note that you are welcome to update Playwright or install other packages as you see fit, however you must utilize Playwright in this assignment.


# Instructions to complete task

## Installation

Install node modules:

```bash
$ npm i
```
Install playwright test:
```bash
$ npm install -D @playwright/test
```
## Testing

Scripts updated. To run the Playwright tests: 

```bash
$ npm test
```

To see the report or latest test report:

```bash
$  npx playwright show-report
```