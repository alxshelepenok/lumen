<h1 align="center">
    <img alt="Lumen" title="Lumen" src="https://github.com/alxshelepenok/gatsby-starter-lumen/blob/gatsby-v2/.github/logo.png" width="140"> </br>
    Lumen
</h1>

<h4 align="center">
  A constantly evolving and thoughtful architecture for creating new static blogs.
</h4>

<p align="center">
    <a target="_blank" href="https://circleci.com/gh/alxshelepenok/gatsby-starter-lumen"><img src="https://circleci.com/gh/alxshelepenok/gatsby-starter-lumen.svg?style=svg"></a> <a target="_blank" href="https://codecov.io/gh/alxshelepenok/gatsby-starter-lumen"><img src="https://codecov.io/gh/alxshelepenok/gatsby-starter-lumen/branch/master/graph/badge.svg"></a> <a target="_blank" href="https://www.codacy.com/app/alxshelepenok/gatsby-starter-lumen?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alxshelepenok/gatsby-starter-lumen&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/f7e27bb3a28a46a6b13453a02801c5c9"></a> <a target="_blank" href="https://codeclimate.com/github/alxshelepenok/gatsby-starter-lumen"><img src="https://img.shields.io/codeclimate/maintainability/alxshelepenok/gatsby-starter-lumen.svg"></a> <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Falxshelepenok%2Fgatsby-starter-lumen?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Falxshelepenok%2Fgatsby-starter-lumen.svg?type=shield"/></a>
</p>

## Table of contents

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/799dd97f20c1494687b603704169bac2)](https://app.codacy.com/gh/alxshelepenok/gatsby-starter-lumen?utm_source=github.com&utm_medium=referral&utm_content=alxshelepenok/gatsby-starter-lumen&utm_campaign=Badge_Grade_Settings)

+ [Features](http://github.com/alxshelepenok/gatsby-starter-lumen#features)
+ [Web Performance Tests](http://github.com/alxshelepenok/gatsby-starter-lumen#web-performance-tests)
+ [Quick Start](http://github.com/alxshelepenok/gatsby-starter-lumen#quick-start)
+ [Deploy with Netlify](http://github.com/alxshelepenok/gatsby-starter-lumen#deploy-with-netlify)
+ [Folder Structure](http://github.com/alxshelepenok/gatsby-starter-lumen#folder-structure)
+ [Sponsors](http://github.com/alxshelepenok/gatsby-starter-lumen#sponsors)
+ [Contributors](http://github.com/alxshelepenok/gatsby-starter-lumen#contributors)
+ [License](http://github.com/alxshelepenok/gatsby-starter-lumen#license)

## Features
+ [Lost Grid](http://lostgrid.org).
+ [Modern font stack](https://bitsofco.de/the-new-system-font-stack).
+ Beautiful typography inspired by [matejlatin/Gutenberg](https://github.com/matejlatin/Gutenberg).
+ Syntax highlighting in code blocks using [PrismJS](http://prismjs.com).
+ [Mobile-First](https://medium.com/@mrmrs_/mobile-first-css-48bc4cc3f60f) approach in development.
+ Archive organized by tags and categories.
+ Pagination support.
+ [Netlify CMS](https://www.netlifycms.org) support.
+ Google Analytics.
+ Disqus Comments.
+ [Flow](https://flow.org/) static type checking.

## Web Performance Tests
+ Lighthouse Report - [WebPageTest](https://www.webpagetest.org/result/190510_FE_3f2b13d0beed320f477467d433f56f43/)
+ Visual Comparison - [WebPageTest](https://www.webpagetest.org/video/compare.php?tests=190510_KZ_1228c343ccf04148619a5d0b89a41f71,190510_RE_b3bfad442f32c690a9f420fe46025b8d,190510_RS_3b5f0bff2d95161351dc6934cadbf1cf,190510_SC_5c458c451941f81b12911ccf4171a817,190510_63_52d5edd8743773815fbacb2e9c66d228,190510_AS_741b29f5af5a6e54980d82826d7bb5bb)

## Quick Start

#### Create a Gatsby site

Use the Gatsby CLI to create a new site, specifying the Lumen starter.

```sh
# Create a new Gatsby site using the Lumen starter
gatsby new blog https://github.com/alxshelepenok/gatsby-starter-lumen
```

#### Start Developing

Navigate into your new site’s directory and start it up.

```sh
cd blog
gatsby develop
```

#### Open the source code and start editing!

Your site is now running at `http://localhost:8000`!

Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

Open the `blog` directory in your code editor of choice and edit `src/templates/index-template.js`. Save your changes and the browser will update in real time!

## Deploy with Netlify

[Netlify](https://netlify.com) CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/alxshelepenok/gatsby-starter-lumen" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Deploy to Github Pages

To deploy to github pages, simply do the following:

- Ensure that your `package.json` file correctly reflects where this repo lives
- Change the `pathPrefix` in your `config.js`
- Run the standard deploy command

```sh
yarn deploy
```


#### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ yarn develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ yarn build
$ gatsby serve
```

## Folder Structure

```
└── content
    ├── pages
    └── posts
└── static
    ├── admin
    └── media
└── src
    ├── assets
    │   └── scss
    │       ├── base
    │       └── mixins
    ├── cms
    │   └── preview-templates
    ├── components
    │   ├── Feed
    │   ├── Icon
    │   ├── Layout
    │   ├── Page
    │   ├── Pagination
    │   ├── Post
    │   │   ├── Author
    │   │   ├── Comments
    │   │   ├── Content
    │   │   ├── Meta
    │   │   └── Tags
    │   └── Sidebar
    │       ├── Author
    │       ├── Contacts
    │       ├── Copyright
    │       └── Menu
    ├── constants
    ├── templates
    └── utils

```

## Sponsors

Development efforts are supported by the sponsors. I'm very grateful for their donations, please check them out!

| <a href="https://www.browserstack.com" target="_blank"><img width="250" src="https://gist.githubusercontent.com/alxshelepenok/94cbc6dc4a2cb8167ee188ddab33893a/raw/f869c9a67db7bfd5440a49178195efe811d8f7d8/browserstack.svg"></a> | <a href="https://sentry.io" target="_blank"><img width="250" src="https://gist.githubusercontent.com/alxshelepenok/1a74dbe123b2f7ad538f41c94e2da0a2/raw/aaeb3b38ef0873bae1f23f3605696b4e65362e67/sentry.svg"></a> |
:---: |:---: |

## Contributors
Thanks goes to these wonderful people!

[<img alt="vzhou842" src="https://avatars3.githubusercontent.com/u/10209814?v=4&s=117" width="117">](https://github.com/vzhou842) |[<img alt="alehel" src="https://avatars2.githubusercontent.com/u/22277624?v=4&s=117" width="117">](https://github.com/alehel) |[<img alt="abisz" src="https://avatars3.githubusercontent.com/u/7287780?v=4&s=117" width="117">](https://github.com/abisz) |[<img alt="remi-bruguier" src="https://avatars0.githubusercontent.com/u/7031328?v=4&s=117" width="117">](https://github.com/remi-bruguier) |[<img alt="mariolopjr" src="https://avatars3.githubusercontent.com/u/2067324?v=4&s=117" width="117">](https://github.com/mariolopjr) |[<img alt="ihororlovskyi" src="https://avatars3.githubusercontent.com/u/7969737?v=4&s=117" width="117">](https://github.com/ihororlovskyi) |
:---: |:---: |:---: |:---: |:---: |:---: |
[vzhou842](https://github.com/vzhou842) |[alehel](https://github.com/alehel) |[abisz](https://github.com/abisz) |[remi-bruguier](https://github.com/remi-bruguier) |[mariolopjr](https://github.com/mariolopjr) |[ihororlovskyi](https://github.com/ihororlovskyi) |

[<img alt="timbroder" src="https://avatars2.githubusercontent.com/u/121503?v=4&s=117" width="117">](https://github.com/timbroder) |[<img alt="vinnymac" src="https://avatars0.githubusercontent.com/u/1832781?v=4&s=117" width="117">](https://github.com/vinnymac) |[<img alt="yodahuang" src="https://avatars2.githubusercontent.com/u/11242657?v=4&s=117" width="117">](https://github.com/yodahuang) |[<img alt="axelclark" src="https://avatars1.githubusercontent.com/u/16856928?v=4&s=117" width="117">](https://github.com/axelclark) |[<img alt="BigTony666" src="https://avatars2.githubusercontent.com/u/29159357?v=4&s=117" width="117">](https://github.com/BigTony666) |[<img alt="stigrune" src="https://avatars0.githubusercontent.com/u/1052748?v=4&s=117" width="117">](https://github.com/stigrune) |
:---: |:---: |:---: |:---: |:---: |:---: |
[timbroder](https://github.com/timbroder) |[vinnymac](https://github.com/vinnymac) |[yodahuang](https://github.com/yodahuang) |[axelclark](https://github.com/axelclark) |[BigTony666](https://github.com/BigTony666) |[stigrune](https://github.com/stigrune) |

[<img alt="ybbarng" src="https://avatars2.githubusercontent.com/u/1793950?v=4&s=117" width="117">](https://github.com/ybbarng) |[<img alt="marktani" src="https://avatars1.githubusercontent.com/u/1780597?v=4&s=117" width="117">](https://github.com/marktani) |[<img alt="concreted" src="https://avatars2.githubusercontent.com/u/4016897?v=4&s=117" width="117">](https://github.com/concreted) |[<img alt="chmac" src="https://avatars0.githubusercontent.com/u/690997?v=4&s=117" width="117">](https://github.com/chmac) |[<img alt="charandas" src="https://avatars2.githubusercontent.com/u/542168?v=4&s=117" width="117">](https://github.com/charandas) |[<img alt="marcelabomfim" src="https://avatars0.githubusercontent.com/u/6224547?v=4&s=117" width="117">](https://github.com/marcelabomfim) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ybbarng](https://github.com/ybbarng) |[marktani](https://github.com/marktani) |[concreted](https://github.com/concreted) |[chmac](https://github.com/chmac) |[charandas](https://github.com/charandas) |[marcelabomfim](https://github.com/marcelabomfim) |

[<img alt="zollillo" src="https://avatars3.githubusercontent.com/u/8833904?v=4&s=117" width="117">](https://github.com/zollillo) |[<img alt="codejet" src="https://avatars3.githubusercontent.com/u/802203?v=4&s=117" width="117">](https://github.com/codejet) |[<img alt="reed-jones" src="https://avatars0.githubusercontent.com/u/11511864?v=4&s=117" width="117">](https://github.com/reed-jones) |[<img alt="rtveitch" src="https://avatars3.githubusercontent.com/u/25228001?v=4&s=117" width="117">](https://github.com/rtveitch) |[<img alt="SayakaOno" src="https://avatars0.githubusercontent.com/u/33141219?v=4&s=117" width="117">](https://github.com/SayakaOno) |[<img alt="swapnilmishra" src="https://avatars2.githubusercontent.com/u/875450?v=4&s=117" width="117">](https://github.com/swapnilmishra) |
:---: |:---: |:---: |:---: |:---: |:---: |
[zollillo](https://github.com/zollillo) |[codejet](https://github.com/codejet) |[reed-jones](https://github.com/reed-jones) |[rtveitch](https://github.com/rtveitch) |[SayakaOno](https://github.com/SayakaOno) |[swapnilmishra](https://github.com/swapnilmishra) |

[<img alt="vvasiloud" src="https://avatars1.githubusercontent.com/u/5891530?v=4&s=117" width="117">](https://github.com/vvasiloud) |[<img alt="vstoms" src="https://avatars2.githubusercontent.com/u/22646173?v=4&s=117" width="117">](https://github.com/vstoms) |[<img alt="wichopy" src="https://avatars2.githubusercontent.com/u/24414632?v=4&s=117" width="117">](https://github.com/wichopy) |[<img alt="yairmark" src="https://avatars1.githubusercontent.com/u/28291977?v=4&s=117" width="117">](https://github.com/yairmark) |
:---: |:---: |:---: |:---: |
[vvasiloud](https://github.com/vvasiloud) |[vstoms](https://github.com/vstoms) |[wichopy](https://github.com/wichopy) |[yairmark](https://github.com/yairmark) |

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Alexander Shelepenok

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
