import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { json } from "stream/consumers";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
  podcastName?: string
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);
  
  podcastName = podcastName?.replace("%20", " ");

  console.log();

  if (podcastName) {
    jsonFile = jsonFile['podcasts'].filter(
      (podcast: PodcastModel) => podcast.name.includes(podcastName)
    );
  } else {
    jsonFile = jsonFile['podcasts'];
    console.log(JSON.stringify(jsonFile));    
  }

  return jsonFile;
};
