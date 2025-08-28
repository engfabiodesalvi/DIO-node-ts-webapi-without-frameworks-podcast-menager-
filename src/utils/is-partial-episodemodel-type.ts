
import { EpisodeModel } from "../models/episode-model";
import { isValidDate } from "./is-date-type";

export const isPartialEpisodeModel = async (
  editEpisode?: EpisodeModel | undefined
): Promise<boolean> => {
    let isPartialTypeOfEpisodeModel = false;
    let countKeys = Object.keys(editEpisode as EpisodeModel).length

    if (!Array.isArray(editEpisode) &&
            editEpisode !== undefined &&
            typeof editEpisode.videoId === 'string') {

            countKeys--; // typeof editEpisode.videoId === 'string')
                
            if (typeof editEpisode.podcastId === 'string')
                countKeys--;

            if (typeof editEpisode.title === 'string')
                countKeys--;

            if (typeof editEpisode.description === 'string')
                countKeys--;
            
            if (typeof editEpisode.duration === 'number')
                countKeys--;

            if (typeof editEpisode.release_date === 'string' &&
                await isValidDate(editEpisode.release_date))
                countKeys--;

            if (typeof editEpisode.views === 'number')
                countKeys--;

            if (typeof editEpisode.likes === 'number')
                countKeys--;

            if (typeof editEpisode.categories === 'object' &&
                editEpisode.categories.every((item) => typeof item === 'string'))
                countKeys--;

            if (typeof editEpisode.language === 'string')
                countKeys--;

            if (countKeys === 0) {
                isPartialTypeOfEpisodeModel = true;
                console.log("Is Partial Typeof EpisodeModel");
            } else {
                console.log("Isn't Partial Typeof EpisodeModel");
            }
                
    } else {
        console.log("Isn't Partial Typeof EpisodeModel");
    }

    // console.log(typeof editEpisode?.videoId);
    // console.log(typeof editEpisode?.podcastId);
    // console.log(typeof editEpisode?.title);
    // console.log(typeof editEpisode?.description);
    // console.log(typeof editEpisode?.duration);
    // console.log(typeof editEpisode?.release_date);
    // console.log(typeof editEpisode?.views);
    // console.log(typeof editEpisode?.likes);
    // console.log(typeof editEpisode?.categories);
    // editEpisode?.categories.forEach((item)=>{
    //     console.log(`   ${typeof item}`);
    // })    
    // console.log(typeof editEpisode?.language);

    return isPartialTypeOfEpisodeModel;
};