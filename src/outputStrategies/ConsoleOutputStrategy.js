import OutputStrategy from "./OutputStrategy.js";

class ConsoleOutputStrategy extends OutputStrategy {
    log(message) {
        console.log(message);
    }
}

export default ConsoleOutputStrategy