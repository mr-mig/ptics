# Rails API

This Rails setup is generated using the following command:

```bash
rails new api --api --devcontainer --skip-action-mailer --skip-action-mailbox --skip-action-text --skip-asset-pipeline --skip-javascript --skip-hotwire --skip-jbuilder --skip-keeps --skip-system-test -database postgresql
```

## How-to 

To be able to generate the setup with `postrgresql` on Mac, you may want to upgrade the version of ruby fitst:

```bash
brew install ruby
```

Then, install these dependencies:

```bash
brew install postgresql
gem install rails
gem install pg
```
