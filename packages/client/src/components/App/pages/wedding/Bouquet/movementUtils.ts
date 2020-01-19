export function getDistance(v0: number, t: number): number {
    return (v0 * t) / 2;
}

export function getTime(acc: number, v0: number): number {
    return -v0 / acc;
}

export function getV0(angle: number, t: number): number {
    return (angle / t) * 2;
}

export function getAcc(angle: number, t: number): number {
    return - (angle * 2) / (t * t);
}

export function getAccBySpeedAndTime(v0: number, t: number): number {
    return - v0 / t;
}
