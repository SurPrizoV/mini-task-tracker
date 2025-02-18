export type Priority = 'low' | 'medium' | 'high';

export type Status = 'open' | 'in-progress' | 'completed' | 'deferred';

export type Assignee =
  | 'Frontend-developer'
  | 'Backend-developer'
  | 'QA-engineer'
  | 'Dev-ops'
  | 'Web-designer'
  | 'System-analytic';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  deadline: Date;
  priority: Priority;
  status: Status;
  assignees: Assignee[];
}
