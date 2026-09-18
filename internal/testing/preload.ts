import { GlobalRegistrator } from "@happy-dom/global-registrator";

import { localStorageMock } from "@/mocks";

GlobalRegistrator.register();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock(),
});
