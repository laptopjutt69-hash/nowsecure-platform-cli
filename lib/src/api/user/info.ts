/*
 * Copyright © 2022 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { NowSecureClient } from "../../client";
import { currentUserQuery } from "../../queries";
import { FullUser } from "../../types";

/**
 * TODO: Describe exported 
 * @param {*} client
 * @returns {*} NowSecureClient):
 */
export async function userInfo(client: NowSecureClient): Promise<FullUser> {
  const ret = await currentUserQuery(client, {});
  return ret.my.user;
}

