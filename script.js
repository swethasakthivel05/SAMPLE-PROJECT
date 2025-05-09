document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
    saveTasks();
  });

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      saveTasks();
    });
    document.getElementById("taskList").appendChild(li);
  });
}
