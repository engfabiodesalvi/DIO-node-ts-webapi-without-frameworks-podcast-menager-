import fsPromises from "fs/promises";
import path from "path";
import { PodcastModel } from "../models/podcast-model";
import { isPodcastModel } from "../utils/is-podcastmodel-type";


const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryUpsertPodcast = async (
  queryString?: string | undefined,
  upsertPodcast?: PodcastModel
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
      if (upsertPodcast !== undefined && await isPodcastModel(upsertPodcast)) {

          const podcastAdd = upsertPodcast;
          //console.log(podcastAdd);
          // selecting podcast data
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          
          // checking if the podcast is already registered
          let itemMatch = false;
          jsonFile.forEach((podcast: PodcastModel) => {
              if (podcast.id === podcastAdd?.id) {
                  console.log("Id equal! Upsert!");
                  // upsert podcast properties
                  podcast.name = podcastAdd .name;
                  podcast.subscribers = podcastAdd.subscribers;
                  podcast.author = podcastAdd.author;
                  podcast.description = podcastAdd.description;
                  podcast.cover_url = podcastAdd.cover_url;
                  podcast.categories = podcastAdd.categories;
                  itemMatch = itemMatch || true;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
              }
          });
          
          // Add the podcast if it was not found
          if (!itemMatch) {
            console.log("item não cadastrado!");
            jsonFile.push(podcastAdd);
            console.log("item adicionado!");
          } else {
            console.log("item cadastrado!");              
          }

          newJsonFile['podcasts'] = jsonFile;
          const jsonString = JSON.stringify(newJsonFile, null, 2); // Stringify with pretty-printing

          // update de file
          await fsPromises.writeFile(pathData, jsonString, language);
            
          console.log('JSON data saved to data.json');              


          // reading the file
          rawData = await fsPromises.readFile(pathData, language);
          newJsonFile = JSON.parse(rawData);              
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          // checking if file was added
          jsonFile = jsonFile.filter((podcast)=> {
            if (podcast.id === upsertPodcast.id) {
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
