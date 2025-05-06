# technical-tests


## About

Collection of technical tests I worked on.

## Projects

### Music Catalog

Small week long project that creates a React frontend page to display albums and songs. NextJS used to create APIs that write to Postgresql local database.

### Protein Structure Viewer

24h project web app for storing, searching, and visualizing protein structure data. Downloaded protein data from GCP, used APIs to download PDB structures. Users can search by gene name to view details and interact with 3D visualizations (Molstar).
Used Flask and Postgres

### Playwright testing HackerNews

Short task to write a Playwright framework to validate HackerNews newest articles are sorted newest to oldest.

### Cloud function `rollDice`

Short task to write a cloud function and deploy publically on GCP. GET returns docs and POST returns output

To test locally, run: 
```
npm start
```
Copy URL, in my case it's `http://localhost:8080/`, then run:

```
curl -X POST http://localhost:8080 \
  -H "Content-Type: application/json" \
  -d '{"input": {"diceSize": 10}}'

```
You should get results like:
```
{"output":{"diceSize":10,"result":4}}
```


