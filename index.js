import axios from "axios";

const BASE_URL = "http://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
}

export async function fetchTodos() {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
}

export function getFanCodeUsers(users) {
  return users.filter((user) => {
    const lat = parseFloat(user.address.geo.lat);
    const lng = parseFloat(user.address.geo.lng);
    return lat >= -40 && lat <= 5 && lng >= 5 && lng <= 100;
  });
}

export function getUserTaskCompletion(users, todos) {
  return users.map((user) => {
    const userTodos = todos.filter((todo) => todo.userId === user.id);
    const completedTasks = userTodos.filter((todo) => todo.completed).length;
    const taskCompletionPercentage = (completedTasks / userTodos.length) * 100;
    return {
      userId: user.id,
      name: user.name,
      taskCompletionPercentage,
    };
  });
}

async function main() {
  try {
    const users = await fetchUsers();
    const todos = await fetchTodos();
    const fanCodeUsers = getFanCodeUsers(users);
    const userTaskCompletion = getUserTaskCompletion(fanCodeUsers, todos);

    const result = userTaskCompletion.filter(
      (user) => user.taskCompletionPercentage > 50
    );
    console.log(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();
