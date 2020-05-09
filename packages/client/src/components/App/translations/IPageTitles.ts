type IPageTitles = {
    [key in PageTitles]: string;
};

type PageTitles =
      "home"
    | "counter"
    | "programmingTasks"
    | "gift"
    | "timeCalculator"
    | "q"
    | "gamesAssistant"
    | "rentCalculator";

export default IPageTitles;
