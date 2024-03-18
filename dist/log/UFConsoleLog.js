// region imports
// endregion
// region class
/**
 * Implements {@link IUFLog} to write log entries to the console.
 */
class UFConsoleLog {
    // region IUFLog
    /**
     * @inheritDoc
     */
    debug(aPrefix, ...aData) {
        if (process.argv.indexOf('nodebug') >= 0) {
            return;
        }
        console.debug(`[DEBUG:${aPrefix}]`, ...aData);
    }
    /**
     * @inheritDoc
     */
    info(aPrefix, ...aData) {
        console.info(`[INFO:${aPrefix}]`, ...aData);
    }
    /**
     * @inheritDoc
     */
    log(...aData) {
        console.log(`[LOG]`, ...aData);
    }
    /**
     * @inheritDoc
     */
    error(aPrefix, anError, aDescription = '', ...aData) {
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
}
// endregion
// region exports
export { UFConsoleLog };
// endregion
//# sourceMappingURL=UFConsoleLog.js.map