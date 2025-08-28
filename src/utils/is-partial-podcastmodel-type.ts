import { PodcastModel } from "../models/podcast-model";

export const isPartialPodcastModel = async (
  editPodcast?: PodcastModel | undefined
): Promise<boolean> => {
    let isTypeOfPodcastModel = false;
    let countKeys = Object.keys(editPodcast as PodcastModel).length

    if (!Array.isArray(editPodcast) &&
            editPodcast !== undefined &&
            typeof editPodcast.id === 'string') {
            
        // if (typeof editPodcast.id === 'string')
             countKeys--;
        if (typeof editPodcast.name === 'string')
            countKeys--;
        if (typeof editPodcast.subscribers === 'number')
            countKeys--;
        if (typeof editPodcast.author === 'object' &&
        editPodcast.author.every((item) => typeof item === 'string'))
            countKeys--;          
        if (typeof editPodcast.description === 'string')
            countKeys--;
        if (typeof editPodcast.cover_url === 'string')
            countKeys--;
        if (typeof editPodcast.categories === 'object' &&
        editPodcast.categories.every((item) => typeof item === 'string'))
            countKeys--;
                                        
        if (countKeys === 0) {
            isTypeOfPodcastModel = true;
            console.log("Is Typeof PodcastModel");
        } else {
            console.log("Isn't Typeof PodcastModel");
        }

    } else {
        console.log("Isn't Typeof PodcastModel");
    }

    // console.log(typeof newPodcast?.id);
    // console.log(typeof newPodcast?.name);
    // console.log(typeof newPodcast?.subscribers);
    // console.log(typeof newPodcast?.author);
    // newPodcast?.author.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })
    // console.log(typeof newPodcast?.description);
    // console.log(typeof newPodcast?.cover_url);
    // console.log(typeof newPodcast?.categories);
    // newPodcast?.categories.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })    

    return isTypeOfPodcastModel;
};