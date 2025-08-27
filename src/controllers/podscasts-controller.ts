import { IncomingMessage, ServerResponse } from "http";

import { serviceListPodcasts } from "../services/filter-podcasts-service";
import { serviceListEpisodes } from "../services/filter-epsodes-service";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { EpisodeTransferModel } from "../models/episode-transfer-model";
import { serviceAddPodcast } from "../services/add-podcast-service";
import { PodcastModel } from "../models/podcast-model";
import { EpisodeModel } from "../models/episode-model";
import { serviceAddEpisode } from "../services/add-episode-service";

const defaultContent = { "Content-Type": ContentType.JSON };

export const getListPodcasts = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  
  const content: PodcastTransferModel = await serviceListPodcasts(req.url);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};

export const getListEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {

  const content: EpisodeTransferModel = await serviceListEpisodes(req.url);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};

export const addPodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
  newPodcast: PodcastModel
) => {

  const content: PodcastTransferModel = await serviceAddPodcast(req.url, newPodcast);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();

};

export const addEpisode = async (
  req: IncomingMessage,
  res: ServerResponse,
  newEpisode: EpisodeModel
) => {

  const content: EpisodeTransferModel = await serviceAddEpisode(req.url, newEpisode);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
}
