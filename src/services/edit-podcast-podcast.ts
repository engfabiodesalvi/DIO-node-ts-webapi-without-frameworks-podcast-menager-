import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryEditPodcast } from "../repositories/edit-podcast-repository";
import { StatusCode } from "../utils/status-code";

export const serviceEditPodcast = async (
    queryString: string | undefined,
    editPodcast: PodcastModel
): Promise<PodcastTransferModel> => {
    // define a interface de retorno - contrato
    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: [],
    };

    const data = await repositoryEditPodcast(queryString, editPodcast);

    //console.log(data);

  //verifico o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
    body: data,
  };

    return responseFormat;
};