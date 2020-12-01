export class Question {
  question: string;
  options: {
    showOrHide: boolean;
    chooseMultiple: boolean;
    limit: number; // number of options that can be chosen at the same time
    value: Array<string>;
  };
  showOrHideInputAnswer: boolean;
}
