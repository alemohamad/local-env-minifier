# Local Environment Minifier

A local environment to minify HTML, CSS & JS files.

![Version](https://img.shields.io/npm/v/@alemohamad/local-env-minifier.svg?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/alemohamad/local-env-minifier.svg?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/alemohamad/local-env-minifier.svg?style=flat-square)
[![License](https://img.shields.io/npm/l/@alemohamad/local-env-minifier.svg?style=flat-square)](https://opensource.org/licenses/mit-license.php)

## Getting started with the project

```
git clone https://github.com/alemohamad/local-env-minifier
npm install
```

**NOTE:** You will need [Node.js](https://nodejs.org/) installed on your computer before you can run this last command.

## Using the minifier

In the project directory where you cloned the repo, run the command:

```
gulp
```

If you want the code to watch for changes, minify the source code and update the development website, run the command:

```
gulp watch
```

You can also run the tasks separatedly:

```
gulp css
gulp js
gulp html
```

## Handling the assets

When creating a website, you'll use images and other assets. To copy this files from the `src` folder to the `dist` folder, run the command:

```
gulp assets
```

## Extras

You can have some extras on how to configure some meta tags (favicons, social or PWA) inside the `extra` folder.

Also, you can change the `applogo.png` icon, to use your own when minifying the source code.

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/mit-license.php).
