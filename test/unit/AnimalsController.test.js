import { expect } from 'chai';
import moxios from 'moxios';
import { AnimalController, axiosInstance } from '../../controllers/AnimalsController.js';

describe('Animal Controller Unit Tests', () => {

    beforeEach(async () => {
        moxios.install(axiosInstance);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance);
    });

    it('Test Register Animal', async () => {
        // Arrange
        const animalToRegister = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: animalToRegister,
            });
        });

        // Act
        const actualResponse = await AnimalController.register(animalToRegister);

        // Assert
        expect(actualResponse.status).to.be.eql(201);
        expect(actualResponse.data).to.be.eql(animalToRegister);
    });

    it('Test List Animals', async () => {
        // Arrange
        const listToGet = [
            {
                name: "manchas",
                breed: "Bengali",
                gender: "Female",
                vaccinated: true
            },
            {
                name: "Bigotes",
                breed: "Birmano",
                gender: "Male",
                vaccinated: false
            }
        ];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: listToGet,
            });
        });

        // Act
        const actualResponse = await AnimalController.list();

        // Assert
        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data).to.be.eql(listToGet);
        expect(actualResponse.data).to.have.length(2);
    });

    it('Test Delete Animal', async () => {
        // Arrange
        const animalToDelete = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
            });
        });

        // Act
        const actualResponse = await AnimalController.delete(animalToDelete.name);

        // Assert
        expect(actualResponse.status).to.be.eql(200);
    });

    it('Test Get Animal', async () => {
        // Arrange
        const animalToGet = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: animalToGet,
            });
        });

        // Act
        const actualResponse = await AnimalController.getAnimal(animalToGet.name);

        // Assert
        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data).to.be.eql(animalToGet);
    });

    it('Test Update Animal', async () => {
        // Arrange
        const animalToUpdate = {
            name: "manchas",
            breed: "Bengali",
            gender: "Female",
            vaccinated: true
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: animalToUpdate,
            });
        });

        // Act
        const actualResponse = await AnimalController.updateAnimal(animalToUpdate.name);

        // Assert
        expect(actualResponse.status).to.be.eql(200);
        expect(actualResponse.data).to.be.eql(animalToUpdate);
    });
})
