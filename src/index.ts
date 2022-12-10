import AppDataSource from './dataSource';
import app from './app';


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log('Listening on port', port);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })


// pool
//   .connect({
//     connectionString:
//       process.env.DATABASE_URL ||
//       'postgresql://postgres:postgres@localhost:5432/toddle',
//     ssl: isProd && {
//       rejectUnauthorized: false,
//     },
//   })
//   .then(() => {
//     const port = process.env.PORT || 8080;
//     app.listen(port, () => {
//       console.log('Listening on port', port);
//     });
//   })
//   .catch((err) => console.error(err));
