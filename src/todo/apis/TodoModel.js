class CreateToDo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

class ToDo {
  constructor(
    title,
    description,
    scheduled,
    completed,
    completed_at,
    id,
    scheduled_to
  ) {
    this.title = title;
    this.description = description;
    this.scheduled = scheduled;
    this.completed = completed;
    this.completed_at = completed_at;
    this.id = id;
    this.scheduled_to = scheduled_to;
  }
}

export { CreateToDo, ToDo };
