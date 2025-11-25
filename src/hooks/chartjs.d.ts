import 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType> {
    customTotal?: number;
  }
}
