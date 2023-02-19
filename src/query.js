
export const getIssues = {
  query: `
    {
    viewer {
        issues(first: 10, states: OPEN) {
        pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
        }
        nodes {
            bodyText
            id
            url
            title
            number
            repository {
            id
            }
            projectCards(last: 1) {
            nodes {
                id
                state
                project {
                id
                name
                }
                column {
                name
                }
            }
            }
        }
        totalCount
        }
    }
}
`,
};

export const createIssues = `
    mutation($input: CreateIssueInput!) {
        createIssue(input: $input) {
            issue {
                id
                title
                bodyText
            }
        }
    }
`;

export const updateIssues = `
    mutation($issueId: ID!, $title: String!, $body: String!, $projectIds: [ID!]) {
        updateIssue(input: {id: $issueId, body: $body, title: $title, projectIds: $projectIds}) {
            issue {
                id
                title
                bodyText
            }
        }
    }
`;

export const deleteIssues = `
    mutation($issueId: ID!){
        updateIssue(input: {id: $issueId, state: CLOSED}) {
            issue {
                id
                title
                bodyText
            }
        }
    }
`;

export const getProjectColumn = {
  query: `
    {
    viewer {
        projects(states: OPEN, last: 1, search: "Dcard Homework Project") {
        nodes {
            columns(last: 10) {
            nodes {
                id
                name
            }
            }
            name
            id
        }
        }
    }
    }
  `,
};

export const updateProjectStatus = `
    mutation($input: MoveProjectCardInput!) {
        moveProjectCard(input: $input) {
            cardEdge {
            node {
                id
                state
                project {
                id
                name
                }
                column {
                name
                }
            }
            }
        }
    }
`;
