import { IUFLog } from "./IUFLog";
/**
 * Implements {@link IUFLog} to write log entries to both a file and to the console.
 */
declare class UFFileLog implements IUFLog {
    /**
     * Stream used.
     *
     * @private
     */
    private m_stream;
    /**
     * Current day used for log
     *
     * @private
     */
    private m_date;
    /**
     * File to add log entries to.
     *
     * @private
     */
    private m_fileName;
    /**
     * Creates a log instance.
     *
     * @param {string} aFileName
     *   Name of file including path. The file name may include the macro text '$date$', which will
     *   get replaced with current date. This will group log entries per day.
     */
    constructor(aFileName: string);
    /**
     * @inheritDoc
     */
    debug(aPrefix: string, ...aData: any[]): void;
    /**
     * @inheritDoc
     */
    info(aPrefix: string, ...aData: any[]): void;
    /**
     * @inheritDoc
     */
    log(...aData: any[]): void;
    /**
     * @inheritDoc
     */
    error(aPrefix: string, anError: (Error | any | null), aDescription?: string, ...aData: any[]): void;
    /**
     * Adds an entry to the log file and console.
     *
     * @param {...data: any[] => void} aConsoleCallback
     *   Console method to call to output log to terminal
     * @param {string} aPrefix
     *   Prefix string
     * @param {...} aData
     *   Additional values to add
     *
     * @private
     */
    private add;
    /**
     * Writes entries to log file.
     *
     * @param {WriteStream} aStream
     *   Stream to write entries to
     * @param {...} aData
     *   Date to write
     *
     * @private
     */
    private writeEntries;
    /**
     * Gets the stream to write to.
     *
     * @param {Date} aDate
     *   Date to create stream for.
     *
     * @private
     */
    private getStream;
    /**
     * Gets the filename and path on the server for a certain date.
     *
     * @param {Date} aDate
     *   Date to get filename for
     *
     * @return {string} a filename and path
     *
     * @private
     */
    private getFileName;
    /**
     * Creates the start for a log entry.
     *
     * @param {Date} aDate
     *   The time part is used to create the start.
     * @param {string} aPrefix
     *   Prefix to add.
     *
     * @return {string} Text to use as start for a log entry.
     *
     * @private
     */
    private static createEntryStart;
    /**
     * Gets the textual representation of a data
     *
     * @param {*} aData
     *   Data to convert to text
     *
     * @return {string} textual description
     *
     * @private
     */
    private getAsText;
}
export { UFFileLog };
