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

  if (request.method === HttpMethod.GET && baseUrl === Routes.PODCAST_LIST) {
    await getListPodcasts(request, response);
  } else if (request.method === HttpMethod.GET && baseUrl === Routes.ESPISODE) {
    await getFilterEpisodes(request, response);
  } else {
    response.writeHead(StatusCode.NotFound, defaultContent);
    response.write(JSON.stringify({
      message: "url not found!",
      url: baseUrl}));
    response.end();
  }


};
