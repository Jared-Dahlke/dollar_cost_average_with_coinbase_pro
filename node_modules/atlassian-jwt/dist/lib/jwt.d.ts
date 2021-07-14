import { Request as ExpressRequest } from 'express';
export declare enum Algorithm {
    HS256 = "HS256",
    HS384 = "HS384",
    HS512 = "HS512"
}
export declare function fromExpressRequest(eReq: ExpressRequest): Request;
export declare function fromMethodAndUrl(method: string, rawUrl: string): Request;
export declare function fromMethodAndPathAndBody(method: 'put' | 'post' | 'delete', rawUrl: string, body: Params): Request;
export declare type Params = {
    [param: string]: any;
};
/**
 * Fields from an incoming HTTP Request object that are used to generate a signed JWT.
 */
export declare type Request = {
    /**
     * The HTTP method of this request. GET, PUT, POST, DELETE etc
     */
    method: string;
    /**
     * The pathname of this request, should give the same result as calling
     * {@link https://nodejs.org/api/url.html#url_url_pathname uri.pathname}.
     */
    pathname?: string;
    /**
     * The query parameters on this request. Should match the same structure as
     * the {@link https://expressjs.com/en/api.html#req.query req.query} from Express.js.
     */
    query?: Params;
    /**
     * The body parameters on this request. Should match the same structure as
     * the {@link https://expressjs.com/en/api.html#req.body req.body} from Express.js.
     */
    body?: Params;
};
export declare const version = "1.0.3";
/**
 * Decodes JWT string to object.
 * The encoding algorithm must be HS256, HS384, or HS512.
 *
 * @param token JWT to decode
 * @param key Key used to decode
 * @param noVerify optional, set to true to skip the result verification
 *
 * @return Decoded JWT object
 *
 * @api public
 */
export declare const decode: (token: string, key: string, noVerify?: boolean | undefined) => any;
/**
 * Encodes JWT object to string.
 *
 * @param payload Payload object to encode
 * @param key Key used to encode
 * @param algorithm Optional, must be HS256, HS384, or HS512; default is HS256
 *
 * @return Encoded JWT string
 *
 * @api public
 */
export declare const encode: (payload: object, key: string, algorithm?: Algorithm | undefined) => string;
export declare function createCanonicalRequest(req: Request, checkBodyForParams?: boolean, baseUrl?: string): string;
export declare function createQueryStringHash(req: Request, checkBodyForParams?: boolean, baseUrl?: string): string;
//# sourceMappingURL=jwt.d.ts.map