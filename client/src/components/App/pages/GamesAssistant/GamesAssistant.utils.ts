import GameModel from "serverModels/GameModel";

export function getErrorMessage(e: any): string {
    let message = "";
    if (e.status) {
        message += ` [${e.status}]`;
    }
    if (e.message) {
        message += `: ${e.message}`;
    } else if (e.data && e.data.error && e.data.error !== true) {
        message += `: ${e.data.error}`;
    } else if (e.statusText) {
        message += `: ${e.statusText}`;
    }
    return message;
}

export function areGamesEqual(game1: GameModel, game2: GameModel): boolean {
    return game1.id === game2.id;
}

type AreItemsEqualFn<TItem> = (item1: TItem, item2: TItem) => boolean;

export function getCommonElements<TItem>(list: TItem[][], areItemsEqual: AreItemsEqualFn<TItem>): TItem[] {
    if (list.length === 0) {
        return [];
    }
    return getCommonElementsRecursive(list[0], list.slice(1), areItemsEqual);
}

function getCommonElementsRecursive<TItem>(
    currentList: TItem[],
    remainingLists: TItem[][],
    areItemsEqual: AreItemsEqualFn<TItem>
): TItem[] {
    if (remainingLists.length === 0) {
        return currentList;
    }
    return getCommonElementsRecursive(
        getCommonElementsOfTwoLists(currentList, remainingLists[0], areItemsEqual),
        remainingLists.slice(1),
        areItemsEqual
    );
}

function getCommonElementsOfTwoLists<TItem>(
    list1: TItem[],
    list2: TItem[],
    areItemsEqual: AreItemsEqualFn<TItem>
): TItem[] {
    return list1.filter(el1 => list2.some(el2 => areItemsEqual(el1, el2)));
}
