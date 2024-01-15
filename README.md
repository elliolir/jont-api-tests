# ojst-api-tests
PoC of OpenAPI, Jest, Supertest, and Testcontainers based API tests. 

The idea behind this is to validate API with OpenAPI spec as a source of consumer data contract.

As a result, it allows re-usage of the Swagger data (currently, schema definitions) in tests, 
as well as validation of Swagger file against actual API responses (to keep Swagger up-to-date).

## Set up
Assuming you have Node.js and Docker installed:
```
npm i
npm test
```

The rest of the npm scripts could be seen in the `package.json` file.

## Drawbacks
Current implementation parses Open API spec and converts it into JSON Schema.
However, OpenAPI might have  fields that are not supported by JSON Schema and vice versa. 
As a result, enabling some of the checks might be painful (e.g. schema composition and additional properties constraints).

## Further steps
Ideally:
- Swagger file should be generated automatically based on types;
- Test cases should be dynamically initialized by Swagger's endpoint definitions and examples. 

Maybe someday.