import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcastAdd } from "../repositories/podcasts-repository-add";
import { StatusCode } from "../utils/status-code";

export const serviceAddPodcasts = async (
    queryString: string | undefined,
    newPodcast: PodcastModel 
): Promise<PodcastTransferModel> => {
    // define a interface de retorno - contrato
    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: [],
    };

    const data = await repositoryPodcastAdd(queryString, newPodcast);

    //console.log(data);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

    return responseFormat;
};