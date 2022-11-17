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
              <p class="inventory__text">${task.content}</p>
              <button class="inventory__button inventory__button--delete">
                🗑️
              </button>
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };
  //   ✔️
  const init = () => {
    render();
  };

  init();
}
