import { Position } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";
import { getAccBySpeedAndTime } from "src/components/App/pages/wedding/Bouquet/movementUtils";

export const GIRL_IMAGE_HEIGHT = 160;
export const GIRL_IMAGE_WIDTH = 160;

export const BOUQUET_IMAGE_WIDTH = 128;
export const BOUQUET_IMAGE_HEIGHT = 128;

export const RADIUS = 320;
export const BOUQUET_SPIN_RADIUS = (GIRL_IMAGE_WIDTH + BOUQUET_IMAGE_WIDTH) / 2;

export const WHEEL_WIDTH = RADIUS * 2 + GIRL_IMAGE_HEIGHT;
export const WHEEL_HEIGHT = RADIUS * 2 + GIRL_IMAGE_WIDTH;

export const WHEEL_CENTER: Position = {
    left: WHEEL_WIDTH / 2,
    top: WHEEL_HEIGHT / 2
};

export const BRIDE_IMAGE_POSITION: Position = {
    left: RADIUS,
    top: RADIUS
};

export const FPS = 60;

export const GIRLS_COUNT = 5;

const V0_GRAD_PER_SEC = 120;
export const V0 = (Math.PI * V0_GRAD_PER_SEC / 180) / FPS; // rad per frame
export const SPIN_DURATION =  FPS * 10; // frames
export const ACC = getAccBySpeedAndTime(V0, SPIN_DURATION);
