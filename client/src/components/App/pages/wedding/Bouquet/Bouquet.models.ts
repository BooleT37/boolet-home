export interface Position {
    top: number;
    left: number;
}

export interface Player {
    name: string;
    imageIndex: number;
}

export interface Settings {
    players: Player[];
    v0: number;
    t: number;
}

export interface SettingsInState {
    players: Player[];
    v0: number;
    acc: number;
}
