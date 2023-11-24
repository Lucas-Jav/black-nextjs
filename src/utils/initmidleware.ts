// lib/init-middleware.js
import { NextApiRequest, NextApiResponse } from 'next';

export default function initMiddleware(middleware: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
