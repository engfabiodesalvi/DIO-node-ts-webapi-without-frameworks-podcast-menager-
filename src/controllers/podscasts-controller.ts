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
import { serviceUpsertPodcast } from "../services/uperset-podcast-service";
import { serviceUpsertEpisode } from "../services/uperset-episode-service";
import { serviceEditPodcast } from "../services/edit-podcast-podcast";
import { serviceEditEpisode } from "../services/edit-episode-service";
import { serviceDeletePodcast } from "../services/delete-podcast-service";
import { serviceDeleteEpisode } from "../services/delete-episode-service";

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

export const upsertPodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
  upsertPodcast: PodcastModel
) => {

  const content: PodcastTransferModel = await serviceUpsertPodcast(req.url, upsertPodcast);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();  
}

export const upsertEpisode = async (
  req: IncomingMessage,
  res: ServerResponse,
  upsertEpisode: EpisodeModel
) => {

  const content: EpisodeTransferModel = await serviceUpsertEpisode(req.url, upsertEpisode);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();    
}

export const editPodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
  editPodcast: PodcastModel
) => {

  const content: PodcastTransferModel = await serviceEditPodcast(req.url, editPodcast);
  
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();   
}

export const editEpisode = async (
  req: IncomingMessage,
  res: ServerResponse,
  editEpisode: EpisodeModel
) => {
 
  const content: EpisodeTransferModel = await serviceEditEpisode(req.url, editEpisode);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();   
}

export const deletePodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
  deletePodcast: PodcastModel
) => {

  const content: PodcastTransferModel = await serviceDeletePodcast(req.url, deletePodcast);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();   
}

export const deleteEpisode = async (
  req: IncomingMessage,
  res: ServerResponse,
  deleteEpisode: EpisodeModel
) => {
  
  const content: EpisodeTransferModel = await serviceDeleteEpisode(req.url, deleteEpisode);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();     
}