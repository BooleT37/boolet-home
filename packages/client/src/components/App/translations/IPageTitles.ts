type IPageTitles = {
    [key in PageTitles]: string;
};

type PageTitles =
      "home"
    | "counter"
    | "tasks"
    | "gift"
    | "timeCalculator"
    | "q"
    | "gamesAssistant"
    | "rentCalculator";

export default IPageTitles;
