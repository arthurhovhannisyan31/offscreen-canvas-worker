export abstract class AbstractCanvasCalculator<P = any, R = any, I = any> {
  abstract calculate(params?: P): R;
  abstract init(params?: I): void;
}
