## kchungradio.org

Welcome to KCHUNG Radio!

### Local Development

- make sure you have these installed:
  - [git](https://git-scm.com/downloads)
  - [node.js](https://nodejs.org)
- in your terminal:
  - `git clone https://github.com/kchungradio/kchungradio.org.git`
  - `cd kchungradio.org`
  - `npm install`
  - OPTIONAL: Get the aws secrets and put in a `.env` file or in `.envrc.local` if you use `direnv`. This is only needed if you want to connect to the archive.
  - `npm run dev`
- visit http://localhost:3000 in your browser

### Deploys

every PR gets deployed to its own staging url.

Changes merged with the `main` branch automaticcaly get deployed to [www.kchungradio.org](https://www.kchungradio.org).

### Chat about stuff under issues

Check the [issue tracker](https://github.com/kchungradio/kchungradio.org/issues) for discussion on bugs and enhancements.

You can also find us in the **#website** channel on the KCHUNG Slack.
