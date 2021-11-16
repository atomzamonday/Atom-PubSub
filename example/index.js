const pubsub = require("../dist/index").pubsub; // "atom-pubsub";

const id1 = pubsub.subscribe("hello-world", (data) => {
  console.log(`hello ${data} from A`);
});
const id2 = pubsub.subscribe("hello-world", (data) => {
  console.log(`hello ${data} from B`);
});
pubsub.publish("hello-world", "Tomson");
pubsub.unsubscribe(id1);
pubsub.publish("hello-world", "James");
pubsub.unsubscribe(id2);
