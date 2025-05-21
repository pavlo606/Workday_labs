import { Kafka } from "kafkajs";

import OutputStrategy from "./OutputStrategy.js";

class KafkaOutputStrategy extends OutputStrategy {
    constructor() {
        super();
        this.kafka = new Kafka({
            clientId: "report-importer",
            brokers: ["localhost:9092"],
        });

        this.producer = this.kafka.producer();
        this.connected = false;
    }

    async connect() {
        if (!this.connected) {
            await this.producer.connect();
            this.connected = true;
        }
    }

    async log(message) {
        await this.connect();
        await this.producer.send({
            topic: "report-logs",
            messages: [{ value: message }],
        });
    }
}

export default KafkaOutputStrategy;
