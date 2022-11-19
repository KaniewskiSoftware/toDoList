{
  let tasks = [
    {
      content: "Test",
      done: "false",
    },
  ];

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

  const bindEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskStatus(taskIndex);
      });
    });

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
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

    bindEvents();
  };

  const renderButtons = () => {};

  const render = () => {
    renderTasks();
    renderButtons();
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
