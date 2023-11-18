// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // 즉시 렌더링을 하기 위해서 생성자 함수 내부에서 실행해본다.
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredpeople = this.peopleInputElement.value;

    // 입력값이 비어있는지 검사
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredpeople.trim().length === 0
    ) {
      alert('유효하지 않는 입력값입니다. 다시 시도해주세용.');
      return;
    } else {
      return [enteredTitle, enteredDescription, parseInt(enteredpeople)];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHanlder(event: Event) {
    event.preventDefault(); //  기본 동작인 http 전송하는 양식 제출 방지
    const userInput = this.gatherUserInput();

    // ts에서는 튜플이지만, js에서는 그냥 배열일 뿐. 배열인지 검사
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      this.clearInputs();
      console.log(title, desc, people);
    }
  }

  /**
   * Event Listener
   */
  private configure() {
    this.element.addEventListener('submit', this.submitHanlder);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element); // html 요소를 삽입할 때 사용한다.
  }
}

const prjInput = new ProjectInput();
