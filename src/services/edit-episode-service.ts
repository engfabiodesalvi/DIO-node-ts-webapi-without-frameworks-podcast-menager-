import { EpisodeModel } from "../models/episode-model";
import { EpisodeTransferModel } from "../models/episode-transfer-model";
import { repositoryEditEpisode } from "../repositories/edit-episode-repository";
import { StatusCode } from "../utils/status-code";

export const serviceEditEpisode = async (
    queryString: string | undefined,
    editEpisode: EpisodeModel
): Promise<EpisodeTransferModel> => {
    // define a interface de retorno - contrato
    let responseFormat: EpisodeTransferModel = {
        statusCode: 0,
        body: [],
    };

    const data = await repositoryEditEpisode(queryString, editEpisode);

    //console.log(data);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

    return responseFormat;
};