import { defineConfig, type Project } from '@playwright/test';

/** Geräte-Matrix aus dem Auftrag. Mobile Profile mit Touch-Emulation. */
export const DEVICES = [
  { name: 'android-360', width: 360, height: 780, mobile: true, dpr: 3 },
  { name: 'iphone-15', width: 390, height: 844, mobile: true, dpr: 3 },
  { name: 'iphone-pro-max', width: 430, height: 932, mobile: true, dpr: 3 },
  { name: 'ipad-hoch', width: 820, height: 1180, mobile: true, dpr: 2 },
  { name: 'ipad-quer', width: 1180, height: 820, mobile: true, dpr: 2 },
  { name: 'laptop', width: 1440, height: 900, mobile: false, dpr: 1 },
  { name: 'desktop', width: 1920, height: 1080, mobile: false, dpr: 1 },
] as const;

const BROWSERS = ['chromium', 'webkit'] as const;

const projects: Project[] = BROWSERS.flatMap((browserName) =>
  DEVICES.map((d) => ({
    name: `${d.name}-${browserName}`,
    use: {
      browserName,
      viewport: { width: d.width, height: d.height },
      deviceScaleFactor: d.dpr,
      hasTouch: d.mobile,
      isMobile: d.mobile && browserName === 'chromium',
      userAgent: undefined,
    },
    metadata: { device: d.name, mobile: d.mobile, browser: browserName },
  })),
);

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.PW_WORKERS ? Number(process.env.PW_WORKERS) : 6,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'docs/qa/playwright-results.json' }]],
  use: {
    baseURL: 'http://localhost:4321',
    locale: 'de-AT',
    timezoneId: 'Europe/Vienna',
    trace: 'off',
    screenshot: 'off',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects,
});
