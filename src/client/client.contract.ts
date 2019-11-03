import { Pact, InteractionObject } from '@pact-foundation/pact'
import * as Matchers from '@pact-foundation/pact/dsl/matchers'
import { search } from './client'

const PROVIDER_PORT = 10001
const PROVIDER_URL = `http://localhost:${PROVIDER_PORT}`

describe('search contract', () => {
  const provider = new Pact({
    cors: true,
    consumer: 'nocht-ui',
    provider: 'nocht-domains',
    port: PROVIDER_PORT,
    logLevel: 'error',
    spec: 2
  })

  beforeAll(async () => {
    await provider.setup()
  })

  afterAll(async () => {
    await provider.finalize()
  })

  describe('/notification/email', () => {
    it('should return 200 for a search', async () => {
      // Arrange
      const domain = 'domain.com'
      const expectedBody = { domains: [{ name: 'test.com' }] }
      const notificationEmailInteraction = {
        state: 'subdomains exist for the given domain',
        uponReceiving: `a request on /domains/${domain}/subdomains`,
        withRequest: {
          method: 'GET',
          path: `/domains/${domain}/subdomains`
        },
        willRespondWith: {
          status: 200,
          body: Matchers.like(expectedBody)
        }
      } as InteractionObject
      await provider.addInteraction(notificationEmailInteraction)

      // Act / Assert
      try {
        const response = await search(domain, PROVIDER_URL)
        expect(response.status).toBe(200)
        expect(response.data).toStrictEqual(expectedBody)
      } catch (error) {
        fail(`The request failed with ${error}`)
      }
    })
  })
})
