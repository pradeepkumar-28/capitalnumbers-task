export const generateDataSourceOptions = (tasks, employees) => {
  return tasks.map((task) => {
    const assignedEmployee = employees.find(
      (employee) => task.Task_Assigned_Employee_ID === employee.ID
    );
    // If an employee is found with a matching ID, assign it to Task_Assigned_Employee property
    if (assignedEmployee) {
      return { ...task, Task_Assigned_Employee: assignedEmployee };
    }
    // If no matching employee is found, return the original task
    return task;
  });
};
