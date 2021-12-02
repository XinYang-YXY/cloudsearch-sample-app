<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="logo.png" alt="Logo" width="80" height="80">


  <h3 align="center">CloudSeArch Sample App Backend</h3>

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#database-setup">Database Setup</a></li>
        <li><a href="#application-details">Application Details</a></li>
      </ul>
    </li>
    <li><a href="#references">References</a></li>
  </ol>
</details>




<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

Make sure you have [NPM & NodeJS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed

### Installation

1. Clone the repo
```bash
git clone https://github.com/XinYang-YXY/cloudsearch-sample-app.git
```
2. Create an environment file at the same folder level as this `README.md` file, name the file as `.env`. You should have the following variables inside your environment file
```txt
DB_HOST=<DATABASE_ENDPOINT>
DB_USER=<DATABASE_USERNAME>
DB_PASS=<DATABASE_PASSWORD>
DB_NAME=newsletter
```
3. Install dependencies
```bash
npm i
```
4. Start the backend application locally
```bash
npm run dev
```

### Database Setup
Currently, this sample app only works with `MySQL`. Run the MySQL commands below to generate the required database & table for the sample app

```sql
# Create a MySQL database called 'newsletter'
CREATE SCHEMA `newsletter` ;

# Create a MySQL table inside the 'newsletter' database called 'subscriber'
CREATE TABLE `newsletter`.`subscriber` (
  `email` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
```

_If you want to test the backend locally, make sure your MySQL instance is publicly accessible_


### Application Details
This backend app runs on port `8080` if the `PORT` environment variable is not specified


## References

* [App Engine app.yaml example for nodeJS](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/bae7a4035f85fba1c2268998c71f02a188ff2414/cloud-sql/mysql/mysql)

<p align="right">(<a href="#top">back to top</a>)</p>