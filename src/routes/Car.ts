import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/Car';
import CarController from '../controllers/Car';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const route = Router();

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));

export default route;