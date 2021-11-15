import { Listing } from "../api/listings/types";

const initialIp = '192.168.178.33'
const initialPort = '9100';
const initialURL = `http://${initialIp}:${initialPort}`
const initialImagePath = `${initialURL}/assets` 


function getIpAddress(){
    return initialIp
}

function getPort(){
    return initialPort
}

function getServerUrl(){
    return initialURL
}

function getImagePath(listing:Listing){
    return `${initialImagePath}/${listing.userId}/listing/${listing.listingId}`
}

/**
 * the image coming from sever only has a name
 * Add a thumbnail and full image 
 * {
 *      uri : 'image_name.jpg',
 *      thumbnailUrl: 'image_name.jpg'
 * }
 * */
 async function addFullAndThumbnailImage(serverData: any){ 
    if(!Array.isArray(serverData)) return serverData

    console.log('Its an array')

    if(serverData[0]?.listingId){
        console.log('we have a listing')
        return serverData.map((listing: Listing)=>{

            

            const listing_images =  listing.images.map(image=>{
                const imagePath = getImagePath(listing)
                const new_image = {
                    ...{
                        uri: `${imagePath}/${image.name}_full.jpg`,
                        thumbnailUrl: `${imagePath}/ ${image.name}_thumb.jpg`
                    }
                }

                return new_image

            })

            listing.images = listing_images as any
            
            return listing;
        })
    }

    return serverData;

}

export default{
    getImagePath, getIpAddress, getPort, getServerUrl, addFullAndThumbnailImage
}