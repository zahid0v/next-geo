import {RealEstateListing} from '../types/types';
import frontImage from './images/front.jpg';
import bedroomImage from './images/bedroom.jpg';
import backImage from './images/back.jpg';


export async function loadRealEstateListing(): Promise<RealEstateListing> {
  const url = new URL('../data/real-estate-listing.json', import.meta.url);

  const listing = (await fetch(url).then(res =>
    res.json()
  )) as RealEstateListing;

  // listing.images = [frontImage, bedroomImage, backImage];
  listing.images = [frontImage.src, bedroomImage.src, backImage.src];

  return listing;
}
export async function loadRealEstateListing2(): Promise<RealEstateListing> {
  const url = new URL('../data/real-estate-listing2.json', import.meta.url);

  const listing = (await fetch(url).then(res =>
    res.json()
  )) as RealEstateListing;

  listing.images = [frontImage.src, bedroomImage.src, backImage.src];

  return listing;
}
