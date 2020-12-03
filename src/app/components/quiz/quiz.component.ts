import { Component, OnInit } from "@angular/core";
import { Question } from "src/app/models/Question";
import { Answer } from "src/app/models/Answer";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  quiz: Array<Question>;
  currentQuestion: Question = new Question();
  currentQuestionIndex = 0;
  selectedOptions = [];
  answer: Array<Answer>;
  inputAnswer = "";

  constructor() {}

  ngOnInit(): void {
    this.quiz = [
      {
        question: "Do you have high fever",
        options: {
          showOrHide: true,
          chooseMultiple: false,
          limit: 0,
          value: ["Yes", "May Be", "Very little", "No"],
        },
        showOrHideInputAnswer: false,
      },
      {
        question: "b",
        options: {
          showOrHide: true,
          chooseMultiple: true,
          limit: 3,
          value: ["w", "x", "y", "z"],
        },
        showOrHideInputAnswer: false,
      },
      {
        question: "c",
        options: {
          showOrHide: false,
          chooseMultiple: true,
          limit: 3,
          value: ["w", "x", "y", "z"],
        },
        showOrHideInputAnswer: true,
      },
    ];

    this.currentQuestion = this.quiz[this.currentQuestionIndex];
    this.answer = [];
  }

  nextQuestion(): void {
    this.answer.push({
      question: this.currentQuestion.question,
      chosenOptions: this.selectedOptions,
      inputAnswer: this.inputAnswer,
    });
    this.selectedOptions = [];
    this.inputAnswer = "";
    this.currentQuestion = this.quiz[this.currentQuestionIndex + 1];
  }

  selectOption(selectedOption: string): void {
    if (this.currentQuestion.options.chooseMultiple) {
      // toggle an option; add it
      // and remove it with every click
      const limit = this.currentQuestion.options.limit;
      if (this.selectedOptions.includes(selectedOption)) {
        this.selectedOptions.splice(
          this.selectedOptions.indexOf(selectedOption),
          1
        );
      } else {
        if (this.selectedOptions.length < limit) {
          this.selectedOptions.push(selectedOption);
        }
        if (this.selectedOptions.length === limit) {
          this.nextQuestion();
        }
      }
    } else {
      this.selectedOptions.push(selectedOption);
      this.nextQuestion();
    }
  }

  collectAnswer(): void {
    this.nextQuestion();
  }

  highlightOption(selectedOption: string): object {
    return {
      "option-select": this.selectedOptions.includes(selectedOption),
    };
  }
}
