class LoggerController {

  createLogger = async (req, res) => {
    try {
      req.logger.debug('Este es un mensaje de depuración (debug)');
      req.logger.http('Este es un mensaje HTTP');
      req.logger.info('Este es un mensaje de información (info)');
      req.logger.warning('Este es un mensaje de advertencia (warning)');
      req.logger.error('Este es un mensaje de error (error)');
      req.logger.fatal('Este es un mensaje fatal (fatal)');

      res.send('Logs registrados en la consola "');
    } catch (error) {
      console.error(`Error en createLogger: ${error}`);
      res.status(500).json({ error: `Internal Server Error ${error}` });
    }
  };
}
export default LoggerController;
