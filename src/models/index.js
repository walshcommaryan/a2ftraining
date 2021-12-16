// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Activity, Player, PlayerActivity } = initSchema(schema);

export {
  Activity,
  Player,
  PlayerActivity
};