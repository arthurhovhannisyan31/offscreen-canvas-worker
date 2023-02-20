export abstract class AbstractCanvasCalculator<P = any, R = any> {
  abstract calculate(params?: P): R;
}
