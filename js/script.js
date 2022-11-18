{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskStatus = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="inventory__item">
              <button class="inventory__button js-done">${
                task.done ? "✔️" : ""
              }</button>
              <p class="inventory__text ${
                task.done ? "inventory__text--done" : ""
              }">${task.content}</p>
              <button class="inventory__button inventory__button--remove js-remove">
                🗑️
              </button>
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
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
