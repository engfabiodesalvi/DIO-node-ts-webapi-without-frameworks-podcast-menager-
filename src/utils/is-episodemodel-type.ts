
import { EpisodeModel } from "../models/episode-model";
import { isValidDate } from "./is-date-type";

export const isEpisodeModel = async (
  newEpisode?: EpisodeModel | undefined
): Promise<boolean> => {
    let isTypeOfEpisodeModel = false;
    const countKeys = Object.keys(newEpisode as EpisodeModel).length

    if (!Array.isArray(newEpisode) &&
            newEpisode !== undefined &&
            typeof newEpisode.videoId === 'string' &&
            typeof newEpisode.podcastId === 'string' &&
            typeof newEpisode.title === 'string' &&
            typeof newEpisode.description === 'string' &&
            typeof newEpisode.duration === 'number' &&
            typeof newEpisode.release_date === 'string' &&
                await isValidDate(newEpisode.release_date) &&
            typeof newEpisode.views === 'number' &&
            typeof newEpisode.likes === 'number' &&
            typeof newEpisode.categories === 'object' &&
                newEpisode.categories.every((item) => typeof item === 'string') &&
            typeof newEpisode.language === 'string' &&
            countKeys === 10
        ) {
        isTypeOfEpisodeModel = true;
        console.log("Is Typeof EpisodeModel");
    } else {
        console.log("Isn't Typeof EpisodeModel");
    }

    // console.log(typeof newEpisode?.videoId);
    // console.log(typeof newEpisode?.podcastId);
    // console.log(typeof newEpisode?.title);
    // console.log(typeof newEpisode?.description);
    // console.log(typeof newEpisode?.duration);
    // console.log(typeof newEpisode?.release_date);
    // console.log(typeof newEpisode?.views);
    // console.log(typeof newEpisode?.likes);
    // console.log(typeof newEpisode?.categories);
    // newEpisode?.categories.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })    
    // console.log(typeof newEpisode?.language);

    return isTypeOfEpisodeModel;
};