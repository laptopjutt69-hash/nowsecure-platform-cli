/*
 * Copyright © 2022 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { NowSecureClient } from "../../client";
import { rolesQuery } from "../../queries";
import { Role } from "../../types";

/**
 * TODO: Describe exported 
 * @param {*} client
 * @returns {*} NowSecureClient):
 */
export async function listRoles(client: NowSecureClient): Promise<Role[]> {
  const ret = await rolesQuery(client, {});
  return ret.my.organization.roles;
}

