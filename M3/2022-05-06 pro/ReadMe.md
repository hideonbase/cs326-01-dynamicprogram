# The Project structure

- app.js:  The Server entry
- client:  The front end part
    - index:  main page
    - details:  details page
    - contact:  contact us
- package.json npm: configuration

# Note

- Submit git commit，Add a `.gitignore`

# Steps to start server

- `npm install`
- `node app.js`
- please open url: `http://localhost:3000/client`
    - The base URL of the API that the front-end accesses is: `http://localhost:3000`
    - Front-end static file root directory:`http://localhost:3000/client`

# SQL

## comment

```postgresql
select *
from house_details;

-- comment
-- query all comments in one room
-- $id = 1
select *
from comment
where room_id = 1;

-- create a new comment
-- customer_id room_id content date
INSERT INTO comment (customer_id, room_id, content, date)
VALUES (2, 3, 'test2', 1650057275268);

-- delete a comment
DELETE
FROM comment
WHERE id = 6;
```

# Process to open
1. Run`npm install`
2. Run`createdb dev`*
3. Run`psql -U dev -d dev -f ./dev.out`
4. Start the project`npm run start`
5. Open`http://localhost:5000`
