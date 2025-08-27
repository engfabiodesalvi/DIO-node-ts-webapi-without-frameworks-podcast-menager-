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
  let newJsonFile = JSON.parse(rawData);
  
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
        let jsonFile = newJsonFile['podcasts'] as PodcastModel[];
        let itemMatch = false;

        jsonFile.forEach((podcast: PodcastModel) => {
            if (podcast.id === podcastAdd?.id) {
                console.log("Id equal!");
                itemMatch = itemMatch || true;
            } else {
                console.log("Id differ!");
                itemMatch = itemMatch || false;
            }
        });
        
        if (podcastAdd !== undefined) {

            if (!itemMatch) {
              console.log("item não cadastrado");
              jsonFile.push(podcastAdd)
              newJsonFile['podcasts'] = jsonFile;
              const jsonString = JSON.stringify(newJsonFile, null, 2); // Stringify with pretty-printing

              fs.writeFile(pathData, jsonString, (err) => {
                if (err) {
                  console.error('Error writing file:', err);
                  return;
                }
                console.log('JSON data saved to data.json');
              });

              console.log("item adicionado");

            } else {
              console.log("item cadastrado");              
            }
            
        }

    }

  }

  return [newPodcast as PodcastModel];
};
