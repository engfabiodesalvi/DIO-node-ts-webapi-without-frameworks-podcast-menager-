import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceListPodcasts = async (
  queryString: string | undefined
): Promise<PodcastTransferModel> => {
  //define contrato
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  //query string parameters
  //const queryStringParameters = new URLSearchParams(podcastName?.split("?")[1] || "");
  
  //console.log(queryString);

  //const queryString = podcastName?.split("?p=")[1] || "";
  //const data = await repositoryPodcast(queryString);
  const data = await repositoryPodcast(queryString);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

  return responseFormat;
};
