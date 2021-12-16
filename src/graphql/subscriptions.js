/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity {
    onCreateActivity {
      id
      name
      pointValue
      players {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity {
    onUpdateActivity {
      id
      name
      pointValue
      players {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity {
    onDeleteActivity {
      id
      name
      pointValue
      players {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      name
      score
      Activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
      id
      name
      score
      Activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
      id
      name
      score
      Activities {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePlayerActivity = /* GraphQL */ `
  subscription OnCreatePlayerActivity {
    onCreatePlayerActivity {
      id
      activityID
      playerID
      activity {
        id
        name
        pointValue
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      player {
        id
        name
        score
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePlayerActivity = /* GraphQL */ `
  subscription OnUpdatePlayerActivity {
    onUpdatePlayerActivity {
      id
      activityID
      playerID
      activity {
        id
        name
        pointValue
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      player {
        id
        name
        score
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePlayerActivity = /* GraphQL */ `
  subscription OnDeletePlayerActivity {
    onDeletePlayerActivity {
      id
      activityID
      playerID
      activity {
        id
        name
        pointValue
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      player {
        id
        name
        score
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
