/**
 * A simple class that writes log entries to a file and to the console.
 */
declare class UFLog {
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
     *   Name of file including path. The file name may include the macro text '$date$', which will get replaced with
     *   current date. This will create a log for every day.
     */
    constructor(aFileName: string);
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
export { UFLog };
