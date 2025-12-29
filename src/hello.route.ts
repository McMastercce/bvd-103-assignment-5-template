import { Controller, Get, Route, Path } from 'tsoa';

/**
 * A simple hello controller for testing tsoa setup
 */
@Route('hello')
export class HelloController extends Controller {
  /**
   * Get a personalized greeting
   * @param name The name to greet
   * @returns A greeting message
   */
  @Get('{name}')
  public async getGreeting(@Path() name: string): Promise<{ message: string }> {
    return { message: `Hello ${name}!` };
  }
}
