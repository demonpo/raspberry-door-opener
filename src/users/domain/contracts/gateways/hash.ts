export interface HashGenerator {
  generate(input: string): Promise<string>;
  validate(input: string, hashedPassword: string): Promise<boolean>;
}
export const HashGenerator = Symbol('HashGenerator');
