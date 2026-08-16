/*
 * Copyright © 2023 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { Command } from "@oclif/core";

/**
 * A minimal subset of command functions used in the utils
 */
/**
 * TODO: Describe exported type
 */
export type CommandCore = Pick<Command, "error" | "log" | "warn">;

