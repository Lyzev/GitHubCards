<h1 align="center">GitHub Cards</h1>

<p align="center">A library which lets you embed github profiles/repos.</p>

<div align="center">
    <a href="https://discord.gg/5UmsQP4MFH"><img src="https://img.shields.io/discord/610120595765723137?logo=discord" alt="Discord"/></a>
    <br><br>
    <img src="https://img.shields.io/github/last-commit/Lyzev/GitHubCards" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/commit-activity/w/Lyzev/GitHubCards" alt="GitHub commit activity"/>
    <br>
    <img src="https://img.shields.io/github/languages/code-size/Lyzev/GitHubCards" alt="GitHub code size in bytes"/>
    <img src="https://img.shields.io/github/contributors/Lyzev/GitHubCards" alt="GitHub contributors"/>
</div>

## Usage

### Import

#### Profile Cards
````html
<link rel="stylesheet" href="https://lyzev.github.io/GitHubCards/min/gh-profilecard.min.css">
<script src="https://lyzev.github.io/GitHubCards/min/gh-profilecard.min.js"></script>
````

#### Repo Cards
```html
<link rel="stylesheet" href="https://lyzev.github.io/GitHubCards/min/gh-repocard.min.css">
<script src="https://lyzev.github.io/GitHubCards/min/gh-repocard.min.js"></script>
```

### Use

#### Profile Cards
```html
<gh-profilecard user="username"></gh-profilecard>
```

#### Repo Cards
```html
<gh-repocards amount="amount of random repos" user="username"></gh-repocards>
```
or
```html
<gh-repocard user="username" repo="repository"></gh-repocard>
```

## Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>

<gh-profilecard user="lyzev"></gh-profilecard>
<link rel="stylesheet" href="https://lyzev.github.io/GitHubCards/min/gh-profilecard.min.css">
<script src="https://lyzev.github.io/GitHubCards/min/gh-profilecard.min.js"></script>

<gh-repocard user="lyzev" repo="DcLogger"></gh-repocard>
<gh-repocards amount="5" user="lyzev"></gh-repocards>
<link rel="stylesheet" href="https://lyzev.github.io/GitHubCards/min/gh-repocard.min.css">
<script src="https://lyzev.github.io/GitHubCards/min/gh-repocard.min.js"></script>

</body>
</html>
```

![Example Image](assets/img.png)

## Bugs and Suggestions
Bug reports and suggestions should be made in this repo's [issue tracker](https://github.com/Lyzev/GitHubCards/issues) using the templates provided. Please provide as much information as you can to best help us understand your issue and give a better chance of it being resolved.