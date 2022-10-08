export interface Drone {
    serialNum: string;
    model: DroneModelEnum;
    weight: number;
    battery?: number;
    state?: DroneStateEnum;
}

export enum DroneStateEnum {
    IDLE = "idle",
    LOADING = "loading",
    LOADED = "loaded",
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    RETURNING = "returning",
}

export enum DroneModelEnum {
    LIGHTWEIGHT = "lightWeight",
    MIDDLEWEIGHT = "middleWeight",
    CRUISERWEIGHT = "cruiserWeight",
    HEAVYWEIGHT = "heavyWeight"
}