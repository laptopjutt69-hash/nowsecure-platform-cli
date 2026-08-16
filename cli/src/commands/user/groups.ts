/*
 * Copyright © 2022 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { Group } from "@nowsecure/platform-lib/lib/types";
import { BaseCommand } from "../../utils/base-command";
import { Column } from "../../utils/table";

/**
 * TODO: Describe exported const
 * @returns {*} Column<Group
 */
export const groupDefaultColumns: Column<Group>[] = [
  { heading: "REF", data: "ref" },
  { heading: "NAME", data: "name" },
  { heading: "ACTIVE", data: (x) => (x.active ? "Yes" : "No") },
];

/**
 * TODO: Describe exported class
 */
export default class UserGroups extends BaseCommand {
  static description = "Get the user's groups";

  static examples = [`<%= config.bin %> <%= command.id %>`];

  async run(): Promise<Group[]> {
    const { platform } = await this.parseClient(UserGroups);
    const groups = await platform.userGroups();
    this.outputTable(groups, groupDefaultColumns);
    return groups;
  }
}

