import { Position } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";

export const GIRL_IMAGE_HEIGHT = 160;
export const GIRL_IMAGE_WIDTH = 160;

export const BOUQUET_IMAGE_WIDTH = 128;
export const BOUQUET_IMAGE_HEIGHT = 128;

export const RADIUS = 320;

export const WHEEL_WIDTH = RADIUS * 2 + GIRL_IMAGE_HEIGHT;
export const WHEEL_HEIGHT = RADIUS * 2 + GIRL_IMAGE_WIDTH;

export const WHEEL_CENTER: Position = {
    left: WHEEL_WIDTH / 2,
    top: WHEEL_HEIGHT / 2
};

export const BRIDE_IMAGE_POSITION: Position = {
    left: RADIUS - BOUQUET_IMAGE_WIDTH / 2,
    top: RADIUS
};

export const BOUQUET_IMAGE_POSITION: Position = {
    left: RADIUS + GIRL_IMAGE_WIDTH - BOUQUET_IMAGE_WIDTH / 2,
    top: RADIUS + (GIRL_IMAGE_HEIGHT - BOUQUET_IMAGE_HEIGHT) / 2
};
