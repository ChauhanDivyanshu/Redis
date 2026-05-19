import Redis from 'ioredis';

const subscriber = new Redis(process.env.REDIS_URL || 'redis://loclhost:6379');

subscriber.subscribe('notifications', (err) => {
    if (err) {
        console.error("Failed to subscribe: %s", err.message);
        return;
    }
    console.log("Subscribed Successfully!");
});

subscribe.on("message", (channel, message) => {
    console.log("Received on", channel, ":", JSON.parse(message));
});