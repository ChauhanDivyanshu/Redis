import express from 'express';
import redis from 'ioredis';

const app = express();
app.use(express.json());

const publisher = new redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/notifications", async(req, res) => {
    const payload = {
        title: req.body.title || "Default Title",
        createdAt: new Date().toISOString(),
    }
    const receivers = await publisher.publish("notifications", JSON.stringify(payload));
    res.json({message: `Notification sent to ${receivers} subscribers`});
});


app.listen(3000, () => {
    console.log("API server is running on port https://localhost:3000");
});