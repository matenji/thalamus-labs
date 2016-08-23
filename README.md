# Thalamus Labs Website

This is the Thalamus Labs file repo to continue developing the website on your local system.

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

### Manual Setup

To manually set up the site, first download it with Git:

```bash
git clone https://github.com/matenji/thalamus-labs.git projectname
```

Then open the folder (projectname) in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `gulp build && npm start` to run the Sass compiler and browser-sync. It will re-run every time you save a Sass file. All the rendered files gets spit into a folder called dist/ which you can upload to the web host using your account's FTP login info.
