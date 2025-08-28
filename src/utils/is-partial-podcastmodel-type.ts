import { PodcastModel } from "../models/podcast-model";

export const isPartialPodcastModel = async (
  editPodcast?: PodcastModel | undefined
): Promise<boolean> => {
    let isPartialTypeOfPodcastModel = false;
    let countKeys = Object.keys(editPodcast as PodcastModel).length

    if (!Array.isArray(editPodcast) &&
            editPodcast !== undefined &&
            typeof editPodcast.id === 'string') {
            
        countKeys--; // typeof editPodcast.id === 'string')

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
            isPartialTypeOfPodcastModel = true;
            console.log("Is Partial Typeof PodcastModel");
        } else {
            console.log("Isn't Partial Typeof PodcastModel");
        }

    } else {
        console.log("Isn't Partial Typeof PodcastModel");
    }

    // console.log(typeof editPodcast?.id);
    // console.log(typeof editPodcast?.name);
    // console.log(typeof editPodcast?.subscribers);
    // console.log(typeof editPodcast?.author);
    // editPodcast?.author.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })
    // console.log(typeof editPodcast?.description);
    // console.log(typeof editPodcast?.cover_url);
    // console.log(typeof editPodcast?.categories);
    // editPodcast?.categories.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })    

    return isPartialTypeOfPodcastModel;
};