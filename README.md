# Setup
- verify that Node.js v8.9.3^ is installed
- git clone https://github.com/caseysiebel/csv2sqlite && cd csv2sqlite
- npm i

# Start Server
- node index.js

# POST
Use prefered method for submitting POST to API endpoint. 

# CURL
curl --form "users=@{path to csv on system}" {url}/upload-users

exp:
curl --form "users=@data.csv" http://localhost:9000/upload-users

# Response
The server response with all the user data currently in the database, after the insertion of the uploaded data in JSON format.

# Assumptions and Design Decisions
- As the specification states this API works if columns are missing or additional columns are present in the uploaded CSV. However it is assumed that for the columns of interest that are present in the CSV, the header text is exactly as shown in the Columns section of specification. Same capitalization and spacing. No extra characters, only ASCII.
- Columns present in the CSV but not of interest will not be included in the database, only the subset of columns that are of interest will be inserted into the database.
- If a column of interest is missing from an uploaded CSV, null values will be inserted in the database for those columns for the associated records.
