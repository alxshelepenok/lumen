const json = await Bun.file("package.json").json();

if (process.argv.length !== 3) {
  process.stderr.write("Usage: bun up-version.mjs <new-version>\n");
  process.exit(1);
}

json.version = process.argv[2];

await Bun.write("package.json", JSON.stringify(json, null, 2));
