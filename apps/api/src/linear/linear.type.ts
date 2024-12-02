export type Team = {
  id: string;
  name: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
};

export type Issue = {
  id: string;
  title: string;
  number: number;
  labels: Label[];
  team: Team;
};

export type Label = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  teams: {
    nodes: Team[];
  };
};

export type TeamResponse = {
  teams: {
    nodes: Team[];
  };
};

export type createIssueInput = {
  linear_ticket_title: string;
  linear_ticket_description?: string;
  linear_team_id: string;
  linear_assignee_id?: string;
  linear_ticket_label_id?: string;
  linear_ticket_state_id?: string;
  linear_cycle_id?: string;
};

export type createProjectInput = {
  linear_project_title: string;
  linear_project_description?: string;
  linear_team_id: string;
  linear_ticket_state_id?: string;
  linear_assignee_id?: string;
};

/*
{
  action: 'create',
      createdAt: '2023-02-07T10:47:11.434Z',
    data: {
  id: 'b2c4e702-1fba-47e1-8cdc-cda034a0c4ea',
      createdAt: '2023-02-07T10:46:10.476Z',
      updatedAt: '2023-02-07T10:46:10.477Z',
      archivedAt: '2023-02-07T10:47:11.434Z',
      number: 219,
      title: 'Test',
      priority: 0,
      boardOrder: 0,
      sortOrder: -82290,
      trashed: true,
      teamId: '34b08c67-0366-4cc0-8a32-07d481c045f1',
      cycleId: '9721192d-9ddc-4b09-a4f0-0623d9361b52',
      previousIdentifiers: [],
      creatorId: 'c9b836b4-c359-4f6f-8fa5-a0cb00d579ff',
      stateId: 'ecb31449-030d-4edf-bb42-5c693d7d897f',
      priorityLabel: 'No priority',
      subscriberIds: [ 'c9b836b4-c359-4f6f-8fa5-a0cb00d579ff' ],
      labelIds: [],
      cycle: {
    id: '9721192d-9ddc-4b09-a4f0-0623d9361b52',
        number: 3,
        name: 'Sprint 3',
        startsAt: '2023-01-29T23:00:00.000Z',
        endsAt: '2023-02-12T23:00:00.000Z'
  },
  state: {
    id: 'ecb31449-030d-4edf-bb42-5c693d7d897f',
        name: 'Ready',
        color: '#e2e2e2',
        type: 'unstarted'
  },
  team: {
    id: '34b08c67-0366-4cc0-8a32-07d481c045f1',
        name: 'Area',
        key: 'AREA'
  }
},
  type: 'Issue',
      organizationId: '933c57c4-818c-464a-bdb5-868e7ce68de1'
}
*/
