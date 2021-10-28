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
   ```sh
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
```sh
npm i
```
4. Start the backend application locally
```
npm run dev
```



## References

* [App Engine app.yaml example for nodeJS](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/bae7a4035f85fba1c2268998c71f02a188ff2414/cloud-sql/mysql/mysql)

<p align="right">(<a href="#top">back to top</a>)</p>