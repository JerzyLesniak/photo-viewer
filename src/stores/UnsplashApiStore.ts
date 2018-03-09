import RootStore from "./RootStore";
import Unsplash, {toJson} from 'unsplash-js';
import {observable} from "mobx";
import mockData from "../test/TestPhotos";

export const CollectionsEnum = {
  stars: 795671,
  mythos: 1372642,
  neon: 1024649,
  landscapes: 1319135,
  macros: 172064,
  city: 391148,
  property: {
    795671: {name: "stars"},
    1372642: {name: "mythos astros"},
    1024649: {name: "neon"},
    1319135: {name: "landscapes"},
    172064: {name: "macros"},
    391148: {name: "city life"},
  }
};


const fetchedCollections = [
  CollectionsEnum.stars,
  CollectionsEnum.mythos,
  CollectionsEnum.neon,
  CollectionsEnum.landscapes,
  CollectionsEnum.macros,
  CollectionsEnum.city,
];

export enum SortTypes {
  LATEST = 'latest',
  POPULAR = 'popular',
}

export interface CollectionImage {
  id: string,
  likes: number,
  user: {
    location: string,
    links: {
      html: string,
      portfolio: string
    }
  }
  urls: {
    small: string,
    thumb: string,
  }
}

export interface Collection {
  images: Array<CollectionImage>;
  collectionId: number;
}

export default class UnsplashApiStore {
  rootStore: RootStore;
  @observable latestCollections: Array<Collection> = [];
  @observable unsplashInstance: any = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.unsplashInstance = new Unsplash({
      applicationId: "b34bd7f249730be0804ac453287a2e6b56cb4f215bc9d109fff3133cc6df9ab4",
    });
  }

  fetchPaginatedCollectionPhotos =
    async (collectionId: number, page: number, sortType?: SortTypes): Promise<Array<CollectionImage>> => {
      try {
        const data = await this.unsplashInstance.collections.getCollectionPhotos(
          collectionId,
          page,
          18,
          sortType ? sortType : SortTypes.LATEST
        );

        return await toJson(data);
      } catch (e) {
        console.log(e);
      }
    }

  fetchCollectionsPhotos = () => {
    try {
      fetchedCollections.forEach(async (collectionId: number) => {
        const data = await this.unsplashInstance.collections.getCollectionPhotos(collectionId, 1, 10, 'latest');
        const images = await toJson(data);
        const collection = {
          images,
          collectionId
        };
        console.log(mockData);
        this.latestCollections.push(collection);
      });
    } catch (e) {
      console.log(e);
    }
  }
}