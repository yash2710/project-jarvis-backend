export const StatusValues = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  COMPLETED: 'completed',
} as const;

export type Status = typeof StatusValues[keyof typeof StatusValues];

export type ProjectSummaryResponse = {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    members: string[];
    status: Status;
}

export type ProjectDetailsResponse = ProjectSummaryResponse & {

}

export type CreateProjectRequest = {
    name: string;
    description?: string;
    ownerId: string;
    members: string[];
}

export type UpdateProjectRequest = CreateProjectRequest & {
    id: string;
}

export type DeleteProjectRequest = {
    id: string;
}
