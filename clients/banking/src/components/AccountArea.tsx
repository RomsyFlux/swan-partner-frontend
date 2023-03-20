import * as Sentry from "@sentry/react";
import { Array, Dict, Option, Result } from "@swan-io/boxed";
import { AutoWidthImage } from "@swan-io/lake/src/components/AutoWidthImage";
import { Box } from "@swan-io/lake/src/components/Box";
import { Fill } from "@swan-io/lake/src/components/Fill";
import { Icon } from "@swan-io/lake/src/components/Icon";
import { LakeText } from "@swan-io/lake/src/components/LakeText";
import { LoadingView } from "@swan-io/lake/src/components/LoadingView";
import { Popover } from "@swan-io/lake/src/components/Popover";
import { ProjectEnvTag } from "@swan-io/lake/src/components/ProjectEnvTag";
import { SidebarNavigationTracker } from "@swan-io/lake/src/components/SidebarNavigationTracker";
import { Space } from "@swan-io/lake/src/components/Space";
import { Tag } from "@swan-io/lake/src/components/Tag";
import { WithPartnerAccentColor } from "@swan-io/lake/src/components/WithPartnerAccentColor";
import { defaultAccentColor } from "@swan-io/lake/src/constants/colors";
import { commonStyles } from "@swan-io/lake/src/constants/commonStyles";
import { backgroundColor, colors, spacings } from "@swan-io/lake/src/constants/design";
import { insets } from "@swan-io/lake/src/constants/insets";
import { usePersistedState } from "@swan-io/lake/src/hooks/usePersistedState";
import { useResponsive } from "@swan-io/lake/src/hooks/useResponsive";
import { useUpdateEffect } from "@swan-io/lake/src/hooks/useUpdateEffect";
import { showToast } from "@swan-io/lake/src/state/toasts";
import { isEmpty, isNotEmpty, isNullish } from "@swan-io/lake/src/utils/nullish";
import { CONTENT_ID, SkipToContent } from "@swan-io/shared-business/src/components/SkipToContent";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { match, P } from "ts-pattern";
import logoSwan from "../assets/images/logo-swan.svg";
import { LegacyAccentColorProvider } from "../contexts/legacyAccentColor";
import { AccountAreaDocument, IdentificationLevelsFragment } from "../graphql/partner";
import { AccountActivationPage } from "../pages/AccountActivationPage";
import { ConsentCallbackPage } from "../pages/ConsentCallbackPage";
import { EditStandingOrder } from "../pages/EditStandingOrder";
import { NewPaymentWizard } from "../pages/NewPaymentWizard";
import { NewStandingOrderWizard } from "../pages/NewStandingOrderWizard";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PaymentFailurePage } from "../pages/PaymentFailurePage";
import { PaymentsPage } from "../pages/PaymentsPage";
import { PaymentSuccessPage } from "../pages/PaymentSuccessPage";
import { ProfilePage } from "../pages/ProfilePage";
import { StandingOrderFailurePage } from "../pages/StandingOrderFailurePage";
import { StandingOrderHistoryPage } from "../pages/StandingOrderHistoryPage";
import { StandingOrdersPage } from "../pages/StandingOrdersPage";
import { StandingOrderSuccessPage } from "../pages/StandingOrderSuccessPage";
import { env } from "../utils/env";
import { t } from "../utils/i18n";
import { logFrontendError, setSentryUser } from "../utils/logger";
import { projectConfiguration } from "../utils/projectId";
import {
  accountMinimalRoutes,
  historyMenuRoutes,
  paymentMenuRoutes,
  RouteName,
  Router,
} from "../utils/routes";
import { useQueryWithErrorBoundary } from "../utils/urql";
import { AccountDetailsArea } from "./AccountDetailsArea";
import { AccountNavigation, Menu } from "./AccountNavigation";
import { AccountActivationTag, AccountPicker, AccountPickerButton } from "./AccountPicker";
import { CardsArea } from "./CardsArea";
import { ErrorView } from "./ErrorView";
import { MembershipsArea } from "./MembershipsArea";
import { NavigationTabBar, navigationTabBarHeight } from "./NavigationTabBar";
import { PaymentsAreaV2 } from "./PaymentsAreaV2";
import { ProfileButton } from "./ProfileButton";
import { Redirect } from "./Redirect";
import { TransactionsArea } from "./TransactionsArea";

const SIDEBAR_WIDTH = 300;
const LOGO_MAX_HEIGHT = 40;
const LOGO_MAX_WIDTH = 180;

const styles = StyleSheet.create({
  background: {
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: backgroundColor.default,
  },
  content: {
    ...commonStyles.fill,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: backgroundColor.default,
  },
  desktopContainer: {
    flexDirection: "row",
    width: "100%",
    marginHorizontal: "auto",
  },
  sidebar: {
    backgroundColor: backgroundColor.accented,
    flexGrow: 0,
    flexShrink: 0,
    minHeight: "100%",
    paddingLeft: "calc(calc(100vw - 1520px) / 2)",
  },
  sidebarContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 45,
    paddingBottom: 24,
    width: SIDEBAR_WIDTH,
  },
  mobileContentContainer: {
    // be carefull to not put commonStyles.fill here, it will break sticky tabs
    minHeight: "100%",
    paddingBottom: navigationTabBarHeight,
  },
  desktopContentContainer: {
    ...commonStyles.fill,
    borderColor: colors.gray[100],
    borderLeftWidth: 1,
    maxWidth: 1220,
  },
  headerMobile: {
    paddingTop: insets.addToTop(16),
    paddingLeft: insets.addToLeft(16),
    paddingRight: insets.addToRight(16),
    paddingBottom: 0,
    backgroundColor: backgroundColor.default,
    flexDirection: "row",
    justifyContent: "center",
  },
  accountPicker: {
    maxWidth: 530,
    maxHeight: 220,
  },
  additionalLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacings[8],
  },
  logo: {
    height: LOGO_MAX_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {
  accountMembershipId: string;
};

const defaultIdentificationLevels: IdentificationLevelsFragment = {
  __typename: "IdentificationLevels",
  expert: false,
  QES: false,
  PVID: false,
};

export const AccountArea = ({ accountMembershipId }: Props) => {
  const { desktop } = useResponsive();

  const [
    {
      data: { accountMembership, projectInfo, user },
    },
    reexecuteQuery,
  ] = useQueryWithErrorBoundary({
    query: AccountAreaDocument,
    variables: { accountMembershipId },
  });

  const currentAccountMembership = useMemo(
    () => Option.fromNullable(accountMembership).toResult(new Error("NoAccountMembership")),
    [accountMembership],
  );

  const hasMultipleMemberships = currentAccountMembership
    .toOption()
    .flatMap(data => Option.fromNullable(data.user))
    .map(({ accountMemberships: { totalCount } }) => totalCount > 1)
    .getWithDefault(false);

  const account = accountMembership?.account;
  const holder = account?.holder;

  const isIndividual = holder?.info.__typename === "AccountHolderIndividualInfo";
  const hasTransactions = (account?.transactions?.totalCount ?? 0) >= 1;

  const identificationStatus = user?.identificationStatus;
  const identificationLevels: IdentificationLevelsFragment =
    user?.identificationLevels ?? defaultIdentificationLevels;
  const userStatusIsProcessing = identificationStatus === "Processing";

  // checks that at least one identificationLevel is valid
  const idVerified = Array.keepMap(Dict.entries(identificationLevels), ([_, value]) =>
    typeof value === "boolean" ? Option.Some(value) : Option.None(),
  ).some(isValid => isValid);

  const documentCollection = holder?.supportingDocumentCollections.edges[0]?.node;
  const documentCollectionStatus = documentCollection?.statusInfo.status;

  const userId = user?.id ?? "";
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const phoneNumber = user?.mobilePhoneNumber ?? "";

  const activationTagInput = {
    documentCollectionStatus,
    hasTransactions,
    identificationStatus,
    accountHolderType: account?.holder.info.__typename,
    isIndividual,
    isLegalRepresentative: accountMembership?.legalRepresentative ?? false,
    account,
  } as const;

  const activationTag = match<typeof activationTagInput, AccountActivationTag>(activationTagInput)
    // if payment level limitations have been lifted, no need for activation
    .with(
      { account: { paymentLevel: "Unlimited", paymentAccountType: "PaymentService" } },
      () => "none",
    )
    // never show to non-legal rep memberships
    .with({ isLegalRepresentative: false }, () => "none")
    .with({ identificationStatus: "Processing" }, () => "pending")
    .with({ identificationStatus: P.not("ValidIdentity") }, () => "actionRequired")
    .with(
      { documentCollectionStatus: "PendingReview", accountHolderType: "AccountHolderCompanyInfo" },
      () => "pending",
    )
    .with(
      {
        documentCollectionStatus: P.not("Approved"),
        accountHolderType: "AccountHolderCompanyInfo",
      },
      () => "actionRequired",
    )
    .with({ isIndividual: true, hasTransactions: false }, () => "actionRequired")
    .otherwise(() => "none");

    const [, setAccountMembershipState] = usePersistedState<unknown>(
      `swan_session_webBankingAccountMembershipState${projectConfiguration
        .map(({ projectId }) => `_${projectId}`)
        .getWithDefault("")}`,
      {},
    );

  useEffect(() => {
    match(currentAccountMembership)
      .with(Result.pattern.Ok({ id: P.select(), user: { id: user?.id } }), accountMembershipId =>
        setAccountMembershipState({ accountMembershipId }),
      )
      .otherwise(() => setAccountMembershipState({}));
  }, [setAccountMembershipState, currentAccountMembership, user]);

  const refetchAccountAreaQuery = useCallback(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [reexecuteQuery]);

  useEffect(() => {
    if (userId) {
      const sentryUser: Record<string, unknown> = { id: userId };

      firstName && (sentryUser["firstName"] = firstName);
      lastName && (sentryUser["lastName"] = lastName);
      phoneNumber && (sentryUser["phoneNumber"] = phoneNumber);

      setSentryUser(sentryUser);
    } else {
      setSentryUser(null);
    }
  }, [firstName, lastName, phoneNumber, userId]);

  const settings = projectInfo.webBankingSettings;

  const canInitiatePaymentsToNewBeneficiaries = Boolean(
    settings?.canInitiatePaymentsToNewBeneficiaries,
  );

  const canAddNewMembers = Boolean(settings?.canAddNewMembers);
  const canManageVirtualIbans = Boolean(settings?.canManageVirtualIbans);
  const canOrderPhysicalCards = Boolean(settings?.canOrderPhysicalCards);
  const canOrderVirtualCards = Boolean(settings?.canOrderVirtualCards);
  const canViewAccountDetails = Boolean(settings?.canViewAccountDetails);
  const canViewAccountStatement = Boolean(settings?.canViewAccountStatement);
  const canViewMembers = Boolean(settings?.canViewMembers);
  const canViewPaymentList = Boolean(settings?.canViewPaymentList);

  const membership = useMemo(
    () =>
      currentAccountMembership.map(accountMembership => {
        const { canInitiatePayments, canManageBeneficiaries, canViewAccount, legalRepresentative } =
          accountMembership;

        const membershipEnabled = accountMembership.statusInfo.status === "Enabled";
        const canManageAccountMembership =
          accountMembership.canManageAccountMembership && membershipEnabled;
        const canAddCard = canManageAccountMembership && canOrderVirtualCards;

        return {
          accountMembership,
          isLegalRepresentative: legalRepresentative,
          canManageAccountMembership,
          canInitiatePayments,
          canManageBeneficiaries,
          canAddCard,
          historyMenuIsVisible: canViewAccount,
          detailsMenuIsVisible: canViewAccount && canViewAccountDetails,
          paymentMenuIsVisible:
            canInitiatePayments &&
            membershipEnabled &&
            (canInitiatePaymentsToNewBeneficiaries || canViewPaymentList),
          // In case the user doesn't have the right to manage cards
          // but has one attached to the current membership
          cardMenuIsVisible: accountMembership.allCards.totalCount > 0 || canAddCard,
          memberMenuIsVisible: canViewMembers && canManageAccountMembership,
        };
      }),
    [
      canInitiatePaymentsToNewBeneficiaries,
      canOrderVirtualCards,
      canViewAccountDetails,
      canViewMembers,
      canViewPaymentList,
      currentAccountMembership,
    ],
  );

  const accentColor = projectInfo.accentColor ?? defaultAccentColor;
  const projectName = projectInfo.name;
  const projectLogo = projectInfo.logoUri ?? undefined;

  const menu = membership
    .map<Menu>(
      ({
        accountMembership,
        historyMenuIsVisible,
        detailsMenuIsVisible,
        paymentMenuIsVisible,
        cardMenuIsVisible,
        memberMenuIsVisible,
      }) => [
        {
          matchRoutes: ["AccountTransactionsArea"],
          iconActive: "apps-list-filled",
          icon: "apps-list-regular",
          name: t("navigation.history"),
          to: Router.AccountTransactionsListRoot({ accountMembershipId }),
          hidden: !historyMenuIsVisible,
        },
        {
          matchRoutes: ["AccountDetailsArea"],
          iconActive: "building-bank-filled",
          icon: "building-bank-regular",
          name: t("navigation.account"),
          to: Router.AccountDetailsIban({ accountMembershipId }),
          hidden: !detailsMenuIsVisible,
        },
        {
          matchRoutes: ["AccountPaymentsArea", "AccountStandingOrdersArea"],
          iconActive: "arrow-swap-filled",
          icon: "arrow-swap-regular",
          name: t("navigation.payments"),
          to: Router.AccountPayments({ accountMembershipId }),
          hidden: !paymentMenuIsVisible,
        },
        {
          matchRoutes: ["AccountCardsArea"],
          iconActive: "payment-filled",
          icon: "payment-regular",
          name: t("navigation.cards"),
          to: Router.AccountCardsList({ accountMembershipId }),
          hidden: !cardMenuIsVisible,
        },
        {
          matchRoutes: ["AccountMembersArea"],
          iconActive: "people-filled",
          icon: "people-regular",
          name: t("navigation.members"),
          to: Router.AccountMembersList({ accountMembershipId }),
          hidden: !memberMenuIsVisible,
          hasNotifications: Option.fromNullable(accountMembership.account)
            .map(
              ({ accountMembershipsWithBindingUserError }) =>
                accountMembershipsWithBindingUserError.totalCount > 0,
            )
            .getWithDefault(false),
        },
      ],
    )
    .getWithDefault([]);

  const routes = useMemo(() => {
    const routes: RouteName[] = [...accountMinimalRoutes];

    membership.toOption().match({
      None: () => {},
      Some: ({
        historyMenuIsVisible,
        detailsMenuIsVisible,
        paymentMenuIsVisible,
        cardMenuIsVisible,
        memberMenuIsVisible,
      }) => {
        historyMenuIsVisible && routes.push(...historyMenuRoutes);
        detailsMenuIsVisible && routes.push("AccountDetailsArea");
        paymentMenuIsVisible && routes.push(...paymentMenuRoutes);
        cardMenuIsVisible && routes.push("AccountCardsArea");
        memberMenuIsVisible && routes.push("AccountMembersArea");
      },
    });

    canInitiatePaymentsToNewBeneficiaries && routes.push("AccountPaymentsStandingOrderNew");

    return routes;
  }, [membership, canInitiatePaymentsToNewBeneficiaries]);

  const route = Router.useRoute(routes);

  const email = currentAccountMembership
    .map(accountMembership => accountMembership.email)
    .toOption()
    .toUndefined();

  const additionalInfo = useMemo(
    () => ({
      firstName,
      lastName,
      phoneNumber,
      userId,
      email,
      projectName,
    }),
    [firstName, lastName, phoneNumber, userId, email, projectName],
  );

  const accountPickerButtonRef = useRef<View | null>(null);

  const [{ selectedMembershipId, isAccountPickerOpen }, setAccountPickerState] = useState({
    selectedMembershipId: accountMembershipId,
    isAccountPickerOpen: false,
  });

  useUpdateEffect(() => {
    Router.push("AccountRoot", { accountMembershipId: selectedMembershipId });
  }, [selectedMembershipId]);

  const signout = () => {
    fetch(`/auth/logout`, {
      method: "post",
      credentials: "include",
    })
      .then(async response => {
        if (response.ok) {
          Router.replace("ProjectLogin");
        } else {
          const message = await response.text();
          throw new Error(message);
        }
      })
      .catch((error: Error) => {
        showToast({ variant: "error", title: t("error.generic") });
        logFrontendError(error);
      });
  };

  const [availableBalance, setAvailableBalance] = useState(() =>
    membership
      .map(({ accountMembership }) => accountMembership.account?.balances?.available)
      .toOption()
      .toUndefined(),
  );

  useEffect(() => {
    setAvailableBalance(
      membership
        .map(({ accountMembership }) => accountMembership.account?.balances?.available)
        .toOption()
        .toUndefined(),
    );
  }, [membership]);

  if (membership.isError()) {
    return <Redirect to={Router.ProjectRootRedirect()} />;
  }

  return (
    <WithPartnerAccentColor color={accentColor}>
      {/* TODO: Remove this provider, keep WithPartnerAccentColor */}
      <LegacyAccentColorProvider value={accentColor}>
        <SkipToContent />

        <View style={styles.background}>
          <View style={[styles.container, desktop && styles.desktopContainer]}>
            {desktop && (
              <SidebarNavigationTracker
                style={styles.sidebar}
                contentContainerStyle={styles.sidebarContent}
              >
                <Box alignItems="center">
                  <View style={styles.logo}>
                    <AutoWidthImage
                      accessibilityLabel={projectName}
                      sourceUri={projectLogo ?? logoSwan}
                      height={LOGO_MAX_HEIGHT}
                      maxWidth={LOGO_MAX_WIDTH}
                      resizeMode="contain"
                    />
                  </View>
                </Box>

                {env.APP_TYPE === "SANDBOX" && (
                  <>
                    <Space height={12} />

                    <Box alignItems="center">
                      <ProjectEnvTag projectEnv="Sandbox" />
                    </Box>
                  </>
                )}

                {match(membership)
                  .with(Result.pattern.Ok(P.select()), ({ accountMembership }) => (
                    <>
                      <Suspense fallback={null}>
                        <Space height={32} />

                        <AccountPickerButton
                          ref={accountPickerButtonRef}
                          desktop={true}
                          accountMembershipId={accountMembershipId}
                          activationTag={activationTag}
                          activationLinkActive={route?.name === "AccountActivation"}
                          hasMultipleMemberships={hasMultipleMemberships}
                          selectedAccountMembership={accountMembership}
                          onPress={() => {
                            setAccountPickerState(({ selectedMembershipId }) => ({
                              selectedMembershipId,
                              isAccountPickerOpen: true,
                            }));
                          }}
                          availableBalance={availableBalance}
                        />

                        <Popover
                          referenceRef={accountPickerButtonRef}
                          matchReferenceMinWidth={true}
                          visible={isAccountPickerOpen}
                          onDismiss={() => {
                            setAccountPickerState(({ selectedMembershipId }) => ({
                              selectedMembershipId,
                              isAccountPickerOpen: false,
                            }));
                          }}
                        >
                          <View style={styles.accountPicker}>
                            <AccountPicker
                              accountMembershipId={accountMembershipId}
                              onPressItem={accountMembershipId => {
                                setAccountPickerState({
                                  selectedMembershipId: accountMembershipId,
                                  isAccountPickerOpen: false,
                                });
                              }}
                              availableBalance={availableBalance}
                            />
                          </View>
                        </Popover>

                        <Space height={32} />
                        <AccountNavigation menu={menu} />
                      </Suspense>

                      <Fill minHeight={48} />

                      <Pressable
                        accessibilityRole="button"
                        style={styles.additionalLink}
                        onPress={signout}
                      >
                        <Icon name="sign-out-regular" size={22} color={colors.negative[500]} />
                        <Space width={12} />
                        <LakeText variant="medium">{t("login.signout")}</LakeText>
                      </Pressable>

                      <Space height={12} />

                      <ProfileButton
                        identificationStatus={identificationStatus ?? "Uninitiated"}
                        firstName={firstName}
                        lastName={lastName}
                        accountMembershipId={accountMembershipId}
                        shouldDisplayIdVerification={
                          !(
                            projectInfo.B2BMembershipIDVerification === false &&
                            accountMembership.canManageAccountMembership === false &&
                            accountMembership.canInitiatePayments === false &&
                            accountMembership.canManageBeneficiaries === false
                          )
                        }
                      />
                    </>
                  ))
                  .otherwise(() => null)}
              </SidebarNavigationTracker>
            )}

            <ScrollView
              contentContainerStyle={
                desktop ? styles.desktopContentContainer : styles.mobileContentContainer
              }
            >
              {!desktop && (
                <>
                  <Box
                    accessibilityRole="banner"
                    direction="row"
                    alignItems="center"
                    style={styles.headerMobile}
                  >
                    <AutoWidthImage
                      accessibilityLabel={projectName}
                      sourceUri={projectLogo ?? logoSwan}
                      height={32}
                      resizeMode="contain"
                    />

                    {env.APP_TYPE === "SANDBOX" && (
                      <>
                        <Space width={12} />
                        <Tag color="sandbox" accessibilityLabel="Sandbox" icon="beaker-regular" />
                      </>
                    )}
                  </Box>
                </>
              )}

              <View style={styles.content} nativeID={CONTENT_ID} focusable={true}>
                <Sentry.ErrorBoundary
                  key={route?.name}
                  fallback={({ error }) => <ErrorView error={error} />}
                >
                  {match(membership)
                    .with(
                      Result.pattern.Ok(P.select()),
                      ({
                        accountMembership,
                        canAddCard,
                        canManageAccountMembership,
                        cardMenuIsVisible,
                        isLegalRepresentative,
                        historyMenuIsVisible,
                        detailsMenuIsVisible,
                        memberMenuIsVisible,
                        paymentMenuIsVisible,
                      }) => {
                        const accountId = accountMembership.account?.id;

                        const indexUrl: string = historyMenuIsVisible
                          ? Router.AccountTransactionsListRoot({ accountMembershipId })
                          : detailsMenuIsVisible
                          ? Router.AccountDetailsIban({ accountMembershipId })
                          : paymentMenuIsVisible
                          ? Router.AccountPayments({ accountMembershipId })
                          : cardMenuIsVisible
                          ? Router.AccountCardsList({ accountMembershipId })
                          : memberMenuIsVisible
                          ? Router.AccountMembersList({ accountMembershipId })
                          : "";

                        if (accountMembership.user?.id !== user?.id) {
                          return <Redirect to={Router.ProjectRootRedirect()} />;
                        }

                        const canQueryCardOnTransaction =
                          accountMembership.statusInfo.status !== "BindingUserError" &&
                          accountMembership.canManageAccountMembership;

                        return (
                          <Suspense fallback={<LoadingView color={accentColor} />}>
                            {match(route)
                              .with({ name: "AccountRoot" }, () =>
                                isNotEmpty(indexUrl) ? (
                                  <Redirect to={indexUrl} />
                                ) : (
                                  <NotFoundPage
                                    title={t("error.noAccount")}
                                    text={t("error.checkWithProvider", { projectName })}
                                  />
                                ),
                              )
                              .with({ name: "AccountProfile" }, () =>
                                currentAccountMembership.match({
                                  Ok: ({
                                    email,
                                    canManageAccountMembership,
                                    canManageBeneficiaries,
                                    canInitiatePayments,
                                    recommendedIdentificationLevel,
                                  }) => (
                                    <ProfilePage
                                      recommendedIdentificationLevel={
                                        recommendedIdentificationLevel
                                      }
                                      additionalInfo={additionalInfo}
                                      userStatusIsProcessing={userStatusIsProcessing}
                                      refetchAccountAreaQuery={refetchAccountAreaQuery}
                                      isLegalRepresentative={isLegalRepresentative}
                                      email={email}
                                      shouldDisplayIdVerification={
                                        !(
                                          projectInfo.B2BMembershipIDVerification === false &&
                                          canManageAccountMembership === false &&
                                          canInitiatePayments === false &&
                                          canManageBeneficiaries === false
                                        )
                                      }
                                    />
                                  ),
                                  Error: () => <ErrorView />,
                                }),
                              )
                              .with({ name: "AccountDetailsArea" }, () =>
                                isNullish(accountId) || !detailsMenuIsVisible ? (
                                  <ErrorView />
                                ) : (
                                  <AccountDetailsArea
                                    accountId={accountId}
                                    accountMembershipId={accountMembershipId}
                                    canManageAccountMembership={canManageAccountMembership}
                                    canManageVirtualIbans={canManageVirtualIbans}
                                    idVerified={idVerified}
                                    projectName={projectName}
                                    userStatusIsProcessing={userStatusIsProcessing}
                                    isIndividual={isIndividual}
                                  />
                                ),
                              )
                              .with(
                                { name: "AccountTransactionsArea" },
                                ({ params: { accountMembershipId } }) =>
                                  isNullish(accountId) ? (
                                    <ErrorView />
                                  ) : (
                                    <TransactionsArea
                                      accountId={accountId}
                                      accountMembershipId={accountMembershipId}
                                      canQueryCardOnTransaction={canQueryCardOnTransaction}
                                      onBalanceReceive={setAvailableBalance}
                                      canViewAccountStatement={canViewAccountStatement}
                                    />
                                  ),
                              )

                              .with({ name: "AccountPayments" }, () => (
                                <>
                                  <Space height={24} />

                                  <PaymentsPage
                                    accountMembershipId={accountMembershipId}
                                    newStandingOrderIsVisible={
                                      canInitiatePaymentsToNewBeneficiaries
                                    }
                                  />
                                </>
                              ))
                              .with({ name: "AccountPaymentsV2Area" }, () =>
                                isNullish(accountId) ? (
                                  <ErrorView />
                                ) : (
                                  <PaymentsAreaV2
                                    accountId={accountId}
                                    accountMembershipId={accountMembershipId}
                                    newStandingOrderIsVisible={
                                      canInitiatePaymentsToNewBeneficiaries
                                    }
                                    canQueryCardOnTransaction={canQueryCardOnTransaction}
                                  />
                                ),
                              )
                              .with({ name: "AccountPaymentsNew" }, () =>
                                isNullish(accountId) ? (
                                  <ErrorView />
                                ) : (
                                  <>
                                    <Space height={24} />

                                    <NewPaymentWizard
                                      accountId={accountId}
                                      accountMembershipId={accountMembershipId}
                                    />
                                  </>
                                ),
                              )
                              .with({ name: "AccountPaymentsSuccess" }, () => (
                                <>
                                  <Space height={24} />
                                  <PaymentSuccessPage accountMembershipId={accountMembershipId} />
                                </>
                              ))
                              .with({ name: "AccountPaymentsFailure" }, () => (
                                <>
                                  <Space height={24} />
                                  <PaymentFailurePage accountMembershipId={accountMembershipId} />
                                </>
                              ))
                              .with(
                                { name: "AccountPaymentsConsent" },
                                ({ params: { consentId, standingOrder } }) => (
                                  <ConsentCallbackPage
                                    accountMembershipId={accountMembershipId}
                                    consentId={consentId ?? ""}
                                    standingOrder={standingOrder ?? ""}
                                  />
                                ),
                              )
                              .with({ name: "AccountPaymentsStandingOrderNew" }, () =>
                                isNullish(accountId) ? (
                                  <ErrorView />
                                ) : (
                                  <>
                                    <Space height={24} />

                                    <NewStandingOrderWizard
                                      accountMembershipId={accountMembershipId}
                                      accountId={accountId}
                                    />
                                  </>
                                ),
                              )
                              .with({ name: "AccountPaymentsStandingOrderSuccess" }, () => (
                                <>
                                  <Space height={24} />

                                  <StandingOrderSuccessPage
                                    accountMembershipId={accountMembershipId}
                                  />
                                </>
                              ))
                              .with({ name: "AccountPaymentsStandingOrderFailure" }, () => (
                                <>
                                  <Space height={24} />

                                  <StandingOrderFailurePage
                                    accountMembershipId={accountMembershipId}
                                  />
                                </>
                              ))
                              .with({ name: "AccountStandingOrders" }, () =>
                                isNullish(accountId) ? (
                                  <ErrorView />
                                ) : (
                                  <>
                                    <Space height={24} />

                                    <StandingOrdersPage
                                      accountId={accountId}
                                      accountMembershipId={accountMembershipId}
                                    />
                                  </>
                                ),
                              )
                              .with(
                                { name: "AccountStandingOrdersEdit" },
                                ({ params: { standingOrderId } }) => (
                                  <>
                                    <Space height={24} />

                                    <EditStandingOrder
                                      accountMembershipId={accountMembershipId}
                                      standingOrderId={standingOrderId}
                                    />
                                  </>
                                ),
                              )
                              .with(
                                { name: "AccountStandingOrdersHistory" },
                                ({ params: { standingOrderId } }) => (
                                  <>
                                    <Space height={24} />

                                    <StandingOrderHistoryPage
                                      standingOrderId={standingOrderId}
                                      canQueryCardOnTransaction={canQueryCardOnTransaction}
                                    />
                                  </>
                                ),
                              )
                              .with({ name: "AccountCardsArea" }, () => (
                                <CardsArea
                                  accountMembershipId={accountMembershipId}
                                  accountId={accountId}
                                  userId={userId}
                                  refetchAccountAreaQuery={refetchAccountAreaQuery}
                                  canAddCard={canAddCard}
                                  accountMembership={accountMembership}
                                  idVerified={idVerified}
                                  userStatusIsProcessing={userStatusIsProcessing}
                                  canManageAccountMembership={canManageAccountMembership}
                                  canOrderPhysicalCards={canOrderPhysicalCards}
                                  B2BMembershipIDVerification={Boolean(
                                    projectInfo.B2BMembershipIDVerification,
                                  )}
                                />
                              ))
                              .with({ name: "AccountMembersArea" }, ({ params }) =>
                                match({ accountId, accountMembership })
                                  .with(
                                    {
                                      accountId: P.string,
                                      accountMembership: { account: { country: P.string } },
                                    },
                                    ({
                                      accountId,
                                      accountMembership: currentUserAccountMembership,
                                    }) => (
                                      <MembershipsArea
                                        accountMembershipId={accountMembershipId}
                                        accountId={accountId}
                                        canAddNewMembers={canAddNewMembers}
                                        canAddCard={canAddCard}
                                        onAccountMembershipUpdate={refetchAccountAreaQuery}
                                        accountCountry={
                                          currentUserAccountMembership.account.country
                                        }
                                        params={params}
                                        currentUserAccountMembership={currentUserAccountMembership}
                                        canOrderPhysicalCards={canOrderPhysicalCards}
                                      />
                                    ),
                                  )
                                  .otherwise(() => <ErrorView />),
                              )
                              .with({ name: "AccountActivation" }, () => (
                                <AccountActivationPage
                                  accentColor={accentColor}
                                  accountMembershipId={accountMembershipId}
                                  additionalInfo={additionalInfo}
                                  canViewAccountDetails={canViewAccountDetails}
                                  projectName={projectName}
                                  refetchAccountAreaQuery={refetchAccountAreaQuery}
                                />
                              ))
                              .otherwise(() => (
                                <NotFoundPage
                                  title={isEmpty(indexUrl) ? t("error.noAccount") : undefined}
                                  text={
                                    isEmpty(indexUrl)
                                      ? t("error.checkWithProvider", { projectName })
                                      : undefined
                                  }
                                />
                              ))}
                          </Suspense>
                        );
                      },
                    )
                    .otherwise(() => (
                      <LoadingView color={colors.current[500]} />
                    ))}
                </Sentry.ErrorBoundary>
              </View>
            </ScrollView>

            {!desktop &&
              membership.match({
                Error: () => null,
                Ok: membership => (
                  <NavigationTabBar
                    identificationStatus={identificationStatus ?? "Uninitiated"}
                    accountMembershipId={accountMembershipId}
                    hasMultipleMemberships={hasMultipleMemberships}
                    activationTag={activationTag}
                    accountMembership={membership.accountMembership}
                    shouldDisplayIdVerification={
                      !(
                        projectInfo.B2BMembershipIDVerification === false &&
                        membership.canManageAccountMembership === false &&
                        membership.canInitiatePayments === false &&
                        membership.canManageBeneficiaries === false
                      )
                    }
                    additionalInfo={additionalInfo}
                    entries={menu}
                    firstName={firstName}
                    lastName={lastName}
                    refetchAccountAreaQuery={refetchAccountAreaQuery}
                  />
                ),
              })}
          </View>
        </View>
      </LegacyAccentColorProvider>
    </WithPartnerAccentColor>
  );
};