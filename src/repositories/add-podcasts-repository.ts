import fsPromises from "fs/promises";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { json } from "stream/consumers";
import { URLSearchParams } from "url";
import { isPodcastModel } from "../utils/is-podcastmodel-type";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryAddPodcast = async (
  queryString?: string | undefined,
  newPodcast?: PodcastModel
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: PodcastModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    //console.log(newPodcast?.length);
    //console.log(newPodcast);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if newPodcast is defined
      if (newPodcast !== undefined && await isPodcastModel(newPodcast)) {

          const podcastAdd = newPodcast;
          //console.log(podcastAdd);
          // selecting podcast data
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          
          // checking if the podcast is already registered
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
          
          // Add the podcast if it was not found
          if (!itemMatch) {
            console.log("item não cadastrado");
            jsonFile.push(podcastAdd);
            newJsonFile['podcasts'] = jsonFile;
            const jsonString = JSON.stringify(newJsonFile, null, 2); // Stringify with pretty-printing

            // update de file
            await fsPromises.writeFile(pathData, jsonString, language);
            
            console.log('JSON data saved to data.json');              
            console.log("item adicionado");

          } else {
            console.log("item cadastrado");              
          }

          // reading the file
          rawData = await fsPromises.readFile(pathData, language);
          newJsonFile = JSON.parse(rawData);              
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          // checking if file was added
          jsonFile = jsonFile.filter((podcast)=> {
            if (podcast.id === newPodcast.id) {
              console.log("item id matched");
              return true;
            }              
          });            

      }
    } 
    
    return jsonFile;

  } catch (error) {
    console.error(`Error performing file operations: ${error}`);
  }    
  return [];
};
