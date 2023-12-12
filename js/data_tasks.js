const columns = ["Todo", "InProgress", "AwaitFeedback", "Done"];
const urgencies = ['low', 'medium', 'urgent']

/**
 * This array is needed to restore the test tasks.
 * 
 */
let dataTasks = [
  // {
  //   id: 0,
  //   position: "Todo",
  //   category: "User Story",
  //   title: "Hier ist eine User Story",
  //   task: "Das ist der erste Task",
  //   subtasks: [
  //     {
  //       content: "Ein Subtask ensteht hier",
  //       checked: false,
  //     },
  //   ],
  //   assignedTo: [1, 2, 5],
  //   urgency: "urgent",
  //   date: "03.02.2023",
  // },
  // {
  //   id: 1,
  //   position: "AwaitFeedback",
  //   category: "Technical Task",
  //   title: "Hier ist ein technischer Task",
  //   task: "Baue eine neue schöne Kochweltseite",
  //   subtasks: [],
  //   assignedTo: [5],
  //   urgency: "medium",
  //   date: "09.11.2023",
  // },
  // {
  //   id: 2,
  //   position: "AwaitFeedback",
  //   category: "User Story",
  //   title: "Kochwelt Rezepte",
  //   task: "Baue eine neue schöne Kochweltseite",
  //   subtasks: [
  //     {
  //       content: "Ein Subtask ensteht hier",
  //       checked: true,
  //     },
  //     {
  //       content: "Ein Subtask zwei ensteht hier",
  //       checked: true,
  //     },
  //     {
  //       content: "Ein Subtask drei ensteht hier",
  //       checked: false,
  //     },
  //   ],
  //   assignedTo: [],
  //   urgency: "low",
  //   date: "14.11.2023",
  // },
  // {
  //   id: 3,
  //   position: "Todo",
  //   category: "User Story",
  //   title: "Kochwelt Rezepte",
  //   task: "Baue eine neue schöne Kochweltseite",
  //   subtasks: [
  //     {
  //       content: "Ein Subtask ensteht hier",
  //       checked: false,
  //     },
  //   ],
  //   assignedTo: [6],
  //   urgency: "urgent",
  //   date: "01.12.2024",
  // },
];
