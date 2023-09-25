//envMap, key = imported env key, value = exported key
const envMap = {
  VUE_APP_SERVICE_AGENT_NETWORK_URL: "VUE_APP_SERVICE_AGENT_NETWORK_URL",
  VUE_APP_MODE: "MODE",
};

const exportedEnv = {};

//Check if env do not exist.
for (const importedKey in envMap) {
  if (!process.env[importedKey]) {
    throw new Error(`${importedKey} undefined`);
  }
  exportedEnv[envMap[importedKey]] = process.env[importedKey];
}

export default exportedEnv;
