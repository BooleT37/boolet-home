import { Position } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";

function range(to: number): number[] {
    return Array.from(new Array(to), (val, index) => index);
}

export function getGirlsPositions(
    center: Position,
    n: number,
    radius: number,
    girlImageWidth: number,
    girlImageHeight: number,
    initialAngle: number = 0
): Position[] {
    const deltaAngle = (Math.PI * 2) / n;
    return range(n)
        .map(i => i * deltaAngle + initialAngle)
        .map((angle: number): Position => ({
            left: center.left - girlImageWidth / 2 + radius * Math.sin(angle),
            top: center.top - girlImageHeight / 2 - radius * Math.cos(angle)
        }));
}

export function firstNWithRepeat<T>(array: T[], n: number): T[] {
    const arrayCopy = array.slice();
    while (array.length < n) {
        array = array.concat(arrayCopy);
    }
    return array.slice(0, n);
}
