import fsPromises from "fs/promises";
import path from "path";
import { EpisodeModel } from "../models/episode-model";
import { isEpisodeModel } from "../utils/is-episodemodel-type";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryUpsertEpisode = async (
  queryString?: string | undefined,
  upsertEpisode?: EpisodeModel
): Promise<EpisodeModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: EpisodeModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    console.log(upsertEpisode);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if newEpisode is defined
      if (upsertEpisode !== undefined && await isEpisodeModel(upsertEpisode)) {

          const episodeAdd = upsertEpisode;
          //console.log(episodeAdd);
          // selecting episode data
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          
          // checking if the episode is already registered
          let itemMatch = false;
          jsonFile.forEach((episode: EpisodeModel) => {
              if (episode.videoId === episodeAdd?.videoId) {
                    console.log("Id equal! Upsert!");
                    // upsert episode properties
                    episode.videoId = episodeAdd.videoId;
                    episode.podcastId = episodeAdd.podcastId;
                    episode.title = episodeAdd.title;
                    episode.description = episodeAdd.description;
                    episode.duration = episodeAdd.duration;
                    episode.release_date = episodeAdd.release_date;
                    episode.views = episodeAdd.views;
                    episode.likes = episodeAdd.likes;
                    episode.categories = episodeAdd.categories;
                    episode.language = episodeAdd.language;

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
            console.log("item adicionado");
          } else {
            console.log("item cadastrado");              
          }

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
            if (episode.videoId === upsertEpisode.videoId) {
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
