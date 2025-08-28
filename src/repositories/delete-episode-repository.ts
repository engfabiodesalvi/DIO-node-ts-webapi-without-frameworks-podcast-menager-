import fsPromises from "fs/promises";
import path from "path";
import { EpisodeModel } from "../models/episode-model";
import { isPartialEpisodeModel } from "../utils/is-partial-episodemodel-type";


const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryDeleteEpisode = async (
  queryString?: string | undefined,
  deleteEpisode?: EpisodeModel
): Promise<EpisodeModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: EpisodeModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    //console.log(deleteEpisode?.length);
    //console.log(deleeteEpisode);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if deleteEpisode is defined
      if (deleteEpisode !== undefined && await isPartialEpisodeModel(deleteEpisode)) {

          const episodeDelete = deleteEpisode;
          //console.log(episodeDelete);
          // selecting episode data
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          
          // checking if the podcast is already registered
          let itemMatch = false;
          jsonFile = jsonFile.filter((episode: EpisodeModel) => {
              if (episode.videoId === episodeDelete?.videoId) {
                  console.log("Id equal! Delete!");
                  // delete episode properties
                    deleteEpisode = episode;               
                  itemMatch = itemMatch || true;
                  return false;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
                  return true;
              }
          });          

          newJsonFile['episodes'] = jsonFile;
          const jsonString = JSON.stringify(newJsonFile, null, 2); // Stringify with pretty-printing

          // update de file
          await fsPromises.writeFile(pathData, jsonString, language);
            
          console.log('JSON data saved to data.json');              


          // reading the file
          rawData = await fsPromises.readFile(pathData, language);
          newJsonFile = JSON.parse(rawData);              
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          // checking if file was added
          jsonFile = jsonFile.filter((episode)=> {
            if (episode.videoId === deleteEpisode?.videoId) {
              console.log("item id matched");
              return true;
            }              
          });            

      } else {
        return [];
      }
    } 
    
    return  (Object.keys(deleteEpisode as EpisodeModel).length > 1) ?
            [deleteEpisode as EpisodeModel] :
            [];

  } catch (error) {
    console.error(`Error performing file operations: ${error}`);
  }    
  return [];
};
