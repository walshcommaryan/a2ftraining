/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
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
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
export const createPlayerActivity = /* GraphQL */ `
  mutation CreatePlayerActivity(
    $input: CreatePlayerActivityInput!
    $condition: ModelPlayerActivityConditionInput
  ) {
    createPlayerActivity(input: $input, condition: $condition) {
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
export const updatePlayerActivity = /* GraphQL */ `
  mutation UpdatePlayerActivity(
    $input: UpdatePlayerActivityInput!
    $condition: ModelPlayerActivityConditionInput
  ) {
    updatePlayerActivity(input: $input, condition: $condition) {
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
export const deletePlayerActivity = /* GraphQL */ `
  mutation DeletePlayerActivity(
    $input: DeletePlayerActivityInput!
    $condition: ModelPlayerActivityConditionInput
  ) {
    deletePlayerActivity(input: $input, condition: $condition) {
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
