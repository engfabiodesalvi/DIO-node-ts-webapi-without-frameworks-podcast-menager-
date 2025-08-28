import fsPromises from "fs/promises";
import path from "path";
import { PodcastModel } from "../models/podcast-model";
import { isPartialPodcastModel } from "../utils/is-partial-podcastmodel-type";


const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryDeletePodcast = async (
  queryString?: string | undefined,
  deletePodcast?: PodcastModel
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: PodcastModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    //console.log(deletePodcast?.length);
    //console.log(deleetePodcast);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if deletePodcast is defined
      if (deletePodcast !== undefined && await isPartialPodcastModel(deletePodcast)) {

          const podcastDelete = deletePodcast;
          //console.log(podcastDelete);
          // selecting podcast data
          jsonFile = newJsonFile['podcasts'] as PodcastModel[];
          
          // checking if the podcast is already registered
          let itemMatch = false;
          jsonFile = jsonFile.filter((podcast: PodcastModel) => {
              if (podcast.id === podcastDelete?.id) {
                  console.log("Id equal! Delete!");
                  // delete podcast properties
                    deletePodcast = podcast;
                //   podcast.name = podcastAdd .name;
                //   podcast.subscribers = podcastAdd.subscribers;
                //   podcast.author = podcastAdd.author;
                //   podcast.description = podcastAdd.description;
                //   podcast.cover_url = podcastAdd.cover_url;
                //   podcast.categories = podcastAdd.categories;                
                  itemMatch = itemMatch || true;
                  return false;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
                  return true;
              }
          });          

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
            if (podcast.id === deletePodcast?.id) {
              console.log("item id matched");
              return true;
            }              
          });            

      } else {
        return [];
      }
    } 
    
    return  (Object.keys(deletePodcast as PodcastModel).length > 1) ?
            [deletePodcast as PodcastModel] :
            [];

  } catch (error) {
    console.error(`Error performing file operations: ${error}`);
  }    
  return [];
};
