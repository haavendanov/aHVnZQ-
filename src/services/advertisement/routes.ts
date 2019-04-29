import { Request, Response } from "express";
import { getAdvertisementById, deleteAdvertisementById, createAdvertisement, updateAdvertisementById, getAdvertisementsByCategory, getAdvertisementsByDateRange } from "./AdvertisementController";

export default [
  {
    path: "/advertisement",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const { 
        category, 
        offer_message, 
        offer_graphic_url, 
        start_datetime, 
        end_datetime 
      } = req.body;

      createAdvertisement(
        category, 
        offer_message, 
        offer_graphic_url, 
        start_datetime, 
        end_datetime
      ).then( advertisement => {
        res.status(201).send(advertisement);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/advertisement/:id",
    method: "get",
    handler: async (req: Request, res: Response) => {
      getAdvertisementById(req.params.id).then( advertisement => {
        res.status(200).send(advertisement);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/advertisement/:id",
    method: "put",
    handler: async (req: Request, res: Response) => {
      const { 
        category, 
        offer_message, 
        offer_graphic_url, 
        start_datetime, 
        end_datetime 
      } = req.body;

      updateAdvertisementById(
        req.params.id, 
        category, 
        offer_message, 
        offer_graphic_url, 
        start_datetime, 
        end_datetime
      ).then( advertisement => {
        res.status(200).send(advertisement);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/advertisement/:id",
    method: "delete",
    handler: async (req: Request, res: Response) => {
      await deleteAdvertisementById(req.params.id).then( () => {
        res.status(200).end();
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/advertisement/categories/search",
    method: "get",
    handler: async ({ query }: Request, res: Response) => {
      if(!query.category) {
        res.status(400).send({ error: 'Missing query parameter category' })
      }
      await getAdvertisementsByCategory(query.category).then( advertisements => {
        res.status(200).send(advertisements);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  },
  {
    path: "/advertisement/dates/search",
    method: "get",
    handler: async ({ query }: Request, res: Response) => {
      if (!query.startDate || !query.endDate) {
        res.status(400).send({ error: 'Missing query parameter(s)', required: 'startDate, endDate' })
      }
      await getAdvertisementsByDateRange(query.filterBy, query.startDate, query.endDate)
      .then( advertisements => {
        res.status(200).send(advertisements);
      }).catch( error => {
        res.status(500).send({ error })
      });
    }
  }
];
