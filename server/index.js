const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
    // .send("Account", req.body.to, req.body.body)
    .create({
      body: req.body.body,
      from: "Account",
      to: req.body.to,
    })
    .then((message) => {
      let messageStat = message.status;
      res.send(JSON.stringify({ success: true, status: messageStat }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
