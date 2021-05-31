# Depolyment Instruction

## Frontend Building

### Prerequisites

We need **npm** to build a frontend project. **npm** is installed with **Node.js**. Go to the [home page](https://nodejs.org/en/) of **Node.js**, download the **LTS** version and run the installer.

To verify the installation, run the command in a console:
```
$ npm --version
```

### Building
Open a console, change to the fronted project directory:
```
$ cd path_to_directory
```

Then download all dependencies:
```
$ npm install
```

When the download finishes, there would be new folder `node_modules` that contains all the depended moduels. Now run the building command:
```
$ npm run build
```

Then a new folder `build` would appear, there exist all the final production files.

If we want to test the site locally before deploy to server, run the command blow to serve locally:
```
$ npm run start
```

## Deployment

Firstly, log into hosting server via FTP, then go to the path `/www`. Normally if use the web-based FTP client provided by OVH, the path after logging in is `/`.

Then delete previous files and upload new ones. Both backend files and frontend files are deposed here. Note that the files should placed exactly the way they were before, no more or less folders.