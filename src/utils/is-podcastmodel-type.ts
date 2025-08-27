import { PodcastModel } from "../models/podcast-model";

export const isPodcastModel = async (
  newPodcast?: PodcastModel | undefined
): Promise<boolean> => {
    let isTypeOfPodcastModel = false;

    if (!Array.isArray(newPodcast) &&
            newPodcast !== undefined &&
            typeof newPodcast.id === 'string' &&
            typeof newPodcast.name === 'string' &&
            typeof newPodcast.subscribers === 'number' &&
            typeof newPodcast.author === 'object' &&
            newPodcast.author.every((item) => typeof item === 'string')  &&          
            typeof newPodcast.description === 'string' &&
            typeof newPodcast.cover_url === 'string' &&
            typeof newPodcast.categories === 'object' &&
            newPodcast.categories.every((item) => typeof item === 'string') 
        ) {
        isTypeOfPodcastModel = true;
        console.log("Is Typeof PodcastModel");
    } else {
        console.log("Isn't Typeof PodcastModel");
    }

    console.log(typeof newPodcast?.id);
    console.log(typeof newPodcast?.name);
    console.log(typeof newPodcast?.subscribers);
    console.log(typeof newPodcast?.author);
    newPodcast?.author.forEach((item)=>{
        console.log(`   ${typeof item}`);
    })
    console.log(typeof newPodcast?.description);
    console.log(typeof newPodcast?.cover_url);
    console.log(typeof newPodcast?.categories);
    newPodcast?.categories.forEach((item)=>{
        console.log(`   ${typeof item}`);
    })    

    return isTypeOfPodcastModel;
};