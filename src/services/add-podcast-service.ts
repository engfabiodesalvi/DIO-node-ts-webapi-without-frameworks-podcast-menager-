import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryAddPodcast } from "../repositories/add-podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceAddPodcast = async (
    queryString: string | undefined,
    newPodcast: PodcastModel
): Promise<PodcastTransferModel> => {
    // define a interface de retorno - contrato
    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: [],
    };

    const data = await repositoryAddPodcast(queryString, newPodcast);

    //console.log(data);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

    return responseFormat;
};