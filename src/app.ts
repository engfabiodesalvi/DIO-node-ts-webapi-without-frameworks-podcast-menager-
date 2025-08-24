import * as http from "http";

import {
  getListPodcasts,
  getFilterEpisodes,
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

  let login = false;
  let body = '';

  //if (request.method === HttpMethod.GET) {

    // login data user 
    request.on('data', (chunk) => {
      body += chunk.toString(); // Convert Buffer chunks to string
    })
    request.on('end', async () => {
      // The entire body has been received      
      console.log('Request body:', body); 

      // Parse the body if it's JSON, URL-encoded, etc.
      try {
          const parsedBody = JSON.parse(body);
          console.log('Parsed JSON body:', parsedBody);
          if (process.env.USER == parsedBody.user &&
              process.env.PASSWORD == parsedBody.password
          ) {
            login = true;
          } else {
            login = false;
          }
          console.log(login);

          if (login) {
            // get methods
            if (request.method === HttpMethod.GET && baseUrl === Routes.PODCAST_LIST) {
              await getListPodcasts(request, response);
            } else if (request.method === HttpMethod.GET && baseUrl === Routes.ESPISODE) {
              await getFilterEpisodes(request, response);
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
                message: "User not found!"
              }));
              response.end();    
          }          

      } catch (e) {
          console.error('Error parsing JSON:', e);
      }
    })
  //}
};
