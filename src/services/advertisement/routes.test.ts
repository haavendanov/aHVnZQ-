
import express, { Router } from "express";
import * as typeorm from 'typeorm';
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import routes from "../../services/advertisement/routes";

(typeorm as any).getRepository = jest.fn();

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
  });

  test("a valid string query in search by category", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      find: () => {[]}
    });
    const response = await request(router).get("/advertisement/categories/search?category=free");
    expect(response.status).toEqual(200);
  });

  test("an invalid string query in search by category", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      find: () => {[]}
    });
    const response = await request(router).get("/advertisement/categories/search?category=");
    expect(response.status).toEqual(400);
  });

  test("a valid string query in search by start_date and end_date", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      find: () => {[]}
    });
    const response = await request(router).get("/advertisement/dates/search?startDate=2018-01-01&endDate=2018-01-01");
    expect(response.status).toEqual(200);
  });

  test("an invalid string query in search by start_date and end_date", async () => {
    const response = await request(router).get("/advertisement/dates/search?startDate=&endDate=2018-01-01");
    expect(response.status).toEqual(400);
  });

  test("a valid object in create advertisement", async () => {
    const advertisementMock = {
      "id": 2,
      "offerMessage": "Mensaje oferta",
      "offerGraphicUrl": "www.google.com",
      "startDatetime": "2018-02-02",
      "endDatetime": "2018-02-02",
      "category": "all",
      "createdAt": "2019-04-29T02:55:58.903Z",
      "updatedAt": "2019-04-29T03:05:10.000Z"
    };

    (typeorm as any).getRepository.mockReturnValue({
      save: () => (advertisementMock)
    });
    const response = await request(router).post("/advertisement");
    expect(response.status).toEqual(201);
  });

  test("a valid object in get advertisement", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => ({
        "id": 2,
        "offerMessage": "Mensaje oferta",
        "offerGraphicUrl": "www.google.com",
        "startDatetime": "2018-02-02T05:00:00.000Z",
        "endDatetime": "2018-02-02T05:00:00.000Z",
        "category": "all",
        "createdAt": "2019-04-29T02:55:58.903Z",
        "updatedAt": "2019-04-29T03:05:10.000Z"
      })
    });
    const response = await request(router).get("/advertisement/2");
    expect(response.status).toEqual(200);
  });

  test("an error in update advertisement", async () => {
    const advertisementMock = {
      "id": 2,
      "offerMessage": "Mensaje oferta",
      "offerGraphicUrl": "www.google.com",
      "startDatetime": "2018-02-02",
      "endDatetime": "2018-02-02",
      "category": "all",
      "createdAt": "2019-04-29T02:55:58.903Z",
      "updatedAt": "2019-04-29T03:05:10.000Z"
    };
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => (advertisementMock)
    });
    const response = await request(router).put("/advertisement/2");
    expect(response.status).toEqual(500);
  });

  test("a valid response in delete advertisement", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => ({
        "id": 2,
        "offerMessage": "Mensaje oferta",
        "offerGraphicUrl": "www.google.com",
        "startDatetime": "2018-02-02T05:00:00.000Z",
        "endDatetime": "2018-02-02T05:00:00.000Z",
        "category": "all",
        "createdAt": "2019-04-29T02:55:58.903Z",
        "updatedAt": "2019-04-29T03:05:10.000Z"
      }),
      remove: () => {}
    });
    const response = await request(router).delete("/advertisement/2");
    expect(response.status).toEqual(200);
  });

  test("an invalid response in delete advertisement", async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => null,
      remove: () => {}
    });
    const response = await request(router).delete("/advertisement/2");
    expect(response.status).toEqual(500);
  });
});
