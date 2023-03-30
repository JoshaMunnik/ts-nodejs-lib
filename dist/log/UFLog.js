// region imports
import { accessSync, constants, createWriteStream } from "fs";
import path from "path";
import { UFText } from "@ultraforce/ts-general-lib/dist";
// endregion
// region class
/**
 * A simple class that writes log entries to a file and to the console.
 */
class UFLog {
    // endregion
    // region constructor
    /**
     * Creates a log instance.
     *
     * @param {string} aFileName
     *   Name of file including path. The file name may include the macro text '$date$', which will get replaced with
     *   current date. This will create a log for every day.
     */
    constructor(aFileName) {
        // region private variables
        /**
         * Stream used.
         *
         * @private
         */
        this.m_stream = undefined;
        /**
         * Current day used for log
         *
         * @private
         */
        this.m_date = -1;
        this.m_fileName = aFileName;
    }
    // endregion
    // region public methods
    /**
     * Writes a debug entry to the log. If there is a commandline argument 'nodebug' the data is not output to the
     * console.
     *
     * @param {string} aPrefix
     *   A prefix for the entry
     * @param {...} aData
     *   Additional entries to write
     */
    debug(aPrefix, ...aData) {
        this.add(process.argv.indexOf('nodebug') >= 0 ? null : console.debug, `[DEBUG:${aPrefix}]`, ...aData);
    }
    /**
     * Writes an info entry to the log.
     *
     * @param {string} aPrefix
     *   A prefix for the entry
     * @param {...} aData
     *   Additional entries to write
     */
    info(aPrefix, ...aData) {
        this.add(console.info, `[INFO:${aPrefix}]`, ...aData);
    }
    /**
     * Writes an entry to the log.
     *
     * @param {...} aData
     *   Entries to write
     */
    log(...aData) {
        this.add(console.log, `[LOG]`, ...aData);
    }
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
    error(aPrefix, anError, aDescription = '', ...aData) {
        if (anError instanceof Error) {
            this.add(console.error, `[ERROR:${aPrefix}]`, aDescription, anError.name, anError.message, ...aData, anError.stack);
        }
        else if (anError) {
            this.add(console.error, `[ERROR:${aPrefix}]`, aDescription, anError.toString(), ...aData);
        }
        else {
            this.add(console.error, `[ERROR:${aPrefix}]`, aDescription, ...aData);
        }
    }
    // endregion
    // region private methods
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
    add(aConsoleCallback, aPrefix, ...aData) {
        const now = new Date();
        const stream = this.getStream(now);
        const start = UFLog.createEntryStart(now, aPrefix);
        stream.write(start);
        this.writeEntries(stream, aData);
        stream.write('\n');
        if (aConsoleCallback) {
            aConsoleCallback(start, ...aData);
        }
    }
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
    writeEntries(aStream, aData) {
        aData.forEach(data => {
            // only write value if it is not an empty string
            const text = this.getAsText(data);
            if (text.length > 0) {
                // @ts-ignore
                aStream.write(' ' + text);
            }
        });
    }
    /**
     * Gets the stream to write to.
     *
     * @param {Date} aDate
     *   Date to create stream for.
     *
     * @private
     */
    getStream(aDate) {
        try {
            // check if stream is still valid
            if (this.m_stream) {
                // close stream if new day started
                if (aDate.getUTCDate() !== this.m_date) {
                    this.m_stream.end();
                    this.m_stream = undefined;
                }
                else {
                    // make sure log file still exists
                    accessSync(this.getFileName(aDate), constants.W_OK);
                }
            }
        }
        catch (_a) {
            // an error occurred, recreate stream
            this.m_stream = undefined;
        }
        // create new stream if none exists
        if (!this.m_stream) {
            this.m_stream = createWriteStream(this.getFileName(aDate), { flags: 'a' });
            this.m_date = aDate.getUTCDate();
        }
        return this.m_stream;
    }
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
    getFileName(aDate) {
        return path.resolve(this.m_fileName.replace('$date$', aDate.getUTCFullYear() + '-' + UFText.twoDigits(1 + aDate.getUTCMonth()) + '-'
            + UFText.twoDigits(aDate.getUTCDate())));
    }
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
    static createEntryStart(aDate, aPrefix) {
        return '[' +
            UFText.twoDigits(aDate.getUTCHours()) + ':' +
            UFText.twoDigits(aDate.getUTCMinutes()) + ':' +
            UFText.twoDigits(aDate.getUTCSeconds()) + '.' +
            UFText.threeDigits(aDate.getUTCMilliseconds())
            + ']' + (aPrefix.length ? ' ' + aPrefix : '');
    }
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
    getAsText(aData) {
        switch (typeof (aData)) {
            case 'object':
                return JSON.stringify(aData, null, 2);
            case 'function':
                return this.getAsText(aData());
            default:
                return aData.toString();
        }
    }
}
// endregion
// region exports
export { UFLog };
// endregion
//# sourceMappingURL=UFLog.js.map