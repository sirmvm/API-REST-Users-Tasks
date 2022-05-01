"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    constructor() {
        this.info = (_req, res) => {
            res.json({
                name: 'My Api Service Users-Taks',
                version: '1.0.0',
                creator: 'Matias Valladares'
            });
        };
        this.ping = (_req, res) => {
            res.send('Server is running');
        };
    }
}
exports.default = HealthController;
