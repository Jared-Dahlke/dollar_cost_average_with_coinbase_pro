# atlassian-jwt

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

[JWT (JSON Web Token)](http://self-issued.info/docs/draft-jones-json-web-token.html) encoding & decoding
library for node.js. Built on [jwt-simple](https://github.com/hokaccha/node-jwt-simple), it adds support
for Atlassian's custom QSH (query string hash) claim.

For more information on using JWT tokens with Atlassian apps, please read:
[Understanding JWT](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/).

## Install

```sh
npm install atlassian-jwt
```

## Usage

### Create a JWT token

```typescript
import * as jwt from 'atlassian-jwt';
import moment from 'moment';

const now = moment().utc();

// Simple form of [request](https://npmjs.com/package/request) object
const req: jwt.Request = jwt.fromMethodAndUrl('GET', '/rest/resource/you/want');

const tokenData = {
    "iss": 'issuer-val',
    "iat": now.unix(),                    // The time the token is generated
    "exp": now.add(3, 'minutes').unix(),  // Token expiry time (recommend 3 minutes after issuing)
    "qsh": jwt.createQueryStringHash(req) // [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
};

const secret = 'xxx';

const token = jwt.encode(tokenData, secret);
console.log(token);
```

### Decode a JWT token

```typescript
const decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }

// Decode without verifing the signature of the token.
// Don't do this unless that's your intention.
const decoded = jwt.decode(token, null, true);
console.log(decoded); //=> { foo: 'bar' }
```

### Miscellaneous Utilities

 - `jwt.createQueryStringHash(req, checkBodyForParams, baseUrl)`
   Creates a QSH using the algorithm defined by
   [the algorithm](https://developer.atlassian.com/static/connect/docs/latest/concepts/understanding-jwt.html#qsh).
 - `jwt.createCanonicalRequest(req, checkBodyForParams, baseUrl)`
   Creates a canonical request which is used to calculate the QSH for the JWT token.
   Prefer using `#createQueryStringHash()` directly.
 - `jwt.fromExpressRequest(expressRequest: ExpressRequest)`
   Converts an Express.js request into a `Request` object
   that can be used with other methods in this library.
 - `jwt.fromMethodAndUrl(method, url)`
   Takes in a method and URL, both as plain strings,
   and turns them into a `Request` object that can be used with other methods in this library.
 - `jwt.fromMethodAndPathAndBody(method, url, body)`
   Takes in a method, a URL, and some form params from a request body
   and turns them into a `Request` object that can be used with other methods in this library.

### Algorithms

By default the algorithm to encode is `HS256`.

The supported algorithms for encoding and decoding are `HS256`, `HS384`, and `HS512`.
See [Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/).

If you use TypeScript:

```typescript
// Encode using HS256 (default)
jwt.encode(payload, secret);

// Encode using HS512
jwt.encode(payload, secret, jwt.Algorithm.HS512);
```

If you use JavaScript:

```javascript
// Encode using HS256 (default)
jwt.encode(payload, secret);

// Encode using HS512
jwt.encode(payload, secret, 'HS512');
```

### Migrating from 0.1.x to 1.x.x

The `1.x.x` release brings some breaking changes, probably the most important change is that our methods no longer
accept the Express.js request object as an argument but instead use our own intermediate `Request` object.

A convenience method called `fromExpressRequest` has been written to ease the transition. You can use it like so:

```typescript
import * as jwt from 'atlassian-jwt';
import { Request as ExpressRequest } from 'express';

const eReq: ExpressRequest = ...;
const qsh = jwt.createQueryStringHash(jwt.fromExpressRequest(eReq));
```

Other methods, like `fromMethodAndUrl` and `fromMethodAndPathAndBody` were written to allow easier generation of
`Request` objects from other libraries.

## Guides for developers

### Publishing this library

Update `version` in package.json and lib/jwt.ts.

To publish this library:

```sh
npm run tsc
npm publish
```

This has been combined into a single command with:

```sh
npm run build-and-publish
```

Only the built TypeScript files will be published with this library.
