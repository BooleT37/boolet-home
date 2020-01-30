import { Position, Player, Settings } from "./Bouquet.models";

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

const V0_GRAD_PER_SEC = 120;

export const DEFAULT_PLAYERS: Player[] = [
    { name: "Игрок 1", imageIndex: 1 },
    { name: "Игрок 2", imageIndex: 2 },
    { name: "Игрок 3", imageIndex: 3 },
    { name: "Игрок 4", imageIndex: 4 },
    { name: "Игрок 5", imageIndex: 5 }
];

export const DEFAULT_SETTINGS: Settings = {
    players: DEFAULT_PLAYERS,
    v0: V0_GRAD_PER_SEC,
    t: 10
};

export const SETTINGS_LOCAL_STORAGE_KEY = "bouquet-settings";
