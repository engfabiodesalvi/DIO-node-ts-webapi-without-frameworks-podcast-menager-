import { EpisodeModel } from "../models/episode-model";
import { EpisodeTransferModel } from "../models/episode-transfer-model";
import { repositoryDeleteEpisode } from "../repositories/delete-episode-repository";
import { StatusCode } from "../utils/status-code";

export const serviceDeleteEpisode = async (
    queryString: string | undefined,
    deleteEpisode: EpisodeModel
): Promise<EpisodeTransferModel> => {
    // define a interface de retorno - contrato
    let responseFormat: EpisodeTransferModel = {
        statusCode: 0,
        body: [],
    };

    const data = await repositoryDeleteEpisode(queryString, deleteEpisode);

    //console.log(data);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

    return responseFormat;
};