// region imports

import {IUFLog} from "./IUFLog.js";

// endregion

// region class

/**
 * Implements {@link IUFLog} to write log entries to the console.
 */
class UFConsoleLog implements IUFLog {
  // region IUFLog

  /**
   * @inheritDoc
   */
  debug(aPrefix: string, ...aData: any[]): void {
    if (process.argv.indexOf('nodebug') >= 0) {
      return;
    }
    console.debug(`[DEBUG:${aPrefix}]`, ...aData);
  }

  /**
   * @inheritDoc
   */
  info(aPrefix: string, ...aData: any[]): void {
    console.info(`[INFO:${aPrefix}]`, ...aData);
  }

  /**
   * @inheritDoc
   */
  log(...aData: any[]): void {
    console.log(`[LOG]`, ...aData);
  }

  /**
   * @inheritDoc
   */
  error(aPrefix: string, anError: (Error | any | null), aDescription: string = '', ...aData: any[]): void {
    if (anError instanceof Error) {
      console.error(`[ERROR:${aPrefix}]`, aDescription, anError.name, anError.message, ...aData, anError.stack);
    }
    else if (anError) {
      console.error(`[ERROR:${aPrefix}]`, aDescription, anError.toString(), ...aData);
    }
    else {
      console.error(`[ERROR:${aPrefix}]`, aDescription, ...aData);
    }
  }

  // endregion
}

// endregion

// region exports

export {UFConsoleLog};

// endregion