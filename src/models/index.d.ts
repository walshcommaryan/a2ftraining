import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ActivityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlayerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlayerActivityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Activity {
  readonly id: string;
  readonly name?: string;
  readonly pointValue?: number;
  readonly players?: (PlayerActivity | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Activity, ActivityMetaData>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity, ActivityMetaData>) => MutableModel<Activity, ActivityMetaData> | void): Activity;
}

export declare class Player {
  readonly id: string;
  readonly name?: string;
  readonly score?: number;
  readonly Activities?: (PlayerActivity | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Player, PlayerMetaData>);
  static copyOf(source: Player, mutator: (draft: MutableModel<Player, PlayerMetaData>) => MutableModel<Player, PlayerMetaData> | void): Player;
}

export declare class PlayerActivity {
  readonly id: string;
  readonly activity: Activity;
  readonly player: Player;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PlayerActivity, PlayerActivityMetaData>);
  static copyOf(source: PlayerActivity, mutator: (draft: MutableModel<PlayerActivity, PlayerActivityMetaData>) => MutableModel<PlayerActivity, PlayerActivityMetaData> | void): PlayerActivity;
}