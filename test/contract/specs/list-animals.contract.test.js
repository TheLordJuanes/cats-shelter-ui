import { provider } from '../config/init-pact.js';
import { Matchers } from '@pact-foundation/pact';
import { AnimalController } from '../../../controllers/AnimalsController.js';
import { expect } from 'chai';

describe('Animal Service - List animals', () => {
    describe('When a request to list all cats is made', () => {
        before(async () => {
            await provider.setup();
            await provider.addInteraction({
                uponReceiving: 'a request to list all cats',
                state: "has animals to get",
                withRequest: {
                    method: 'GET',
                    path: '/animals'
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        name: Matchers.like('Manchas'),
                        breed: Matchers.like("Bengali"),
                        gender: Matchers.like("Female"),
                        vaccinated: Matchers.boolean(true)
                    })
                }
            });
        });

        after(() => provider.finalize());

        it('should return the correct data', async () => {
            const response = await AnimalController.list();
            const responseBody = response.data;

            // Verifying response is an array with one element
            expect(responseBody).to.not.be.undefined;
            expect(responseBody).to.be.an('array');
            expect(responseBody).to.have.lengthOf(1);

            // Verifying data within response array
            const cat = responseBody[0];
            expect(cat.name).to.be.equal('Manchas');
            expect(cat.breed).to.be.equal('Bengali');
            expect(cat.gender).to.be.equal('Female');
            expect(cat.vaccinated).to.be.true;

            await provider.verify();
        });
    });
});
