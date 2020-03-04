export default class TypeValidationError extends Error {
  public name = 'TypeValidationError';

  public stack?: string | undefined;

  constructor(public originalMessage: string, public readonly propertyPath: string[] = []) {
    super(`${originalMessage} at .${propertyPath.join('.')}`);
  }

  public static from(error: TypeValidationError, propertyPath: string[]): TypeValidationError {
    return new TypeValidationError(error.originalMessage, [...propertyPath, ...error.propertyPath]);
  }
}
