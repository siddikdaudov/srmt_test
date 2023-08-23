import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { createRequire } from "node:module";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactVirtualized()],
});

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

export function reactVirtualized() {
  return {
    name: "flat:react-virtualized",
    configResolved: async () => {
      const require = createRequire(import.meta.url);
      const reactVirtualizedPath = require.resolve("react-virtualized");
      const { pathname: reactVirtualizedFilePath } = new url.URL(
        reactVirtualizedPath,
        import.meta.url
      );
      const file = reactVirtualizedFilePath.replace(
        path.join("dist", "commonjs", "index.js"),
        path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
      );
      const code = await fs.readFile(file, "utf-8");
      const modified = code.replace(WRONG_CODE, "");
      await fs.writeFile(file, modified);
    },
  };
}
