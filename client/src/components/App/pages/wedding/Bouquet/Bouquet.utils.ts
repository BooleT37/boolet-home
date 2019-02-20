import { WHEEL_CENTER, BOUQUET_SPIN_RADIUS, BOUQUET_IMAGE_WIDTH, BOUQUET_IMAGE_HEIGHT } from "src/components/App/pages/wedding/Bouquet/Bouquet.constants";
import { Position } from "./Bouquet.models";

function range(to: number): number[] {
    return Array.from(new Array(to), (val, index) => index);
}

export function getCirclePositions(
    center: Position,
    n: number,
    radius: number,
    imageWidth: number,
    imageHeight: number,
    angle: number = 0
): Position[] {
    const deltaAngle = (Math.PI * 2) / n;
    return range(n)
        .map(i => i * deltaAngle + angle)
        .map((currentAngle: number): Position => ({
            left: center.left - imageWidth / 2 + radius * Math.sin(currentAngle),
            top: center.top - imageHeight / 2 - radius * Math.cos(currentAngle)
        }));
}

export function firstNWithRepeat<T>(array: T[], n: number): T[] {
    const arrayCopy = array.slice();
    while (array.length < n) {
        array = array.concat(arrayCopy);
    }
    return array.slice(0, n);
}

export function getBouquetPosition(angle: number): Position {
    return getCirclePositions(
        WHEEL_CENTER,
        1,
        BOUQUET_SPIN_RADIUS,
        BOUQUET_IMAGE_WIDTH,
        BOUQUET_IMAGE_HEIGHT,
        -angle - Math.PI / 2
    )[0];
}

export function getCurrentAngle(acc: number, v0: number, t: number): number {
    return (acc * t * t) / 2 + v0 * t;
}
