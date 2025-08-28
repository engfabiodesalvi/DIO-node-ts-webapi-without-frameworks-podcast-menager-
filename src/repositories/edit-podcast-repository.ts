import fsPromises from "fs/promises";
import path from "path";
import { PodcastModel } from "../models/podcast-model";
import { isPodcastModel } from "../utils/is-podcastmodel-type";
import { isPartialPodcastModel } from "../utils/is-partial-podcastmodel-type";


const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryEditPodcast = async (
  queryString?: string | undefined,
  editPodcast?: PodcastModel
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: PodcastModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    //console.log(editPodcast?.length);
    //console.log(editPodcast);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if newPodcast is defined
      if (editPodcast !== undefined && await isPartialPodcastModel(editPodcast)) {

          const podcastSubs = editPodcast;
          //console.log(podcastAdd);
          // selecting podcast data
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          
          // checking if the podcast is already registered
          let itemMatch = false;
          jsonFile.forEach((podcast: PodcastModel) => {
              if (podcast.id === podcastSubs?.id) {
                  console.log("Id equal! Upsert!");
                  // edit podcast properties
                  for (let key in podcastSubs) {
                    podcast[key as keyof object] = podcastSubs[key as keyof object]; 
                  }
                //   podcast.name = podcastSubs .name;
                //   podcast.subscribers = podcastSubs.subscribers;
                //   podcast.author = podcastSubs.author;
                //   podcast.description = podcastSubs.description;
                //   podcast.cover_url = podcastSubs.cover_url;
                //   podcast.categories = podcastSubs.categories;
                  itemMatch = itemMatch || true;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
              }
          });
          
          // Add the podcast if it was not found
        //   if (!itemMatch) {
        //     console.log("item não cadastrado!");
        //     jsonFile.push(podcastSubs);
        //     console.log("item adicionado!");
        //   } else {
        //     console.log("item cadastrado!");              
        //   }

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
            if (podcast.id === editPodcast.id) {
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
