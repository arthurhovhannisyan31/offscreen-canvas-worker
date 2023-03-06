interface AttributionContainer {
  id: string;
  src: string;
}

interface BreakdownAttribution {
  url: string;
  scope: string;
  container?: AttributionContainer;
}

interface MemoryBreakdown {
  bytes: number;
  attribution: BreakdownAttribution[];
  types: string[];
}

interface Performance extends Performance {
  memory?: {
    /** The maximum size of the heap, in bytes, that is available to the context. */
    jsHeapSizeLimit: number;
    /** The total allocated heap size, in bytes. */
    totalJSHeapSize: number;
    /** The currently active segment of JS heap, in bytes. */
    usedJSHeapSize: number;
  };
  measureUserAgentSpecificMemory(): {
    bytes: number;
    breakdown: MemoryBreakdown[]
  };
}

interface HTMLCanvasElement {
  transferControlToOffscreen(): OffscreenCanvas & Transferable;
}

type AnyArgsFunction = (...args: any) => void;
