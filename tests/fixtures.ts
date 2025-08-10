import { test as base } from '@playwright/test';
import { BaseSteps } from '../core/steps/base_steps';

export const test = base.extend<{ steps: BaseSteps }>({
    steps: async ({ page }, use) => {
        const steps = new BaseSteps(page);
        await use(steps);
    },
});
