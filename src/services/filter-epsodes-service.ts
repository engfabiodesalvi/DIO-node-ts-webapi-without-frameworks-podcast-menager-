import { EpisodeTransferModel } from "../models/episode-transfer-model";
import { repositoryEpisode } from "../repositories/episodes-repository";
import { StatusCode } from "../utils/status-code";

export const serviceListEpisodes = async (
  queryString: string | undefined
): Promise<EpisodeTransferModel> => {
  //define a interface de retorno - contrato
  let responseFormat: EpisodeTransferModel = {
    statusCode: 0,
    body: [],
  };

  //buscando os dados
  //const queryString = podcastName?.split("?p=")[1] || "";
  //query string parameters
  //const queryStringParameters = new URLSearchParams(podcastName?.split("?")[1] || "");

  const data = await repositoryEpisode(queryString);

  //console.log("");

  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

  return responseFormat;
};
