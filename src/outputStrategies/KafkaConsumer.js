import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "report-consumer",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "report-log-reader" });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "report-logs", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(`Kafka log: ${message.value.toString()}`);
        },
    });
};

run();