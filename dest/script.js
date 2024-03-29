"use strict";
{
    let tasks = [];
    let hideDoneTasks = false;
    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent, done: false }];
        render();
    };
    const removeTask = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
        render();
    };
    const toggleTaskStatus = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            Object.assign(Object.assign({}, tasks[taskIndex]), { done: !tasks[taskIndex].done }),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const setAllTasksAsDone = () => {
        tasks = tasks.map((task) => (Object.assign(Object.assign({}, task), { done: true })));
        render();
    };
    const toggleDoneTasksHidden = () => {
        if (tasks.some(({ done }) => done))
            hideDoneTasks = !hideDoneTasks;
        render();
    };
    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        if (toggleDoneButtons) {
            toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskStatus(taskIndex);
                });
            });
        }
    };
    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
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
            const toggleDoneTasksHiddenButton = document.querySelector(".js-toggleDoneTasksHiddenButton");
            toggleDoneTasksHiddenButton.addEventListener("click", () => {
                toggleDoneTasksHidden();
            });
        }
    };
    const bindSetAllTasksAsDoneButton = () => {
        if (tasks.length && !tasks.every((task) => task.done)) {
            const setAllTasksAsDoneButton = document.querySelector(".js-setAllTasksAsDoneButton");
            setAllTasksAsDoneButton.addEventListener("click", () => {
                setAllTasksAsDone();
            });
        }
    };
    const renderTasks = () => {
        const taskToHTML = (task) => `
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
        const tasksList = document.querySelector(".js-tasks");
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
      ${tasks.every(({ done }) => done) ? "disabled" : ""} 
      class="section__button js-setAllTasksAsDoneButton">
      Ukończ wszystkie
      </button>
      `;
        }
        const sectionButtonBox = document.querySelector(".js-sectionButtonsBox");
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
