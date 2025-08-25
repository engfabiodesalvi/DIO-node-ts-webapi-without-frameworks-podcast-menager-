import { EpisodeModel } from "./episode-model";

export interface EpisodeTransferModel {
  statusCode: number;
  body: EpisodeModel[];
}
