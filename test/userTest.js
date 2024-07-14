import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import {
  fetchUsers,
  fetchTodos,
  getFanCodeUsers,
  getUserTaskCompletion,
} from "../index.js";

describe("User Tasks Completion Tests", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should fetch users", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Leanne Graham",
        address: { geo: { lat: "-37.3159", lng: "81.1496" } },
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        address: { geo: { lat: "-31.8129", lng: "62.5342" } },
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        address: { geo: { lat: "-38.2386", lng: "57.2232" } },
      },
    ];
    axiosGetStub
      .withArgs("http://jsonplaceholder.typicode.com/users")
      .resolves({ data: mockUsers });

    const users = await fetchUsers();
    expect(users).to.deep.equal(mockUsers);
  });

  it("should fetch todos", async () => {
    const mockTodos = [
      { userId: 1, id: 1, title: "delectus aut autem", completed: true },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: true,
      },
      { userId: 1, id: 3, title: "fugiat veniam minus", completed: true },
      { userId: 1, id: 4, title: "et porro tempora", completed: true },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
      { userId: 5, id: 6, title: "task 1", completed: true },
      { userId: 5, id: 7, title: "task 2", completed: true },
      { userId: 5, id: 8, title: "task 3", completed: true },
      { userId: 5, id: 9, title: "task 4", completed: false },
      { userId: 5, id: 10, title: "task 5", completed: false },
      { userId: 10, id: 11, title: "task 6", completed: true },
      { userId: 10, id: 12, title: "task 7", completed: true },
      { userId: 10, id: 13, title: "task 8", completed: true },
      { userId: 10, id: 14, title: "task 9", completed: false },
      { userId: 10, id: 15, title: "task 10", completed: false },
    ];
    axiosGetStub
      .withArgs("http://jsonplaceholder.typicode.com/todos")
      .resolves({ data: mockTodos });

    const todos = await fetchTodos();
    expect(todos).to.deep.equal(mockTodos);
  });

  it("should filter users from FanCode city", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Leanne Graham",
        address: { geo: { lat: "-37.3159", lng: "81.1496" } },
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        address: { geo: { lat: "-31.8129", lng: "62.5342" } },
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        address: { geo: { lat: "-38.2386", lng: "57.2232" } },
      },
    ];

    const fanCodeUsers = getFanCodeUsers(mockUsers);
    expect(fanCodeUsers).to.deep.equal([
      mockUsers[0],
      mockUsers[1],
      mockUsers[2],
    ]);
  });

  it("should calculate user task completion percentage", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Leanne Graham",
        address: { geo: { lat: "-37.3159", lng: "81.1496" } },
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        address: { geo: { lat: "-31.8129", lng: "62.5342" } },
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        address: { geo: { lat: "-38.2386", lng: "57.2232" } },
      },
    ];
    const mockTodos = [
      { userId: 1, id: 1, title: "delectus aut autem", completed: true },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: true,
      },
      { userId: 1, id: 3, title: "fugiat veniam minus", completed: true },
      { userId: 1, id: 4, title: "et porro tempora", completed: true },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
      { userId: 5, id: 6, title: "task 1", completed: true },
      { userId: 5, id: 7, title: "task 2", completed: true },
      { userId: 5, id: 8, title: "task 3", completed: true },
      { userId: 5, id: 9, title: "task 4", completed: false },
      { userId: 5, id: 10, title: "task 5", completed: false },
      { userId: 10, id: 11, title: "task 6", completed: true },
      { userId: 10, id: 12, title: "task 7", completed: true },
      { userId: 10, id: 13, title: "task 8", completed: true },
      { userId: 10, id: 14, title: "task 9", completed: false },
      { userId: 10, id: 15, title: "task 10", completed: false },
    ];

    const userTaskCompletion = getUserTaskCompletion(mockUsers, mockTodos);
    expect(userTaskCompletion).to.deep.equal([
      { userId: 1, name: "Leanne Graham", taskCompletionPercentage: 80 },
      { userId: 5, name: "Chelsey Dietrich", taskCompletionPercentage: 60 },
      { userId: 10, name: "Clementina DuBuque", taskCompletionPercentage: 60 },
    ]);
  });

  it("should verify that all FanCode users have more than 50% of their todos completed", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Leanne Graham",
        address: { geo: { lat: "-37.3159", lng: "81.1496" } },
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        address: { geo: { lat: "-31.8129", lng: "62.5342" } },
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        address: { geo: { lat: "-38.2386", lng: "57.2232" } },
      },
    ];
    const mockTodos = [
      { userId: 1, id: 1, title: "delectus aut autem", completed: true },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: true,
      },
      { userId: 1, id: 3, title: "fugiat veniam minus", completed: true },
      { userId: 1, id: 4, title: "et porro tempora", completed: true },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
      { userId: 5, id: 6, title: "task 1", completed: true },
      { userId: 5, id: 7, title: "task 2", completed: true },
      { userId: 5, id: 8, title: "task 3", completed: true },
      { userId: 5, id: 9, title: "task 4", completed: false },
      { userId: 5, id: 10, title: "task 5", completed: false },
      { userId: 10, id: 11, title: "task 6", completed: true },
      { userId: 10, id: 12, title: "task 7", completed: true },
      { userId: 10, id: 13, title: "task 8", completed: true },
      { userId: 10, id: 14, title: "task 9", completed: false },
      { userId: 10, id: 15, title: "task 10", completed: false },
    ];

    axiosGetStub
      .withArgs("http://jsonplaceholder.typicode.com/users")
      .resolves({ data: mockUsers });
    axiosGetStub
      .withArgs("http://jsonplaceholder.typicode.com/todos")
      .resolves({ data: mockTodos });

    const users = await fetchUsers();
    const todos = await fetchTodos();
    const fanCodeUsers = getFanCodeUsers(users);
    const userTaskCompletion = getUserTaskCompletion(fanCodeUsers, todos);

    const result = userTaskCompletion.filter(
      (user) => user.taskCompletionPercentage > 50
    );

    expect(result.length).to.equal(fanCodeUsers.length);
    result.forEach((user) => {
      expect(user.taskCompletionPercentage).to.be.greaterThan(50);
    });
  });
});
