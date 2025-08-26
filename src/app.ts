import * as http from "http";

import {
  getListPodcasts,
  getListEpisodes,
  setPodcast,
} from "./controllers/podscasts-controller";

import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";
import { ContentType } from "./utils/content-type";
import { StatusCode } from "./utils/status-code";
import { json } from "stream/consumers";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const baseUrl = request.url?.split("?")[0];
  const defaultContent = { "Content-Type": ContentType.JSON };

  let authorization = false;
  let body = '';

  //if (request.method === HttpMethod.GET) {

    // login data user 
    request.on('data', (chunk) => {
      body += chunk.toString(); // Convert Buffer chunks to string
    })
    request.on('end', async () => {
      // The entire body has been received      
      //console.log('Request body:', body); 

      // Parse the body if it's JSON, URL-encoded, etc.
      try {
          const parsedBody = JSON.parse(body);
          console.log('Parsed JSON body:', parsedBody);
          if (process.env.TOKEN == parsedBody.token
          ) {
            authorization = true;
          } else {
            authorization = false;
          }
          console.log(`Authorization: ${authorization}`);

          if (authorization) {
            // get methods
            if (request.method === HttpMethod.GET &&         // GET-List posdcast with or
                baseUrl === Routes.PODCAST_LIST) {           // without queryString
              await getListPodcasts(request, response);
            } else if (request.method === HttpMethod.GET &&  // GET-List episodes with or
                       baseUrl === Routes.EPISODE_LIST) {    // without queryString
              await getListEpisodes(request, response);
            } else if (request.method === HttpMethod.POST && // POST-Insert episode
                       baseUrl === Routes.PODCAST_ADD) {    // without queryString
              await setPodcast(request, response, parsedBody.newPodcast);
            } else {
              response.writeHead(StatusCode.NotFound, defaultContent);
              response.write(JSON.stringify({
                message: "Http method or url not found!",
                url: baseUrl}));
              response.end();
            }
          } else {
              response.writeHead(StatusCode.Forbidden, defaultContent);
              response.write(JSON.stringify({
                message: "Unauthorized access!"
              }));
              response.end();    
          }          

      } catch (e) {
          console.error('Error parsing JSON:', e);
              response.writeHead(StatusCode.Forbidden, defaultContent);
              response.write(JSON.stringify({
                message: "Unauthorized access! Error parsing JSON!"
              }));             
              response.end();             
      }
    })
  //}
};
