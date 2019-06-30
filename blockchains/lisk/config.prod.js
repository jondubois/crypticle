module.exports = {
  secretSignupKey: '313e7cc1-ad75-4030-a927-6a09f39c1603',
  databaseName: 'lisk_prod',
  authKey: '15d16361-6402-41a5-8840-d2a330b8ea40',
  authTokenExpiry: 30000,
  authTokenRenewalInterval: 20000,
  maxSocketBackpressure: 1000,
  services: {
    account: {
      transactionSettlementInterval: 5000,
      withdrawalProcessingInterval: 20000,
      maxTransactionSettlementsPerAccount: 10,
      maxConcurrentWithdrawalsPerAccount: 10,
      maxConcurrentDebitsPerAccount: 50,
      blockchainNodeWalletPassphrase: 'seven help fluid old donate nation duck romance thumb verb trumpet flower',
      blockchainSync: true,
      blockchainNodeAddress: 'https://mainnet.lisk.io',
      blockPollInterval: 5000,
      blockFetchLimit: 100,
      blockchainWithdrawalMaxAttempts: 20,
      bcryptPasswordRounds: 10
    }
  },
  mainInfo: {
    cryptocurrency: {
      name: 'Lisk',
      symbol: 'LSK',
      unit: '100000000'
    },
    mainWalletAddress: '606085525141988367L',
    requiredDepositBlockConfirmations: 102,
    requiredWithdrawalBlockConfirmations: 102,
    paginationShowTotalCounts: false,
    maxRecordDisplayAge: 2592000000,
    maxPageSize: 100,
    alwaysRequireSecretSignupKey: false,
    enableAdminAccountSignup: true
  }
};
