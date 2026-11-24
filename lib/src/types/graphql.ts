/*
 * Copyright © 2023 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { JSONObject } from "../client";

/**
 * TODO: Describe exported interface
 */
export interface GraphQLErrorData {
  message: string;
  locations?: [{ line: number; column: number }];
  path?: [string | number];
  extensions: JSONObject;
}

/**
 * TODO: Describe exported interface
 */
export interface GraphQLResponse<T> {
  data?: T;
  errors?: [GraphQLErrorData];
}

