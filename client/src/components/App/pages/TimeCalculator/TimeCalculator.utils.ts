import { Language } from "src/models/enums";

export function getHourAndMinuteChars(language: Language): [string, string] {
    return language === Language.Ru ? ["ч", "м"] : ["h", "m"];
}
