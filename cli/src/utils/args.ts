/*
 * Copyright © 2023 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { Flags, Args } from "@oclif/core";
import { parseRef } from "./parsers";

/**
 * TODO: Describe exported const
 */
export const packageArgs = {
  platform: Args.string({
    description: "Platform",
    options: ["android", "ios"],
  }),
  packageName: Args.string({
    description: "Package identifier (e.g. com.example.app)",
  }),
};

/**
 * TODO: Describe exported const
 */
export const packageArgsRequired = {
  platform: Args.string({
    description: "Platform",
    options: ["android", "ios"],
    required: true,
  }),
  packageName: Args.string({
    description: "Package identifier (e.g. com.example.app)",
    required: true,
  }),
};

/**
 * TODO: Describe exported const
 */
export const groupFlags = {
  group: Flags.string({
    char: "g",
    summary: "Group name",
  }),
  "group-ref": Flags.string({
    summary: "Group reference",
    parse: parseRef,
  }),
};

