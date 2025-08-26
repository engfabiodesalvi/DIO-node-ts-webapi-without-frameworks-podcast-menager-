import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { json } from "stream/consumers";
import { URLSearchParams } from "url";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcastAdd = async (
  queryString?: string | undefined,
  newPodcast?: PodcastModel
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);
  
  const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

  //console.log(newPodcast?.length);
  //console.log(newPodcast);

  if (queryStringParameters.size === 0) {    
    //console.log(typeof queryStringParameters);
    //console.log(queryStringParameters.get("name")?.toString());
    //console.log();

    if (newPodcast !== undefined) {
        const podcastAdd = newPodcast;
        //console.log(podcastAdd);
        jsonFile = jsonFile['podcasts'] as PodcastModel[];
        if (podcastAdd !== undefined) {

            if (!jsonFile.filter((podcast: PodcastModel) => {
                if (podcast.id === podcastAdd?.id) {
                    console.log("Id equal!");
                    return true;
                } else {
                    console.log("Id differ!");
                    return false;
                }

            }).length) {
              console.log("item não cadastrado");

              console.log("item adicionado");
            } else {
              console.log("item cadastrado");
            }
            
        }

    }
    

  } else {
    jsonFile = jsonFile['podcasts'];
    //console.log(JSON.stringify(jsonFile));    
  }

  return jsonFile;
};
