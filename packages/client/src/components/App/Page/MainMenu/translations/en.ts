import MainMenuItem from "src/components/App/Page/MainMenu/MainMenuItem";

const en: {items: {[key in MainMenuItem]: string}} = {
    items:  {
        [MainMenuItem.Home]: "Home",
        [MainMenuItem.Counter]: "Counter",
        [MainMenuItem.TimeCalculator]: "Time Calculator",
        [MainMenuItem.GamesAssistant]: "Games Assistant"
    }
};

export default en;
