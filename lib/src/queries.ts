/*
 * Copyright © 2022 NowSecure Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import { DocumentNode } from "graphql/language/ast";
import { JSONObject, NowSecureClient } from "./client";
import {
  AppsList,
  AppsListQuery,
  AppsListQueryVariables,
  Assessments,
  AssessmentInfo,
  AssessmentInfoQuery,
  AssessmentInfoQueryVariables,
  AssessmentsQuery,
  AssessmentsQueryVariables,
  CreateInvitation,
  CreateInvitationMutation,
  CreateInvitationMutationVariables,
  CurrentUser,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  Invitations,
  InvitationsQuery,
  InvitationsQueryVariables,
  LicenseValid,
  LicenseValidQuery,
  LicenseValidQueryVariables,
  OrgGroupsQueryVariables,
  OrgGroupsQuery,
  OrgGroups,
  OrgUsers,
  OrgUsersQuery,
  OrgUsersQueryVariables,
  RevokeInvitation,
  RevokeInvitationMutation,
  RevokeInvitationMutationVariables,
  Roles,
  RolesQuery,
  RolesQueryVariables,
  UserGroups,
  UserGroupsQuery,
  UserGroupsQueryVariables,
  AppAnalysisConfigQuery,
  AppAnalysisConfigQueryVariables,
  AppAnalysisConfig,
  UpdateAppAnalysisConfigMutation,
  UpdateAppAnalysisConfigMutationVariables,
  UpdateAppAnalysisConfig,
  ResetAppAnalysisConfigMutation,
  ResetAppAnalysisConfigMutationVariables,
  ResetAppAnalysisConfig,
} from "./generated/graphql";

/**
 * TODO: Describe exported function
 */
export function makeQuery<RET extends JSONObject, ARGS extends JSONObject>(
  query: DocumentNode | string
): (
  client: NowSecureClient,
  args: ARGS,
  ignoreGQLErrors?: boolean
) => Promise<RET> {
  return (client: NowSecureClient, args: ARGS, ignoreGQLErrors = false) => {
    return client.query<RET, ARGS>(query, args, ignoreGQLErrors);
  };
}

/**
 * TODO: Describe exported function
 */
export function makeMutation<RET extends JSONObject, ARGS extends JSONObject>(
  query: DocumentNode | string
): (
  client: NowSecureClient,
  args: ARGS,
  ignoreGQLErrors?: boolean
) => Promise<RET> {
  return (client: NowSecureClient, args: ARGS, ignoreGQLErrors = false) => {
    return client.mutation<RET, ARGS>(query, args, ignoreGQLErrors);
  };
}

/**
 * TODO: Describe exported const
 */
export const listApplicationsQuery = makeQuery<
  AppsListQuery,
  AppsListQueryVariables
>(AppsList);

/**
 * TODO: Describe exported const
 */
export const assessmentInfoQuery = makeQuery<
  AssessmentInfoQuery,
  AssessmentInfoQueryVariables
>(AssessmentInfo);

/**
 * TODO: Describe exported const
 */
export const assessmentsQuery = makeQuery<
  AssessmentsQuery,
  AssessmentsQueryVariables
>(Assessments);

/**
 * TODO: Describe exported const
 */
export const listInvitationsQuery = makeQuery<
  InvitationsQuery,
  InvitationsQueryVariables
>(Invitations);

/**
 * TODO: Describe exported const
 */
export const licenseValidQuery = makeQuery<
  LicenseValidQuery,
  LicenseValidQueryVariables
>(LicenseValid);

/**
 * TODO: Describe exported 
 * @param {*} Roles
 */
export const rolesQuery = makeQuery<RolesQuery, RolesQueryVariables>(Roles);

/**
 * TODO: Describe exported const
 */
export const userGroupsQuery = makeQuery<
  UserGroupsQuery,
  UserGroupsQueryVariables
>(UserGroups);

/**
 * TODO: Describe exported const
 */
export const orgUsersQuery = makeQuery<OrgUsersQuery, OrgUsersQueryVariables>(
  OrgUsers
);

/**
 * TODO: Describe exported const
 */
export const currentUserQuery = makeQuery<
  CurrentUserQuery,
  CurrentUserQueryVariables
>(CurrentUser);

/**
 * TODO: Describe exported const
 */
export const orgGroupsQuery = makeQuery<
  OrgGroupsQuery,
  OrgGroupsQueryVariables
>(OrgGroups);

/**
 * TODO: Describe exported const
 */
export const appAnalysisConfigQuery = makeQuery<
  AppAnalysisConfigQuery,
  AppAnalysisConfigQueryVariables
>(AppAnalysisConfig);

/**
 * TODO: Describe exported const
 */
export const inviteUserMutation = makeMutation<
  CreateInvitationMutation,
  CreateInvitationMutationVariables
>(CreateInvitation);

/**
 * TODO: Describe exported const
 */
export const revokeInvitationMutation = makeMutation<
  RevokeInvitationMutation,
  RevokeInvitationMutationVariables
>(RevokeInvitation);

/**
 * TODO: Describe exported const
 */
export const updateAppAnalysisConfigMutation = makeMutation<
  UpdateAppAnalysisConfigMutation,
  UpdateAppAnalysisConfigMutationVariables
>(UpdateAppAnalysisConfig);

/**
 * TODO: Describe exported const
 */
export const resetAppAnalysisConfigMutation = makeMutation<
  ResetAppAnalysisConfigMutation,
  ResetAppAnalysisConfigMutationVariables
>(ResetAppAnalysisConfig);

