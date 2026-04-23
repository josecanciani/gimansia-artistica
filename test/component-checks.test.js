import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { runAllChecks } from "@fusewire/client/checks";

const componentDir = new URL("../htdocs/components", import.meta.url).pathname;
const config = JSON.parse(
    readFileSync(new URL("../.fusewire.json", import.meta.url), "utf-8"),
);

describe("FuseWire Component Quality Checks", () => {
    it("all checks pass", async () => {
        const results = await runAllChecks(componentDir, config);
        const failures = results.filter((r) => r.violations.length > 0);
        if (failures.length > 0) {
            const msg = failures
                .flatMap((r) =>
                    r.violations.map((v) => `[${r.name}] ${v.message}`),
                )
                .join("\n\n");
            assert.fail(msg);
        }
    });
});
