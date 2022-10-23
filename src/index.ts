#!/usr/bin/env node

import { getOptions } from "./options";
import chalk from "chalk";
import Logger from "./logger";
import { createFiles } from "./files";
import { getOrCreateConfig } from "./config";

const run = async () => {
  try {
    Logger.success("create-files-cli has started");

    const { config, created } = await getOrCreateConfig();

    if (created) return;

    Logger.info("Retrieving options...");

    const options = await getOptions(config);

    Logger.success("✔ Options retrieved");
    Logger.debug("Options\n", JSON.stringify(options, undefined, 2));

    Logger.info("Creating files...");

    await createFiles(options);

    Logger.success("💪 Files created!");
  } catch (e) {
    Logger.error(chalk.red(e));
  }
};

run();
