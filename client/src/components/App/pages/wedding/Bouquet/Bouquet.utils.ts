import {
    WHEEL_CENTER,
    BOUQUET_SPIN_RADIUS,
    BOUQUET_IMAGE_WIDTH,
    BOUQUET_IMAGE_HEIGHT,
    RADIUS,
    GIRL_IMAGE_WIDTH,
    GIRL_IMAGE_HEIGHT, FPS
} from "./Bouquet.constants";
import { Position, SettingsInState, Settings } from "./Bouquet.models";
import { getAcc, getV0, getTime, getDistance } from "./movementUtils";

function range(to: number): number[] {
    return Array.from(new Array(to), (val, index) => index);
}

export function getCircleAngles(n: number): number[] {
    const deltaAngle = (Math.PI * 2) / n;
    return range(n)
        .map(i => i * deltaAngle);
}

export function getCirclePositions(
    center: Position,
    n: number,
    radius: number,
    imageWidth: number,
    imageHeight: number,
    angle: number = 0
): Position[] {
    return getCircleAngles(n)
        .map(currentAngle => currentAngle + angle)
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
        -angle + Math.PI / 2
    )[0];
}

export function seedRandomIndex(n: number): number {
    return Math.floor(Math.random() * n);
}

export function getModulo(num: number, modulus: number): number {
    if (num > 0) {
        while (num > modulus) {
            num -= modulus;
        }
    } else {
        while (-num > modulus) {
            num += modulus;
        }
    }
    return num;
}

// For debug purposes
// function radToString(angle: number): string {
//     const round = Math.PI * 2;
//     function shortAngleToString(shortAngle: number): string {
//         return `${Math.round(shortAngle / round * 360)} grad`;
//     }
//
//     const roundsCount = Math.floor(angle / round);
//     const rest = getModulo(angle, round);
//     return roundsCount > 0
//         ? `${roundsCount} rounds and ${shortAngleToString(rest)}`
//         : shortAngleToString(rest);
// }

export function countV0AndAccForIndex(
    index: number,
    initialAcc: number,
    initialV0: number,
    currentAngle: number,
    n: number
): { v0: number, acc: number } {
    // 1. Время вращения (в кадрах)
    const t = getTime(initialAcc, initialV0);
    // 2. Расстояние (в рад.), которое пройдут портреты с начальными характеристиками
    const distance = getDistance(initialV0, t); // always > 0
    // 3. Смещение выбранного портрета в изначальной позициии
    const portraitInitialAngle = getCircleAngles(n)[index];
    // 4. Угол между выбранным портретом и букетом
    const diffAbsolute = (distance + currentAngle) * 2 + portraitInitialAngle - Math.PI / 2;
    // 5. Угол между выбранным портретом и букетом (по модулю 2 * Pi)
    const diff = getModulo(diffAbsolute, Math.PI * 2);
    // 6. Новое расстояние, которое нужно пройти портретам
    const newDistance = diff < Math.PI ? distance - (diff / 2) : distance + Math.PI - (diff / 2);
    // console.log(`diff: ${radToString(diff)}`);
    // console.log(`s: ${radToString(distance)} -> ${radToString(newDistance)}`);
    return {
        v0: getV0(newDistance, t),
        acc: getAcc(newDistance, t)
    };
}

export function getBouquetPositionNextToGirl(
    angle: number,
    chosenIndex: number,
    girlsCount: number
): Position {
    const positions = getCirclePositions(
        WHEEL_CENTER,
        girlsCount,
        RADIUS,
        GIRL_IMAGE_WIDTH,
        GIRL_IMAGE_HEIGHT,
        angle
    );
    const girlPosition = positions[chosenIndex];
    return {
        left: girlPosition.left + GIRL_IMAGE_WIDTH,
        top: girlPosition.top + (GIRL_IMAGE_HEIGHT - BOUQUET_IMAGE_HEIGHT) / 2
    };
}

export function getSettingsFromState(state: SettingsInState): Settings {
    return {
        players: state.players,
        v0: Math.round(state.v0 * FPS * 180 / Math.PI),
        t: Math.round(getTime(state.acc, state.v0) / FPS)
    };
}

export function convertSettingsToState(settings: Settings): SettingsInState {
    const newV0 = (Math.PI * settings.v0 / 180) / FPS;
    const newAcc = - newV0 / (settings.t * FPS);

    return {
        players: settings.players,
        v0: newV0,
        acc: newAcc
    };
}
