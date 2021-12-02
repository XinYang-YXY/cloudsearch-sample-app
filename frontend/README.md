<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="logo.png" alt="Logo" width="80" height="80">


  <h3 align="center">CloudSeArch Sample App Frontend</h3>

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
        <li><a href="#docker-details">Docker Details</a></li>
      </ul>
    </li>
    <li><a href="#references">References</a></li>
  </ol>
</details>




<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

Make sure you have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed

### Installation

1. Clone the repo
```bash
git clone https://github.com/XinYang-YXY/cloudsearch-sample-app.git
```
2. Create an environment file at the same folder level as this `README.md` file, name the file as `.env`. You should have the following variables inside your environment file
```txt
REACT_APP_BACKEND_API_URL = <YOUR_BACKEND_API_ENDPOINT>
```
3. Install dependencies
```bash
npm i
```
4. Start the fronted application locally
```bash
npm start
```
5. Create a production build
```bash
npm build
```

### Docker Details
By default, the Docker container listens on port `8080`. You can change it by modifying the `nginx.conf` 



## References

* [App Engine app.yaml example for Nginx](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/quickstart)

<p align="right">(<a href="#top">back to top</a>)</p>