import { IUFLog } from "./IUFLog";
/**
 * Implements {@link IUFLog} to write log entries to the console.
 */
declare class UFConsoleLog implements IUFLog {
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
}
export { UFConsoleLog };
