import fsPromises from "fs/promises";
import path from "path";
import { EpisodeModel } from "../models/episode-model";
import { isEpisodeModel } from "../utils/is-episodemodel-type";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryAddEpisode = async (
  queryString?: string | undefined,
  newEpisode?: EpisodeModel
): Promise<EpisodeModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: EpisodeModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    console.log(newEpisode);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if newEpisode is defined
      if (newEpisode !== undefined && await isEpisodeModel(newEpisode)) {

          const episodeAdd = newEpisode;
          //console.log(episodeAdd);
          // selecting episode data
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          
          // checking if the episode is already registered
          let itemMatch = false;
          jsonFile.forEach((episode: EpisodeModel) => {
              if (episode.videoId === episodeAdd?.videoId) {
                  console.log("Id equal!");
                  itemMatch = itemMatch || true;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
              }
          });
          
          // Add the episode if it was not found
          if (!itemMatch) {
            console.log("item não cadastrado");
            jsonFile.push(episodeAdd);
            newJsonFile['episodes'] = jsonFile;
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
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          // checking if file was added
          jsonFile = jsonFile.filter((episode)=> {
            if (episode.videoId === newEpisode.videoId) {
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
