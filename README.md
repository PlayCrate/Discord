# PlayCrate Discord

### What is this?

The purpose for this is manage the PlayCrate Discord server.

### Config

```
{
    "token": "Discord Bot Token",
    "client_id": "Discord Client ID",
    "type": "dev",
    "guilds": [
        "Guild ID",
        "Guild ID"
    ],
    "refresh_time": 360000,
    "authorization": "Auth token for custom API",
    "adminChannels": [
        "Channel ID",
        "Channel ID"
    ]
}
```

### Development

This repo requires [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) and [PostgreSQL](https://www.postgresql.org/).

1. Clone the repo
2. Run `cd Discord`
3. Run `yarn`
4. Run `yarn dev`
