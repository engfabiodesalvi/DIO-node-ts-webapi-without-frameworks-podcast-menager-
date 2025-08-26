import { IncomingMessage, ServerResponse } from "http";

import { serviceListPodcasts } from "../services/filter-podcasts-service";
import { serviceListEpisodes } from "../services/filter-epsodes-service";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { EpisodeTransferModel } from "../models/episode-transfer-model";
import { serviceAddPodcasts } from "../services/add-podcast-service";
import { PodcastModel } from "../models/podcast-model";

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

export const setPodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
  body: PodcastModel
) => {
  const content: PodcastTransferModel = await serviceAddPodcasts(req.url, body);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();

};
