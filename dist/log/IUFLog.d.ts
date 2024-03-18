/**
 * Various logging methods.
 */
interface IUFLog {
    /**
     * Writes a debug entry to the log. If there is a commandline argument 'nodebug' the data is not output to the
     * console.
     *
     * @param {string} aPrefix
     *   A prefix for the entry
     * @param {...} aData
     *   Additional entries to write
     */
    debug(aPrefix: string, ...aData: any[]): void;
    /**
     * Writes an info entry to the log.
     *
     * @param {string} aPrefix
     *   A prefix for the entry
     * @param {...} aData
     *   Additional entries to write
     */
    info(aPrefix: string, ...aData: any[]): void;
    /**
     * Writes an entry to the log.
     *
     * @param {...} aData
     *   Entries to write
     */
    log(...aData: any[]): void;
    /**
     * Writes an error entry to the log.
     *
     * @param {string} aPrefix
     *   A prefix for the entry
     * @param {Error|*|null} anError
     *   An error object to write or null to create a general error entry
     * @param {string} aDescription
     *   A description of the action that was being performed that caused the error
     * @param {...} aData
     *   Additional entries to write
     */
    error(aPrefix: string, anError: (Error | any | null), aDescription: string, ...aData: any[]): void;
}
export { IUFLog };
