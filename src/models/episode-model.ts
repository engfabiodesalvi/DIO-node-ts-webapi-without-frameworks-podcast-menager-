export interface EpisodeModel {
    "videoId": string,
    "podcastId": string,
    "title": string,
    "description": string,
    "duration": number,
    "release_date": string,
    "views": number,
    "likes": number,
    "categories": string[],
    "language": string
}