import fsPromises from "fs/promises";
import path from "path";
import { EpisodeModel } from "../models/episode-model";
import { isPartialEpisodeModel } from "../utils/is-partial-episodemodel-type";


const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryEditEpisode = async (
  queryString?: string | undefined,
  editEpisode?: EpisodeModel
): Promise<EpisodeModel[]> => {
  const language = "utf-8";

  try {
    let rawData = await fsPromises.readFile(pathData, language);
    let newJsonFile = JSON.parse(rawData);
    let jsonFile: EpisodeModel[] = [];

    const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

    //console.log(editEpisde?.length);
    //console.log(editEpisode);

    // checking if it has no arguments
    if (queryStringParameters.size === 0) {    
      //console.log(typeof queryStringParameters);
      //console.log(queryStringParameters.get("name")?.toString());
      //console.log();

      // checking if editEpisde is defined
      if (editEpisode !== undefined && await isPartialEpisodeModel(editEpisode)) {

          const episodeSubs = editEpisode;
          //console.log(podcastAdd);
          // selecting podcast data
          jsonFile = newJsonFile['episodes'] as EpisodeModel[];
          
          // checking if the episode is already registered
          let itemMatch = false;
          jsonFile.forEach((episode: EpisodeModel) => {
              if (episode.videoId === episodeSubs?.videoId) {
                  console.log("Id equal! Edit!");
                  // edit episode properties
                  for (let key in episodeSubs) {
                    episode[key as keyof object] = episodeSubs[key as keyof object]; 
                  }

                  itemMatch = itemMatch || true;
              } else {
                  console.log("Id differ!");
                  itemMatch = itemMatch || false;
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
            if (episode.videoId === editEpisode.videoId) {
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
