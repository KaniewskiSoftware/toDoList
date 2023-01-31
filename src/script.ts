{
    interface Task {
        content: string;
        done: boolean;
    }

    type Buttons = NodeListOf<HTMLButtonElement>;

    let tasks: Task[] = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent: string) => {
        tasks = [...tasks, {content: newTaskContent, done: false}];

        render();
    };

    const removeTask = (taskIndex: number) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

        render();
    };

    const toggleTaskStatus = (taskIndex: number) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const setAllTasksAsDone = () => {
        tasks = tasks.map((task) => ({...task, done: true}));

        render();
    };

    const toggleDoneTasksHidden = () => {
        if (tasks.some(({done}) => done)) hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done") as Buttons | null;
        if (toggleDoneButtons) {
            toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskStatus(taskIndex);
                });
            });
        }
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove") as Buttons | null;
        if (removeButtons) {
            removeButtons.forEach((removeButton, taskIndex) => {
                removeButton.addEventListener("click", () => {
                    removeTask(taskIndex);
                });
            });
        }
    };

    const bindToggleDoneTasksHiddenButton = () => {
        if (tasks.length) {
            const toggleDoneTasksHiddenButton = <HTMLButtonElement>document.querySelector(
                ".js-toggleDoneTasksHiddenButton"
            );

            toggleDoneTasksHiddenButton.addEventListener("click", () => {
                toggleDoneTasksHidden();
            });
        }
    };

    const bindSetAllTasksAsDoneButton = () => {
        if (tasks.length && !tasks.every((task) => task.done)) {
            const setAllTasksAsDoneButton = <HTMLButtonElement>document.querySelector(
                ".js-setAllTasksAsDoneButton"
            );

            setAllTasksAsDoneButton.addEventListener("click", () => {
                setAllTasksAsDone();
            });
        }
    };

    const renderTasks = () => {
        const taskToHTML = (task: Task) => `
      <li class="tasks__item 
      ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
        <button class="tasks__button tasks__button--toggleDone js-done">
        ${task.done ? "✔️" : ""}
        </button>
        <p class="tasks__text ${task.done ? "tasks__text--done" : ""}">
        ${task.content}</p>
        <button class="tasks__button tasks__button--remove js-remove">
          🗑️
        </button>
      </li>
      `;

        const tasksList = <HTMLUListElement>document.querySelector(".js-tasks");
        tasksList.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.length) {
            htmlString += `
      <button class="section__button js-toggleDoneTasksHiddenButton">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button 
      ${tasks.every(({done}) => done) ? "disabled" : ""} 
      class="section__button js-setAllTasksAsDoneButton">
      Ukończ wszystkie
      </button>
      `;
        }

        const sectionButtonBox = <HTMLDivElement>document.querySelector(".js-sectionButtonsBox");
        sectionButtonBox.innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindToggleDoneTasksHiddenButton();
        bindSetAllTasksAsDoneButton();
    };

    const clearTaskContent = () => {
        const form = <HTMLFormElement>document.querySelector(".js-form");
        form.reset();
    };

    const onFormSubmit = (event: Event) => {
        event.preventDefault();

        const newTaskContent = <HTMLInputElement>document.querySelector(".js-newTask");
        if (newTaskContent.value.trim() === "") {
            clearTaskContent();
            newTaskContent.focus();
            return;
        }

        addNewTask(newTaskContent.value.trim());
        clearTaskContent();
        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = <HTMLFormElement>document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
