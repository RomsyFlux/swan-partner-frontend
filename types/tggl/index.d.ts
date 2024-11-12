// This file was automatically generated by the tggl CLI

import "tggl-client";

declare module "tggl-client" {
  export interface TgglContext {
    accountCountry: "DEU" | "ESP" | "FRA" | "ITA" | "NLD";
    capitalDepositCaseId: string;
    cardToken: string;
    countryCode: string;
    email: string;
    environment: "development" | "master" | "preprod" | "prod";
    environmentType: "admin" | "live" | "sandbox";
    iban: string;
    ip?: string;
    projectId: string;
    referer?: string;
    serviceName: string;
    timestamp: string | number;
    userId: string;
  }

  export interface TgglFlags {
    account_contract_enable_maestro_provider: boolean;
    account_contract_enable_maestro_provider_in_print_physical_card: boolean;
    account_contract_monext_openapi_enabled: boolean;
    account_contract_send_tcu_notifications: null | true;
    account_contract_use_swan_tcu_templates_for_disabled_projects: true;
    account_contract_use_swan_templates_for_tcu_notifications: true;
    account_membership_optional_phone_number: true;
    activateCardPaymentMethod: true;
    addInternationalBeneficiary: boolean;
    addSepaBeneficiary: boolean;
    asset_freeze_approve_list_enabled: true;
    b2b_membership_id_verification: true;
    back_office_bank_verlag_event_generation_improvements: true;
    bankingBulkTransfer: true;
    beneficiaries: true;
    bill_card_acquiring_enabled: boolean;
    billing_check_return_enabled: boolean;
    billing_v2_enabled: boolean;
    can_manage_beneficiary_for_untrusted_beneficiary: boolean;
    checks: true;
    ciao_es_enabled: boolean;
    closure_subscription_enabled: boolean;
    cms_call_cema_carte_for_choose_pin: true;
    cms_choose_pin_token_always_valid: true;
    complete_capital_deposit_case_enabled: boolean;
    dashboardAccountClosingLink: true;
    dashboardProjectMemberToken: true;
    dataExportAccount: boolean;
    dataExportAccountHolder: boolean;
    dataExportCards: boolean;
    dataExportOnboarding: boolean;
    dataExportTransactions: boolean;
    dataExportUser: boolean;
    deactivateUser: true;
    disable_emails_for_capital_deposit_case: boolean;
    enable_document_generation_by_document_convertor: boolean;
    enable_transaction_statements: boolean;
    enableForestV2: boolean;
    enableIdentityTheftPreventionPage: true;
    end_customer_billing_enabled: boolean;
    end_customer_ict_billing_enabled: boolean;
    end_customer_usage_payment_v2_enabled: boolean;
    frontendActivateMerchantPaymentLinksTabInWebBanking: true;
    frontendActivateMerchantProfileInWebBanking: true;
    full_text_search_feature_enabled: boolean;
    identityBirthDataCollection: true;
    ignore_identification_provider_birth_data: true;
    incomingForeignTransferScreeningEnabled: true;
    incomingForeignTransferScreeningLimit: 50;
    incomingTransferInstScreeningEnabled: boolean;
    incomingTransferScreeningDualRunEnabled: boolean;
    incomingTransferScreeningEnabled: boolean;
    incomingTransferScreeningLimit: 50;
    initiate_international_credit_transfer_outgoing: boolean;
    international_credit_transfer_outgoing_remittance_settlement_enabled: boolean;
    international_gateway_nats_consumer_enabled: true;
    isBlockRequestIfUserIsBlocked: true;
    isCustomerPasswordResetAvailable: true;
    isPhoneNumberCountryCodeBlocked: boolean;
    isPusherFixed: true;
    isScaDelegationEnabled: boolean;
    kycAccountHoldersVerificationsView: true;
    kycActivateComplyAdvantageMonitoredSync: boolean;
    KYCAllowGraphQLRequests: boolean;
    kYCPreventAHToBeVerifiedWithUnresolvedScreenings: boolean;
    KYCUseInternalSystemToCollectSupportingDocuments: true;
    lago_end_customer_enabled: boolean;
    lago_revenue_sharing_enabled: boolean;
    lockRecomputeEnableB2B: true;
    merchantDashboard: true;
    merchantPaymentMethodRequestUpdate: true;
    merchantWebBanking: true;
    mutationAddInternationalTrustedBeneficiary: boolean;
    mutationAddSepaTrustedBeneficiaries: boolean;
    mutationAddSepaTrustedBeneficiary: boolean;
    name_matching_use_valid_names_enabled: boolean;
    new_physical_card_model_enabled: boolean;
    notificationManagerCardPaymentRefusedNotification: true;
    notificationManagerEnableCardPermanentlyBlockedNotification: boolean;
    notificationManagerEnableCardSpendingLimitNotification: boolean;
    partner_billing_v1_5_enabled: boolean;
    paymentLink: true;
    processed_identification_requires_valid_redirect_verification_status: boolean;
    requestCardPaymentMethod: true;
    retry_settlement_fct_out_enabled: boolean;
    return_ict_in_enabled: boolean;
    return_transaction_mutation_ict_in: boolean;
    scaIAMDailyMaximumNumberOfSignInPerPhoneNumber: 10 | 100 | 1000;
    sCAIAMEnableTransactionOptionsToPreventRaceConditions: true;
    screeningSctInAndFctInWithNats: boolean;
    sendCreditAndZeroAmountAuthorization: boolean;
    sepaDirectDebitInV2: true;
    SepaDirectDebitV2ActivationFlag: true;
    sepaGatewayPublishSctInstEventsThroughFastKafkaTopics: true;
    setIssuingProcessorCardProductOnRenewFeature: boolean;
    swan_account_membership_migration: true;
    swan_generate_missing_bank_details: true;
    swan_supports_local_italian_iban: true;
    trusted_beneficiary_transfers_consent_free_enabled: boolean;
    twilioRatio: 0 | 0.2 | 0.5 | 0.6 | 0.8 | 0.95 | 1;
    update_account_range_on_business_cards: true;
    use_checkout_identification_api: true;
    use_fourthine_workflow_api: true;
    use_mailjet_subaccount_for_mass_emailing: true;
    useInternationalBeneficiary: boolean;
    useTwilioVerifyServiceSidAlan: true;
    webhookSubscriptionLimit: boolean;
  }
}
