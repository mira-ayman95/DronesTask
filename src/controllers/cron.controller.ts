import { scheduleJob } from "node-schedule"
import { droneAuditService } from "../services/drone-audit-logs.service";



class CronController {
    constructor() {
        let cronTimer = process.env.LOG_CRON;
        scheduleJob(cronTimer, this.checkDronesBatteryScheduler);
    }

    async checkDronesBatteryScheduler() {
        try {
            await droneAuditService.logDroneBattery();
        } catch (error) {
            console.log('checkDronesBatteryScheduler error ', error)
        }
    }

}
export const cronController = new CronController();


