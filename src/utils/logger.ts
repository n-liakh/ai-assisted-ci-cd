// path: src/utils/logger.ts

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Simple structured logger utility for test output.
 * Provides timestamped, leveled log messages to the console.
 */
class Logger {
  private readonly context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Formats a log message with timestamp, level, and context.
   * @param level - Severity level of the log.
   * @param message - The message to log.
   */
  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
  }

  /** Logs an informational message. */
  info(message: string): void {
    console.log(this.format('info', message));
  }

  /** Logs a warning message. */
  warn(message: string): void {
    console.warn(this.format('warn', message));
  }

  /** Logs an error message. */
  error(message: string): void {
    console.error(this.format('error', message));
  }

  /** Logs a debug message (only when DEBUG env is set). */
  debug(message: string): void {
    if (process.env.DEBUG) {
      console.debug(this.format('debug', message));
    }
  }
}

/**
 * Factory function to create a Logger instance bound to a specific context.
 * @param context - The name of the class or module using the logger.
 */
export const createLogger = (context: string): Logger => new Logger(context);
