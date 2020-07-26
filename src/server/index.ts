import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

function installErrorHandler(app: any) {
  const _renderErrorToHTML = app.renderErrorToHTML.bind(app);

  app.renderErrorToHTML = (err: any, req: any, res: any, pathname: any, query: any) => {
    if (err) {
      console.error(err);
    }

    return _renderErrorToHTML(err, req, res, pathname, query);
  };

  return app;
}

async function main() {
  try {
    await app.prepare();

    // TODO: set error handler
    // https://github.com/vercel/next.js/issues/1852#issuecomment-353671222
    installErrorHandler(app);

    const server = express();
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
