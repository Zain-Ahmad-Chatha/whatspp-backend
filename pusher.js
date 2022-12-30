const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1531072",
  key: "a79daef9a4dca38b13fe",
  secret: "519c3f6c74ac35b48b0f",
  cluster: "eu",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
