import fs from "fs";
import path from "path";

import { json } from "stream/consumers";
import { URLSearchParams } from "url";
import { EpisodeModel } from "../models/episode-model";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryEpisode = async (
  queryString?: string | undefined
): Promise<EpisodeModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);
  
  const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

  console.log(queryStringParameters);

  if (queryStringParameters.size > 0) {
    // console.log(typeof queryStringParameters);
    // console.log(queryStringParameters.get("description")?.toString());
    // console.log();
    jsonFile = jsonFile['episodes'].filter(
        (episode: EpisodeModel) => {
            

            // check if videoId is non-null value and check json registers
            if (queryStringParameters.get("videoId") || "" !== "") {
                if (!episode.videoId.includes(queryStringParameters.get("videoId") || "")) {
                    console.log(queryStringParameters.get("videoId") || "" !== "");
                    console.log(!episode.videoId.includes(queryStringParameters.get("videoId") || ""));
                    return false;
                }            
            }

            // check if podcastId is non-null value and check json registers
            if (queryStringParameters.get("podcastId") || "" !== "") {
                if (!episode.podcastId.includes(queryStringParameters.get("podcastId") || ""))
                    return false;
            }

            // check if title is non-null value and check json registers
            if (queryStringParameters.get("title") || "" !== "") {
                if (!episode.title.toLowerCase().includes(queryStringParameters.get("title")?.toLowerCase() || ""))
                    return false;
            }

            // check if description is non-null value and check json registers
            if (queryStringParameters.get("description") || "" !== "") {
                if (!episode.description.toLowerCase().includes(queryStringParameters.get("description")?.toLowerCase() || ""))
                    return false;
            }

            // check if duration is non-null value and check json registers             
            if (queryStringParameters.get("duration")?.split(",").length === 2) {
                const duration: number[] = [
                    parseInt(queryStringParameters.get("duration")?.split(",")[0] || "0"), // min
                    parseInt(queryStringParameters.get("duration")?.split(",")[1] || "0")  // max              
                ];               
                if (!(episode.duration >= duration[0] && episode.duration <= duration[1]))
                    return false;
            }          

            // check if release_date is non-null value and check json registers
            if (queryStringParameters.get("release_date") || "" !== "") {
                if (!episode.release_date.toLowerCase().includes(queryStringParameters.get("release_date")?.toLowerCase() || ""))
                    return false;
            }          

            // check if views is non-null value and check json registers
            if (parseInt(queryStringParameters.get("views") || "0") !== 0) {
                if (!(episode.views === parseInt(queryStringParameters.get("views") || "0")))
                    return false;
            }  

            // check if likes is non-null value and check json registers
            if (parseInt(queryStringParameters.get("likes") || "0") !== 0) {
                if (!(episode.likes === parseInt(queryStringParameters.get("likes") || "0")))
                    return false;
            }            

            // check tags is non-null value and check json registers
            if (queryStringParameters.get("tags") || "" !== "") {
                let findTags = true;
                episode.tags.forEach(item => {
                //console.log(item.toLowerCase().includes(queryStringParameters.get("author")?.toLowerCase() || ""));
                if (!item.includes(queryStringParameters.get("tags") || ""))
                    findTags = false || findTags;
                else
                    findTags = true;
                });
                if (!findTags) 
                return findTags;
            }

            // check if language is non-null value and check json registers
            if (queryStringParameters.get("language") || "" !== "") {
                if (!episode.language.toLowerCase().includes(queryStringParameters.get("language")?.toLowerCase() || ""))
                return false;
            } 

          return true;             
        }
    );
  } else {
    jsonFile = jsonFile['episodes'];
    console.log(JSON.stringify(jsonFile));    
  }

  return jsonFile;
};
