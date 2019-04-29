import { getRepository, Between } from "typeorm";
import { Advertisement } from "../../entity/Advertisement";

export const createAdvertisement = async (
  category: string, 
  offerMessage: string, 
  offerGraphicUrl: string, 
  startDatetime: Date, 
  endDatetime: Date
) => {
  const advertisementRepository = await getRepository(Advertisement)

  let advertisement = new Advertisement();
  advertisement.category = category;
  advertisement.offerMessage = offerMessage;
  advertisement.offerGraphicUrl = offerGraphicUrl;
  advertisement.startDatetime = new Date(startDatetime);
  advertisement.endDatetime = new Date(endDatetime);

  await advertisementRepository.save(advertisement);
  return advertisement;
};

export const getAdvertisementById = async (id: string) => {
  const advertisementRepository = await getRepository(Advertisement)
  let advertisement = await advertisementRepository.findOne(id);
  if(!advertisement) {
    throw `Advertisement with id = ${id} was not found`;
  }
  return advertisement;
};

export const updateAdvertisementById = async (
    id: string, 
    category: string, 
    offerMessage: string, 
    offerGraphicUrl: string, 
    startDatetime: Date, 
    endDatetime: Date
  ) => {
  const advertisementRepository = await getRepository(Advertisement)
  let advertisement = await advertisementRepository.findOne(id);
  if(!advertisement) {
    throw `Advertisement with id = ${id} was not found`;
  }
  advertisement.category = category;
  advertisement.offerMessage = offerMessage;
  advertisement.offerGraphicUrl = offerGraphicUrl;
  advertisement.startDatetime = new Date(startDatetime);
  advertisement.endDatetime = new Date(endDatetime);

  await advertisementRepository.save(advertisement);
  return advertisement;
};

export const deleteAdvertisementById = async (id: string) => {
  const advertisementRepository = await getRepository(Advertisement)
  let advertisement = await advertisementRepository.findOne(id);
  if(!advertisement) {
    throw `Advertisement with id = ${id} was not found`;
  }
  await advertisementRepository.remove(advertisement);
  return;
};

export const getAdvertisementsByCategory = async (category: string) => {
  const advertisementRepository = await getRepository(Advertisement)
  let advertisements = await advertisementRepository.find({ category });
  return advertisements;
};

export const getAdvertisementsByDateRange = async (filterBy: string, startDate: Date, endDate: Date) => {
  let query;
  if (filterBy === 'START') {
    query = {
      startDatetime: Between(startDate, endDate)
    }
  } else if (filterBy === 'END') {
    query = {
      endDatetime: Between(startDate, endDate)
    }
  } else {
    query = {
      startDatetime: Between(startDate, endDate),
      endDatetime: Between(startDate, endDate)
    }
  }

  const advertisementRepository = await getRepository(Advertisement)
  let advertisements = await advertisementRepository.find({ where: query });
  return advertisements;
};
