# airtribe-stackoverflow-crawler
### Problem statement
Recursively crawl [https://stackoverflow.com/questions](https://stackoverflow.com/questions) using Node.js based crawler, harvest all questions on Stack Overflow and store them in a database of your choice. 

What do you need to store?

1. Every unique URL (Stack Overflow question) you encountered.
2. The total reference count for every URL (How many time this URL was encountered).
3. Total # of upvotes and total # of answers for every question.
4. Dump the data in a CSV file when the user kills the script.

Things you should keep in mind:

1. Maintain a **concurrency of 5 requests** at all times. Refrain from using **throttled-request** package to limit concurrency.
2. Your solution needs to be **asynchronous** in nature.
3. If you are using **request.js**, do not use its connection pool to throttle # of requests. 
4. You can use cheerio or similar library for HTML parsing.

### Steps to run the project:
- Clone the repository 
```
https://github.com/apoorva0107/airtribe-stackoverflow-crawler.git
```
- cd airtribe-stackoverflow-crawler
- npm install
- npm start
 ### Explanation:
- I created an array where I push all the question url in task queue
- Next, I recursively iterated through the array and crawl individual url and save the url, upvotes, answers and number of occurences in mongoDB database. 
- All the questions saved in the database are dumped in a CSV file when the user kills a script
