import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { json } from "stream/consumers";
import { URLSearchParams } from "url";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
  queryString?: string | undefined
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);
  
  const queryStringParameters = new URLSearchParams(queryString?.split("?")[1] || "");

  //console.log(queryStringParameters);

  if (queryStringParameters.size > 0) {
    //console.log(typeof queryStringParameters);
    //console.log(queryStringParameters.get("name")?.toString());
    //console.log();
    jsonFile = jsonFile['podcasts'].filter(
        (podcast: PodcastModel) => {

          // check if id is non-null value and check json registers
          if (queryStringParameters.get("id") || "" !== "") {
            if (!podcast.id.includes(queryStringParameters.get("id") || ""))
              return false;
          }

          // check if name is non-null value and check json registers
          if (queryStringParameters.get("name") || "" !== "") {
            if (!podcast.name.toLowerCase().includes(queryStringParameters.get("name")?.toLowerCase() || ""))
              return false;
          }

          // check author name is non-null value and check json registers
          if (queryStringParameters.get("author") || "" !== "") {
            let findAuthor = true;
            podcast.author.forEach(item => {
              //console.log(item.toLowerCase().includes(queryStringParameters.get("author")?.toLowerCase() || ""));
              if (!item.includes(queryStringParameters.get("author") || ""))
                findAuthor = false || findAuthor;
              else
                findAuthor = true;
            });
            if (!findAuthor) 
              return findAuthor;
          }

          // check if subscribers is non-null value and check json registers
          if (queryStringParameters.get("subscribers")?.split(",").length === 2) {
              const subscribers: number[] = [
                  parseInt(queryStringParameters.get("subscribers")?.split(",")[0] || "0"), // min
                  parseInt(queryStringParameters.get("subscribers")?.split(",")[1] || "0")  // max              
              ];               
              if (!(podcast.subscribers >= subscribers[0] && podcast.subscribers <= subscribers[1]))
                  return false;
          }            

          // check if description is non-null value and check json registers
          if (queryStringParameters.get("description") || "" !== "") {
            if (!podcast.description.toLowerCase().includes(queryStringParameters.get("description")?.toLowerCase() || ""))
              return false;
          }

          // check if cover_url is non-null value and check json registers
          if (queryStringParameters.get("cover_url") || "" !== "") {
            if (!podcast.cover_url.includes(queryStringParameters.get("cover_url") || ""))
              return false;
          }

          // check if categories is non-null value and check json registers
          if (queryStringParameters.get("categories") || "" !== "") {
            let findCategories = false;
            podcast.categories.forEach(item => {
              //console.log(item.toLowerCase().includes(queryStringParameters.get("categories")?.toLowerCase() || ""));
              if (!item.includes(queryStringParameters.get("categories") || ""))
                findCategories = false || findCategories;
              else
                findCategories = true
            });
            if (!findCategories) 
              return findCategories;            
          }
    
          return true;             
        }
    );
  } else {
    jsonFile = jsonFile['podcasts'];
    console.log(JSON.stringify(jsonFile));    
  }

  return jsonFile;
};
