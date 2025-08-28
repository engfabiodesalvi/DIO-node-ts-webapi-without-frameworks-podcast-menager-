import * as http from "http";

import {
  getListPodcasts,
  getListEpisodes,
  addPodcast,
  addEpisode,
  upsertEpisode,
  upsertPodcast,
  editPodcast,
  editEpisode,
  deleteEpisode,
  deletePodcast,
} from "./controllers/podscasts-controller";

import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";
import { ContentType } from "./utils/content-type";
import { StatusCode } from "./utils/status-code";
import { json } from "stream/consumers";

let count = 0;

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const baseUrl = request.url?.split("?")[0];
  const defaultContent = { "Content-Type": ContentType.JSON };

  let authorization = false;
  let body = '';
  count++;

  console.log(`${count} - ${JSON.stringify(request.headers)}`);

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
            if (request.method === HttpMethod.GET &&            // GET-List posdcast with or
                baseUrl === Routes.PODCAST_LIST) {              // without queryString
              await getListPodcasts(request, response);
            } else if (request.method === HttpMethod.GET &&     // GET-List episodes with or
                       baseUrl === Routes.EPISODE_LIST) {       // without queryString
              await getListEpisodes(request, response);
            } else if (request.method === HttpMethod.POST &&    // POST-Insert podcast
                       baseUrl === Routes.PODCAST_ADD) {        // without queryString                
              await addPodcast(request, response, parsedBody.newPodcast);
            } else if (request.method === HttpMethod.POST &&    // POST-Insert episode
                       baseUrl === Routes.EPISODE_ADD) {        // without queryString                
              await addEpisode(request, response, parsedBody.newEpisode);              
            } else if (request.method === HttpMethod.PUT &&     // PUT-Edit or insert podcast
                       baseUrl === Routes.PODCAST_UPSERT) {     // without queryString                
              await upsertPodcast(request, response, parsedBody.upsertPodcast);              
            } else if (request.method === HttpMethod.PUT &&     // PUT-Edit or insert podcast
                       baseUrl === Routes.EPISODE_UPSERT) {     // without queryString                
              await upsertEpisode(request, response, parsedBody.upsertEpisode);              
            } else if (request.method === HttpMethod.PATCH &&     // PATCH-Edit podcast
                       baseUrl === Routes.PODCAST_EDIT) {     // without queryString                
              await editPodcast(request, response, parsedBody.editPodcast);              
            } else if (request.method === HttpMethod.PATCH &&     // PATCH-Edit podcast
                       baseUrl === Routes.EPISODE_EDIT) {     // without queryString                
              await editEpisode(request, response, parsedBody.editEpisode);              
            } else if (request.method === HttpMethod.DELETE &&     // DELETE-Delete podcast
                       baseUrl === Routes.PODCAST_DELETE) {     // without queryString                
              await deletePodcast(request, response, parsedBody.deletePodcast);              
            } else if (request.method === HttpMethod.DELETE &&     // DELETE-Delete podcast
                       baseUrl === Routes.EPISODE_DELETE) {     // without queryString                
              await deleteEpisode(request, response, parsedBody.deleteEpisode);              
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
          console.error('Unespected error:', e);
              response.writeHead(StatusCode.InternalServerError, defaultContent);
              response.write(JSON.stringify({
                message: `Unespected error: ${e}`
              }));             
              response.end();             
      }
    })
  //}
};
