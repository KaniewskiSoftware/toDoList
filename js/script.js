{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskStatus = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskStatus(taskIndex);
      });
    });
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneTasksHiddenButton = () => {
    if (tasks.length) {
      const toggleDoneTasksHiddenButton = document.querySelector(
        ".js-toggleDoneTasksHiddenButton"
      );
      toggleDoneTasksHiddenButton.addEventListener("click", () => {
        toggleDoneTasksHidden();
      });
    }
  };

  const bindSetAllTasksAsDoneButton = () => {
    if (tasks.length) {
      const setAllTasksAsDoneButton = document.querySelector(
        ".js-setAllTasksAsDoneButton"
      );
      setAllTasksAsDoneButton.addEventListener("click", () => {
        setAllTasksAsDone();
      });
    }
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="tasks__item">
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
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlString = "";

    if (tasks.length) {
      htmlString += `
      <button class="section__button js-toggleDoneTasksHiddenButton">
      Ukryj ukończone
      </button>
      <button class="section__button js-setAllTasksAsDoneButton">
      Ukończ wszystkie
      </button>
      `;
    }

    document.querySelector(".js-sectionButtonsBox").innerHTML = htmlString;
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
    const form = document.querySelector(".js-form");
    form.reset();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask");
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

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
