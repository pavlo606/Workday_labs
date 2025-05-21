import config from "./config.js"

import KafkaOutputStrategy from "./KafkaOutputStrategy.js";
import ConsoleOutputStrategy from "./ConsoleOutputStrategy.js";

let strategy;

switch (config.outputStrategy) {
    case "kafka":
        strategy = new KafkaOutputStrategy();
        break;
    case "console":
    default:
        strategy = new ConsoleOutputStrategy();
}

export default strategy;