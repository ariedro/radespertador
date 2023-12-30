const { spawn } = require('node:child_process');
const express = require('express');
const { radioCommand, tickTime, volumeCommand } = require('./config.json');

const setVolume = volume => spawn(volumeCommand[0], volumeCommand.slice(1).concat([`${volume}%`]));

const app = express();

setVolume(0);
let currentVolume = 0;
setInterval(() => {
  setVolume(++currentVolume);
}, tickTime);

const play = spawn(radioCommand[0], radioCommand.slice(1));

app
  .get('/apagar', (_req, res) => {
    try {
      play.kill(9);
      res.send('Apagado\n');
      setVolume(0);
      process.exit(0);
    } catch (error) {
      res.status(500).send(error);
      setVolume(0);
      process.exit(1);
    }
  })
  .listen(3000);
