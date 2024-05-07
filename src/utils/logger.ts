import { initialized, DdLogs } from '../services/expo-service';

class PinoLogger {
  constructor(
    private name: string,
    private context = {},
  ) {}

  child(obj: Record<string, unknown>) {
    return new PinoLogger(this.name, { ...this.context, ...obj });
  }

  debug(obj: { msg: string } & Record<string, unknown>) {
    console.log({ ...this.context, ...obj, logger: { name: this.name } });

    const { msg, ...rest } = obj;
    if (initialized) {
      DdLogs.debug(msg, rest);
    }
  }

  info(obj: { msg: string } & Record<string, unknown>) {
    console.log({ ...this.context, ...obj, logger: { name: this.name } });

    const { msg, ...rest } = obj;
    if (initialized) {
      DdLogs.info(msg, rest);
    }
  }

  warn(obj: { msg: string } & Record<string, unknown>) {
    console.warn({ ...this.context, ...obj, logger: { name: this.name } });

    const { msg, ...rest } = obj;
    if (initialized) {
      DdLogs.warn(msg, rest);
    }
  }

  error(obj: { msg: string } & Record<string, unknown>) {
    console.error({ ...this.context, ...obj, logger: { name: this.name } });

    const { msg, ...rest } = obj;
    if (initialized) {
      DdLogs.error(msg, rest);
    }
  }
}

let _logger: PinoLogger | undefined;

export const logFactory = (name: string) => {
  if (_logger) {
    return _logger;
  }

  return new PinoLogger(name);
};
