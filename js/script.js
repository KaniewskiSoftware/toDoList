{
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="inventory__item">
              <button class="inventory__button"></button>
              <p class="inventory__text ${
                task.done ? "inventory__text--done" : ""
              }">${task.content}</p>
              <button class="inventory__button inventory__button--delete">
                🗑️
              </button>
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };
  //   ✔️

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
